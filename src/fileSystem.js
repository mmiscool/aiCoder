export class UniversalFileSystem {
    constructor() {
        if (typeof window !== "undefined" && window.showDirectoryPicker) {
            this.isBrowser = true;
            this.fs = new BrowserFileSystem();
        } else {
            this.isBrowser = false;
            this.fs = new NodeFileSystem();
        }
    }

    async openDirectory() {
        return await this.fs.openDirectory();
    }

    async listFiles() {
        return await this.fs.listFiles();
    }

    async flatList() {
        const files = await this.fs.flatList();
        return files.sort();
    }
    

    async readFile(fileName) {
        return await this.fs.readFile(fileName);
    }

    async writeFile(fileName, content) {
        return await this.fs.writeFile(fileName, content);
    }

    async deleteFile(fileName) {
        return await this.fs.deleteFile(fileName);
    }
}

// Browser-specific implementation
class BrowserFileSystem {
    constructor() {
        this.directoryHandle = null;
    }

    async openDirectory() {
        this.directoryHandle = await window.showDirectoryPicker();
    }

    async listFiles() {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const files = [];
        for await (const [name, handle] of this.directoryHandle.entries()) {
            files.push({ name, kind: handle.kind });
        }
        return files;
    }

    async flatList() {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const paths = [];
        async function traverse(directoryHandle, currentPath) {
            for await (const [name, handle] of directoryHandle.entries()) {
                const fullPath = currentPath ? `${currentPath}/${name}` : name;
                if (handle.kind === "file") {
                    paths.push(fullPath);
                } else if (handle.kind === "directory") {
                    await traverse(handle, fullPath);
                }
            }
        }
        await traverse(this.directoryHandle, "");
        return paths;
    }

    async readFile(fileName) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const fileHandle = await this.directoryHandle.getFileHandle(fileName);
        const file = await fileHandle.getFile();
        return await file.text();
    }

    async writeFile(fileName, content) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const parts = fileName.split('/');
        let currentDir = this.directoryHandle;
        for (let i = 0; i < parts.length - 1; i++) {
            currentDir = await currentDir.getDirectoryHandle(parts[i], { create: true });
        }
        const fileHandle = await currentDir.getFileHandle(parts[parts.length - 1], { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    async deleteFile(fileName) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        await this.directoryHandle.removeEntry(fileName);
    }
}

// Node.js-specific implementation
let fs, path;
if (typeof window === "undefined") {
    fs = (await import("fs")).promises;
    path = await import("path");
}

class NodeFileSystem {
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
