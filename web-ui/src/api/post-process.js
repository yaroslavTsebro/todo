import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const openApiDir = path.resolve(process.cwd(), './src/openapi');
const openApiApisDir = path.resolve(openApiDir, './apis');
const openApiModelsDir = path.resolve(openApiDir, './models');

function addTsNoCheck(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content.startsWith('// @ts-nocheck')) {
        fs.writeFileSync(filePath, `// @ts-nocheck\n${content}`);
    }
}

function getDirFilesFullPath(dirpath) {
    return fs.readdirSync(dirpath).map(file => path.resolve(dirpath, file));
}

function getDirTsFilesFullPath(dirpath) {
    return getDirFilesFullPath(dirpath).filter(file => file.endsWith('.ts'));
}

const files = [
    ...getDirTsFilesFullPath(openApiApisDir),
    ...getDirTsFilesFullPath(openApiModelsDir),
];

files.forEach(addTsNoCheck);
