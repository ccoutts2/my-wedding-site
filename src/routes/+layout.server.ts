import { DATABASE_URL } from '$env/static/private';
import { neon } from '@neondatabase/serverless';
import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

const connectionString: string = DATABASE_URL as string;
const sql = neon(connectionString);

export async function load() {
	const response = await sql`SELECT version()`;
	const { version } = response[0];
	return {
		version
	};
}

injectAnalytics({ mode: dev ? 'development' : 'production' });
