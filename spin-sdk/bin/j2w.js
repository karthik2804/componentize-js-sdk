#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const yargs = require('yargs');

const validSpinWorlds = ['spin-http', 'spin-redis', 'spin-sqs', 'spin-command', 'spin-cron'];

const args = yargs
    .option('input', {
        alias: 'i',
        describe: 'Path to the input file',
        demandOption: true
    })
    .option('output', {
        alias: 'o',
        describe: 'Path to the output file',
        default: 'component.wasm'
    })
    .option('quiet', {
        alias: 'q',
        describe: 'Suppress command output',
        type: 'boolean',
        default: false
    })
    .option('trigger-type', {
        alias: '-n',
        describe: "Spin trigger to target",
        choices: validSpinWorlds,
        demandOption: true
    })
    .argv;

const inputFilePath = path.resolve(args.input);
if (!fs.existsSync(inputFilePath)) {
    console.error(`Input file '${args.input}' not found.`);
    process.exit(1);
}

const hash = crypto.randomBytes(8).toString('hex');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `componentize-${hash}`));
const tempInputFilePath = path.join(tempDir, path.basename(args.input));
fs.copyFileSync(args.input, tempInputFilePath);


const witPath = path.join(__dirname, 'wit'); // Assuming 'wit' is in the same directory as the script

const outputFilePath = path.resolve(args.output);


let input = path.basename(inputFilePath);
const command = `npx jco componentize --enable-stdout ${input} --wit ${witPath} -n ${args.triggerType} -o ${outputFilePath}`;

const childProcess = exec(command, { cwd: tempDir }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error}`);
        process.exit(1);
    }

    if (stdout) {
        if (!args.quiet) {
            console.log(`Command output: ${stdout}`);
        }
    }

    if (stderr) {
        console.error(`Command error: ${stderr}`);
    }
});

childProcess.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Child process exited with code ${code}`);
    }
});