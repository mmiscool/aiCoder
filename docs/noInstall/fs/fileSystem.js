let fs, isBrowser = false;

export let fileSystem = {

    async start() {

        isBrowser = true;
        const { BrowserFileSystem } = await import('./browser.js');
        fs = new BrowserFileSystem();
        await this.openDirectory();
        globalThis.fs = fs;
        fileSystem = fs;

    },

    async openDirectory() {
        // create a full screen button that triggers the fs.openDirectory method
        const button = document.createElement("button");
        button.innerText = "Open Directory";
        button.style.position = "fixed";
        button.style.top = "0";
        button.style.left = "0";
        button.style.width = "100%";
        button.style.height = "100%";
        button.style.zIndex = "1000";
        button.style.backgroundColor = "rgba(0,0,0,0.5)";
        button.style.color = "white";
        button.style.fontSize = "24px";
        button.style.display = "flex";
        button.style.justifyContent = "center";
        button.style.alignItems = "center";

        document.body.appendChild(button);
        // make it so that this function returns a promise that resolves when the button is clicked
        return new Promise((resolve, reject) => {
            button.addEventListener("click", async () => {
                try {
                    await fs.openDirectory();
                    // remove the button from the DOM
                    button.remove();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
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


