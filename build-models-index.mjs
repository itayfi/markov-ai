import { readdir, open } from 'node:fs/promises';

async function main() {
    // get a list of files in ./src/models
    const files = await readdir('./src/models');
    const models = files.map(name => name.match(/([^/]*)\.json/)[1]);
    // write the list of models to ./src/models/index.json
    const file = await open('./src/models/index.json', 'w');
    await file.writeFile(JSON.stringify(models));
}

main();
