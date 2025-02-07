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
    try {
        let scriptPath = await getScriptFolderPath();
        const distPath = path.join(scriptPath, '../dist');
        const cachePath = path.join(scriptPath, '../.parcel-cache');

        await Promise.all([
            fs.rm(distPath, { recursive: true, force: true }),
            fs.rm(cachePath, { recursive: true, force: true }),
        ]);

        scriptPath = scriptPath.substring(0, scriptPath.length - 4);

        const buildCommand = `npx parcel build ./public/index.html --no-optimize`;
        execSync(buildCommand, { cwd: scriptPath, stdio: 'inherit' });
    } catch (error) {
        console.error('Error during frontend build:', error);
    }
}

buildFrontend();

export function setupServer() {
    try {
        ctx.appData = {};
        ctx.appData.serveDirectory = path.resolve(getScriptFolderPath() + "/../dist");

        ctx.aiCoderApiFunctions = new aiCoderApiFunctions();

        let PORT = parseInt(readArg("-p")) || 3000;
        const HOST = '0.0.0.0';

        const createServer = () => {
            const server = http.createServer(async (req, res) => {
                try {
                    const parsedUrl = url.parse(req.url, true);
                    const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;

                    let parsedBody = {};
                    if (req.method === 'POST') {
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
                                parsedBody = {};
                            }
                        }
                    }

                    const pathnameWithoutSlash = pathname.substring(1);
                    if (pathnameWithoutSlash in aiCoderApiFunctions.prototype) {
                        console.log('Calling method:', pathnameWithoutSlash);
                        const response = await aiCoderApiFunctions.prototype[pathnameWithoutSlash](parsedBody);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(response));
                        return;
                    }

                    const filePath = path.join(ctx.appData.serveDirectory, pathname);

                    try {
                        await fs.access(filePath);

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
                    console.log('Server error:', err);
                }
            });

            server.on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.warn(`Port ${PORT} is in use. Trying port ${PORT + 1}...`);
                    PORT++;
                    createServer();
                } else {
                    console.error('Server error:', err);
                }
            });

            server.listen(PORT, HOST, () => {
                console.log(`Server is running at http://localhost:${PORT}`);

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

        setTimeout(() => {
            printAndPause(`Server is running at http://localhost:${PORT}`);
        }, 5000);

    } catch (error) {
        console.log('Error:', error);
    }
}

if (typeof Worker !== 'undefined') {
    const worker = new Worker('./worker.js');

    worker.onmessage = (event) => {
        console.log('Message from worker:', event.data);
    };

    worker.postMessage('Start worker');
} else {
    console.log('Web Workers are not supported in this environment.');
}
