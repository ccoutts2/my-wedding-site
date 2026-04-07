import { PrismaClient } from '../../generated/prisma/client';
import { DATABASE_URL } from '$env/static/private';

const globalForPrisma = globalThis as unknown as {
	prisma: any;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		datasources: {
			db: {
				url: DATABASE_URL
			}
		}
	});

globalForPrisma.prisma = prisma;

export default prisma;
