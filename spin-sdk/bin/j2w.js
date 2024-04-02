#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Determine the paths to wit and index.js
const indexPath = process.argv[2];
const witPath = path.join(__dirname, 'wit'); // Assuming 'wit' is in the same directory as the script

// Build the command
const command = `npx jco componentize --enable-stdout ${indexPath} --wit ${witPath} -n spin-http -o component.wasm`;

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error}`);
        return;
    }

    if (stdout) {
        console.log(`Command output: ${stdout}`);
    }

    if (stderr) {
        console.error(`Command error: ${stderr}`);
    }
});