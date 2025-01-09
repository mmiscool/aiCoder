let fs, isBrowser = false;

export let fileSystem = {
    
    async start() {
        if (typeof window !== "undefined" && window.showDirectoryPicker) {
            
            isBrowser = true;
            const { BrowserFileSystem } = await import('./browser.js');
            fs = new BrowserFileSystem();
            await fs.openDirectory();
            window.fs = fs;
            fileSystem = fs;
        } else {
            this.isBrowser = false;
            const { NodeFileSystem } = await import('./node.js');
            fs = new NodeFileSystem();
            fileSystem = fs;
        }
    },

    async openDirectory() {
        return await fs.openDirectory();
    },

    async listFiles() {
        return await fs.listFiles();
    },

    async flatList() {
        const files = await fs.flatList();
        return files.sort();
    },


    async readFile(fileName) {
        return await fs.readFile(fileName);
    },

    async writeFile(fileName, content) {
        return await fs.writeFile(fileName, content);
    },

    async deleteFile(fileName) {
        return await fs.deleteFile(fileName);
    },
}


