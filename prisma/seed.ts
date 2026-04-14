import { PrismaClient } from '../src/generated/prisma/client.js';
import { users, guests } from './generators';
import { faker } from '@faker-js/faker';
import { resetDatabase } from './generators/resetDatabase';
import dotenv from 'dotenv';

export const prisma = new PrismaClient();
dotenv.config();

async function createUsers() {
	console.log('Creating users without guests');

	for (let i = 0; i < 100; i++) {
		const user = users();
		await prisma.user.create({
			data: {
				...user,
				hasGuests: false
			}
		});
	}

	console.log('Finished creating users without guests');
}

async function createUsersWithGuests() {
	console.log('Creating users with guests');

	for (let i = 0; i < 8; i++) {
		const userData = users();
		const guestCount = faker.number.int({ min: 1, max: 4 });

		const user = await prisma.user.create({
			data: {
				...userData,
				hasGuests: true
			}
		});

		for (let j = 0; j < guestCount; j++) {
			const guestGenerator = guests(user.id);
			await prisma.guest.create({
				data: guestGenerator
			});
		}
	}

	console.log('Finished creating users with guests');
}

const main = async () => {
	const isProduction =
		process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

	console.log(
		`\nChecking environment: VERCEL_ENV=${process.env.VERCEL_ENV}, NODE_ENV=${process.env.NODE_ENV}`
	);

	if (isProduction) {
		console.log('Seeding is restricted for the production branch.');
		process.exit(1);
	}

	await resetDatabase();

	await createUsers();
	await createUsersWithGuests();
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
	});
