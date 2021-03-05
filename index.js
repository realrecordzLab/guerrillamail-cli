#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const spawn = require('child_process').spawn;
const script = path.format({dir: __dirname, base: 'client.js'});


const header = `
+--------------------+
| Guerrilla Mail CLI |
+--------------------+
`;

console.log(chalk.magentaBright(header));

spawn('node', [script], {
    cwd: __dirname,
    stdio: 'inherit'
});




