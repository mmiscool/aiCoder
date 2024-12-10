// File: fileDialog.js
// File: fileDialog.js
import { doAjax } from "./doAjax.js";

export async function fileDialog(fileListArray) {
    return new Promise((resolve) => {
        // Create modal elements
        const modal = document.createElement('div');
        modal.id = 'file-dialog';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '10000';
        modal.style.color = '#f0f0f0';

        const dialog = document.createElement('div');
        dialog.id = 'file-dialog-content';
        dialog.style.backgroundColor = '#333';
        dialog.style.padding = '20px';
        dialog.style.borderRadius = '8px';
        dialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        dialog.style.width = '400px';
        dialog.style.maxHeight = '80vh';
        dialog.style.overflowY = 'auto';

        const title = document.createElement('h2');
        title.innerText = 'Select a File';
        title.style.margin = '0 0 20px';
        title.style.color = '#ffffff';
        dialog.appendChild(title);

        const fileTreeContainer = document.createElement('ul');
        fileTreeContainer.style.listStyleType = 'none';
        fileTreeContainer.style.padding = '0';
        fileTreeContainer.style.margin = '0';
        dialog.appendChild(fileTreeContainer);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.justifyContent = 'space-between';
        buttonsContainer.style.marginTop = '20px';

        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.style.padding = '10px 20px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.backgroundColor = '#444';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.color = '#f0f0f0';

        const selectButton = document.createElement('button');
        selectButton.innerText = 'Select';
        selectButton.disabled = true;
        selectButton.style.padding = '10px 20px';
        selectButton.style.cursor = 'pointer';
        selectButton.style.backgroundColor = '#444';
        selectButton.style.border = 'none';
        selectButton.style.borderRadius = '4px';
        selectButton.style.color = '#f0f0f0';

        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(selectButton);
        dialog.appendChild(buttonsContainer);
        modal.appendChild(dialog);
        document.body.appendChild(modal);

        // Helper to build tree structure
        function buildTree(files) {
            const tree = {};
            files.forEach((file) => {
                const parts = file.split('/');
                let current = tree;
                parts.forEach((part, index) => {
                    if (!current[part]) {
                        current[part] = index === parts.length - 1 ? null : {};
                    }
                    current = current[part];
                });
            });
            return tree;
        }

        function renderTree(tree, container, path = '', isRoot = false) {
            Object.keys(tree).forEach((key) => {
                const item = document.createElement('li');
                item.style.marginLeft = '10px';
                item.style.color = tree[key] === null ? '#66ccff' : '#ffffff'; // Blue for files, white for folders

                const label = document.createElement('span');
                label.innerText = key;
                label.style.cursor = tree[key] === null ? 'pointer' : 'default';

                // Add Unicode icons
                if (tree[key] === null) {
                    label.innerText = `📄 ${key}`; // File icon
                } else {
                    label.innerText = `📁 ${key}/`; // Folder icon
                }

                item.appendChild(label);
                container.appendChild(item);

                if (tree[key] !== null) {
                    const subList = document.createElement('ul');
                    subList.style.listStyleType = 'none';
                    subList.style.paddingLeft = '20px';
                    subList.style.display = isRoot ? 'block' : 'none'; // Expand root by default, collapse others

                    renderTree(tree[key], subList, path + '/' + key);
                    item.appendChild(subList);

                    label.style.cursor = 'pointer';
                    label.addEventListener('click', () => {
                        subList.style.display =
                            subList.style.display === 'none' ? 'block' : 'none';
                    });
                }

                label.addEventListener('click', () => {
                    if (tree[key] === null) {
                        const allItems = container.querySelectorAll('.selected');
                        allItems.forEach((i) => i.classList.remove('selected'));
                        label.classList.add('selected');
                        selectedFile = path + '/' + key;
                        selectButton.disabled = false;

                        resolve(selectedFile.substring(1));
                        document.body.removeChild(modal);
                    }
                });


                // if (tree[key] === null) {
                //     label.addEventListener('click', () => {
                //         resolve(selectedFile.substring(1));
                //         document.body.removeChild(modal);
                //     });
                // }
            });
        }

        // Build and render the tree
        const tree = buildTree(fileListArray);
        let selectedFile = null;
        renderTree(tree, fileTreeContainer, '', true); // Root node expanded

        // Handle dialog actions
        cancelButton.addEventListener('click', () => {
            resolve(null);
            document.body.removeChild(modal);
        });

        selectButton.addEventListener('click', () => {
            resolve(selectedFile.substring(1));
            document.body.removeChild(modal);
        });
    });
}



export async function choseFile() {
    const response = await doAjax('/getFilesList', {});
    const fileList = response.files || [];

    const selectedFile = await fileDialog(fileList);
    return selectedFile;
}