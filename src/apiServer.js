// server.js
import { ctx } from './main.js';
import http from 'http';
import url from 'url';
import fs from 'fs/promises';
import path from 'path';
import mime from 'mime'; // Install this package with `npm install mime`
import WebSocket, { WebSocketServer } from 'ws'; // WebSocket support
import { getScriptFolderPath } from './fileIO.js';
import { aiCoderApiFunctions } from './aiCoderApiFunctions.js';
import { printAndPause, readArg } from './terminalHelpers.js';
import { execSync } from 'child_process';
export let wss;







async function buildFrontend() {
    console.log('Building frontend...');

    try {
        // Resolve the script directory
        let scriptPath = await getScriptFolderPath();
        //console.log('scriptPath:', scriptPath);

        // Define paths for the dist and cache directories
        const distPath = path.join(scriptPath, '../dist');
        const cachePath = path.join(scriptPath, '../.parcel-cache');

        // Clean up old build artifacts
        await Promise.all([
            fs.rm(distPath, { recursive: true, force: true }),
            fs.rm(cachePath, { recursive: true, force: true }),
        ]);

        // remove /src from the end of the scriptPath
        scriptPath = scriptPath.substring(0, scriptPath.length - 4);


        // Execute Parcel build command
        const buildCommand = `npx parcel build ./public/index.html --no-optimize`;
        //console.log(`Running command: ${buildCommand} in ${scriptPath}`);
        execSync(buildCommand, { cwd: scriptPath, stdio: 'inherit' });

        //console.log('Frontend built successfully.');
    } catch (error) {
        console.error('Error during frontend build:', error);
    }
}

buildFrontend();


export function setupServer() {
    // ctx variables
    ctx.appData = {};
    ctx.appData.serveDirectory = path.resolve(getScriptFolderPath() + "/../dist"); // Directory to serve files from

    ctx.aiCoderApiFunctions = new aiCoderApiFunctions();

    let PORT = parseInt(readArg("-p")) || 3000; // Start port
    const HOST = '0.0.0.0';

    const createServer = () => {
        const server = http.createServer(async (req, res) => {
            try {
                const parsedUrl = url.parse(req.url, true);
                const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;

                let parsedBody = {};
                if (req.method === 'POST') {
                    // Read the body of the request
                    const body = await new Promise((resolve, reject) => {
                        let data = '';
                        req.on('data', chunk => {
                            data += chunk;
                        });
                        req.on('end', () => {
                            resolve(data);
                        });
                        req.on('error', err => {
                            reject(err);
                        });
                    });

                    if (body) {
                        try {
                            parsedBody = JSON.parse(body);
                        } catch (err) {
                            console.error('Invalid JSON:', err.message);
                            parsedBody = {}; // Default to an empty object if parsing fails
                        }
                    }
                }

                // API method handling
                const pathnameWithoutSlash = pathname.substring(1);
                if (pathnameWithoutSlash in aiCoderApiFunctions.prototype) {
                    console.log('Calling method:', pathnameWithoutSlash);
                    const response = await aiCoderApiFunctions.prototype[pathnameWithoutSlash](parsedBody);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                    return;
                }

                // File serving logic
                const filePath = path.join(ctx.appData.serveDirectory, pathname);

                try {
                    // Check if the file exists
                    await fs.access(filePath);

                    // Serve the file with the correct MIME type
                    const mimeType = mime.getType(filePath) || 'application/octet-stream';
                    res.setHeader('Content-Type', mimeType);

                    console.log('Serving file:', filePath);
                    const fileContent = await fs.readFile(filePath);
                    res.statusCode = 200;
                    res.end(fileContent);
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'File not found' }));
                    } else {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Error serving file', error: err.message }));
                    }
                }
            } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Unexpected server error', error: err.message }));
            }
        });

        // Attach error listener for port conflicts
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`Port ${PORT} is in use. Trying port ${PORT + 1}...`);
                PORT++;
                createServer();
            } else {
                console.error('Server error:', err);
            }
        });

        // Start the server
        server.listen(PORT, HOST, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
            //console.log(`Serving files from: ${ctx.appData.serveDirectory}`);

            // WebSocket server setup
            wss = new WebSocketServer({ server });

            wss.on('connection', (ws) => {
                console.log('WebSocket connection established.');

                ws.on('message', (message) => {
                    console.log('Received:', message);
                    ws.send(`Echo: ${message}`);
                });

                ws.on('close', () => {
                    console.log('WebSocket connection closed.');
                });

                ws.send('Welcome to the WebSocket server!');
                ctx.ws = ws;
            });
        });
    };

    createServer();
    // print server address after waiting for 5 seconds
    setTimeout(() => {
        printAndPause(`Server is running at http://localhost:${PORT}`);
    }, 5000);
}

