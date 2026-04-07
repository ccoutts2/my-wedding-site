import { PrismaClient } from '../../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
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
	}).$extends(withAccelerate());

globalForPrisma.prisma = prisma;

export default prisma;
