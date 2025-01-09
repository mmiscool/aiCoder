
// Browser-specific implementation
export class BrowserFileSystem {
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

    
    async flatList(directory = this.currentDirectory, baseDirectory = this.currentDirectory) {
        if (!this.directoryHandle) throw new Error("Directory not opened.");
        const paths = [];
        const traverse = async (directoryHandle, currentPath, basePath) => {
            for await (const [name, handle] of directoryHandle.entries()) {
                const fullPath = currentPath ? `${currentPath}/${name}` : name;
                const relativePath = basePath ? fullPath.replace(basePath + "/", "") : fullPath;
                if (handle.kind === "file") {
                    paths.push(relativePath);
                } else if (handle.kind === "directory") {
                    await traverse(handle, fullPath, basePath);
                }
            }
        };
        await traverse(this.directoryHandle, directory, baseDirectory);
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