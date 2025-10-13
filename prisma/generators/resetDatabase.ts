import { prisma } from '../seed';

export async function resetDatabase() {
	console.log('Resetting the database');

	await prisma.guest.deleteMany({});
	await prisma.user.deleteMany({});

	console.log('Database is reset');
}
