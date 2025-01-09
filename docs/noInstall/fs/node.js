
import process from "process";
// Node.js-specific implementation
let fs, path;
if (typeof window === "undefined") {
    try {
        fs = (await import("fs")).promises;
        path = await import("path");
    } catch {
        console.log("Error: fs or path not available in this environment.");
    }

}

export class NodeFileSystem {
    constructor() {
        try {
            this.currentDirectory = process.cwd();
        } catch {
            console.log("Error: process.cwd() not available in this environment.");
        }

    }

    async openDirectory(directoryPath = process.cwd()) {
        this.currentDirectory = directoryPath;
    }

    async listFiles() {
        const files = await fs.readdir(this.currentDirectory, { withFileTypes: true });
        return files.map((file) => {
            const fullPath = path.join(this.currentDirectory, file.name);
            return { name: file.name, kind: file.isDirectory() ? "directory" : "file" };
        });
    }

    async flatList(directory = this.currentDirectory, baseDirectory = this.currentDirectory) {
        const results = [];
        const traverse = async (dir) => {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.relative(baseDirectory, fullPath);
                if (entry.isFile()) {
                    results.push(relativePath);
                } else if (entry.isDirectory()) {
                    await traverse(fullPath);
                }
            }
        };
        await traverse(directory);
        return results;
    }

    async readFile(fileName) {
        const filePath = path.join(this.currentDirectory, fileName);
        return await fs.readFile(filePath, "utf8");
    }

    async writeFile(fileName, content) {
        const filePath = path.join(this.currentDirectory, fileName);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, "utf8");
    }

    async deleteFile(fileName) {
        const filePath = path.join(this.currentDirectory, fileName);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            if (err.code === "ENOENT") {
                throw new Error(`File not found: ${fileName}`);
            } else {
                throw err;
            }
        }
    }
}
