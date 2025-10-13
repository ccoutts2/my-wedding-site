import { PrismaClient } from '../src/generated/prisma/client.js';
import { users, guests } from './generators';
import { faker } from '@faker-js/faker';
import { resetDatabase } from './generators/resetDatabase';

export const prisma = new PrismaClient();

async function createUsers() {
	console.log('Createing users without guests');

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
	console.log('Createing users with guests');
	const guestCount = faker.number.int({ min: 1, max: 4 });

	for (let i = 0; i < 8; i++) {
		const userData = users();

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
	console.log('\nCurrent environment is: ');
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
