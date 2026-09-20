import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import dotenv from 'dotenv';
import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';

dotenv.config();

const prisma = new PrismaClient({
	adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL })
});

type Row = {
	givenName: string;
	familyName: string;
	email: string;
};

function parseCsv(filePath: string): Row[] {
	const content = readFileSync(filePath, 'utf-8');
	const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);

	const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
	const givenNameIdx = header.indexOf('givenname');
	const familyNameIdx = header.indexOf('familyname');
	const emailIdx = header.indexOf('email');

	if (givenNameIdx === -1 || familyNameIdx === -1 || emailIdx === -1) {
		throw new Error(
			`CSV header must contain "givenName", "familyName", and "email" columns. Found: ${header.join(', ')}`
		);
	}

	return lines.slice(1).map((line) => {
		const cols = line.split(',').map((c) => c.trim());
		return {
			givenName: cols[givenNameIdx],
			familyName: cols[familyNameIdx],
			email: cols[emailIdx]
		};
	});
}

async function main() {
	const { values } = parseArgs({
		options: {
			file: { type: 'string', short: 'f' },
			'dry-run': { type: 'boolean', default: false }
		}
	});

	if (!values.file) {
		console.error('Usage: tsx scripts/importGuests.ts --file <path-to-csv> [--dry-run]');
		process.exit(1);
	}

	const rows = parseCsv(values.file);
	console.log(`Parsed ${rows.length} rows from ${values.file}`);

	let created = 0;
	let skipped = 0;
	const errors: { email: string; reason: string }[] = [];

	const emailCounts = new Map<string, number>();

	for (const row of rows) {
		if (!row.email || !row.givenName) {
			errors.push({ email: row.email || '(missing)', reason: 'missing name or email' });
			continue;
		}

		const emailKey = row.email.trim().toLowerCase();
		const occurrence = (emailCounts.get(emailKey) ?? 0) + 1;
		emailCounts.set(emailKey, occurrence);

		let email = emailKey;
		if (occurrence > 1) {
			const [local, domain] = row.email.split('@');
			email = `${local}+${occurrence}@${domain}`;
			console.log(`Duplicate email for ${row.givenName}, using ${email} instead`);
		}

		if (values['dry-run']) {
			console.log(`[dry-run] would create ${row.givenName} ${row.familyName} <${email}>`);
			created++;
			continue;
		}

		try {
			await prisma.user.create({
				data: {
					givenName: row.givenName,
					familyName: row.familyName,
					email,
					hasGuests: false,
					RSVP: false,
					isAccepted: false
				}
			});
			created++;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Unique constraint')) {
				console.log(`Skipping duplicate email: ${email}`);
				skipped++;
			} else {
				errors.push({ email, reason: error instanceof Error ? error.message : String(error) });
			}
		}
	}

	console.log(`\nDone. Created: ${created}, Skipped (duplicates): ${skipped}, Errors: ${errors.length}`);
	if (errors.length > 0) {
		console.log('\nErrors:');
		errors.forEach((e) => console.log(`  ${e.email}: ${e.reason}`));
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
