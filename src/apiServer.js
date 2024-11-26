// server.js
import { ctx } from './main.js';
import http from 'http';
import url from 'url';
import fs from 'fs/promises'; // Use promise-based fs
import path from 'path';
import mime from 'mime'; // Install this package with `npm install mime`
import { getScriptFolderPath, readFile } from './fileIO.js';

export function setupServer() {
    // ctx variables
    console.log(ctx);
    ctx.appData = {};
    ctx.appData.counter = 0;
    ctx.appData.message = "Hello, world!";
    ctx.appData.serveDirectory = path.resolve(getScriptFolderPath() + "/../public"); // Directory to serve files from

    // Server code
    const server = http.createServer(async (req, res) => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname; // Default to index.html
            const query = parsedUrl.query;

            // API endpoints
            if (pathname === '/readFile') {
                try {
                    const fileContent = await readFile(ctx.targetFile, 'utf8');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, file: fileContent }));
                } catch (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'Error reading file', error: err.message }));
                }
                return;
            }

            if (pathname === '/message') {
                if (query.msg) {
                    ctx.appData.message = query.msg;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: ctx.appData.message }));
                return;
            }

            if (pathname === '/status') {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, data: ctx.appData }));
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

    // Start the server
    const PORT = 5000;
    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log(`Serving files from: ${ctx.appData.serveDirectory}`);
    });
}
