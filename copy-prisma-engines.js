import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.join(__dirname, 'src/generated/prisma');
const targetDir = path.join(__dirname, '.svelte-kit/output/server/chunks');

if (!fs.existsSync(targetDir)) {
	fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(sourceDir)) {
	fs.readdirSync(sourceDir).forEach((file) => {
		if (file.endsWith('.node')) {
			const sourceFile = path.join(sourceDir, file);
			const targetFile = path.join(targetDir, file);
			fs.copyFileSync(sourceFile, targetFile);
			console.log(`Copied ${file} to build output`);
		}
	});
}
