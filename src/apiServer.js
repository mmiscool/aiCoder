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


export let wss;



export function setupServer() {
    // ctx variables
    ctx.appData = {};
    ctx.appData.serveDirectory = path.resolve(getScriptFolderPath() + "/../public"); // Directory to serve files from

    ctx.aiCoderApiFunctions = new aiCoderApiFunctions();
    //ctx.aiCoderApiFunctions.newChat();


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


            // try to call the method in the aiCoderApiFunctions class if the pathname matches the method name
            // remove the leading slash from the pathname
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
                // Stream the file to the response
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
            // Catch any unexpected server errors
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Unexpected server error', error: err.message }));
        }
    });


    // WebSocket server
    wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('WebSocket connection established.');

        ws.on('message', (message) => {
            console.log('Received:', message);
            // Echo the message back
            ws.send(`Echo: ${message}`);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });

        ws.send('Welcome to the WebSocket server!');

        ctx.ws = ws;
    });

    // Start the server
    const PORT = 5000;
    const HOST = '0.0.0.0';
    server.listen(PORT, HOST, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log(`Serving files from: ${ctx.appData.serveDirectory}`);

        // Open the browser to the server URL
        //openBrowser(`http://localhost:${PORT}`);
    });
}

