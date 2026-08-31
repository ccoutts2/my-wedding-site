import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { DATABASE_URL } from '$env/static/private';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({ adapter: new PrismaNeon({ connectionString: DATABASE_URL }) });

globalForPrisma.prisma = prisma;

export default prisma;
