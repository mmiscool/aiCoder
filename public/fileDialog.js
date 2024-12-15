// File: fileDialog.js
import { makeElement } from './domElementFactory.js';
import { doAjax } from './doAjax.js';

export async function fileDialog(fileListArray) {
    return new Promise((resolve) => {
        // Create modal elements using makeElement
        const modal = makeElement('div', {
            id: 'file-dialog',
            style: {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '10000',
                color: '#f0f0f0',
            },
        });



        const dialog = makeElement('div', {
            id: 'file-dialog-content',
            style: {
                backgroundColor: '#333',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                width: '400px',
                maxHeight: '80vh',
                overflowY: 'auto',
            },
        });

        const title = makeElement('h2', {
            innerText: 'Select a File',
            style: {
                margin: '0 0 20px',
                color: '#ffffff',
            },
        });

        const fileTreeContainer = makeElement('ul', {
            style: {
                listStyleType: 'none',
                padding: '0',
                margin: '0',
            },
        });

        const buttonsContainer = makeElement('div', {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
            },
        });

        const cancelButton = makeElement('button', {
            innerText: 'Cancel',
            style: {
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: '#444',
                border: 'none',
                borderRadius: '4px',
                color: '#f0f0f0',
            },
            onclick: () => {
                resolve(null);
                document.body.removeChild(modal);
            },
        });

        const selectButton = makeElement('button', {
            innerText: 'Select',
            disabled: true,
            style: {
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: '#444',
                border: 'none',
                borderRadius: '4px',
                color: '#f0f0f0',
            },
            onclick: () => {
                resolve(selectedFile.substring(1));
                document.body.removeChild(modal);
            },
        });

        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(selectButton);
        dialog.appendChild(title);
        dialog.appendChild(fileTreeContainer);
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
            // Sort keys: folders first, then files, both alphabetically
            const sortedKeys = Object.keys(tree).sort((a, b) => {
                const isFolderA = tree[a] !== null;
                const isFolderB = tree[b] !== null;
        
                if (isFolderA && !isFolderB) return -1; // Folders before files
                if (!isFolderA && isFolderB) return 1;  // Files after folders
                return a.localeCompare(b);             // Alphabetical order
            });
        
            sortedKeys.forEach((key) => {
                const item = makeElement('li', {
                    style: {
                        marginLeft: '10px',
                        color: tree[key] === null ? '#66ccff' : '#ffffff',
                    },
                });
        
                const label = makeElement('span', {
                    innerText: tree[key] === null ? `📄 ${key}` : `📁 ${key}/`,
                    style: {
                        cursor: tree[key] === null ? 'pointer' : 'default',
                    },
                    onclick: () => {
                        if (tree[key] === null) {
                            // Deselect all other items
                            container.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));
        
                            // Select the clicked file
                            label.classList.add('selected');
                            selectedFile = path + '/' + key;
        
                            // Resolve immediately on file click
                            resolve(selectedFile.substring(1));
                            document.body.removeChild(modal);
                        }
                    },
                });
        
                item.appendChild(label);
                container.appendChild(item);
        
                if (tree[key] !== null) {
                    const subList = makeElement('ul', {
                        style: {
                            listStyleType: 'none',
                            paddingLeft: '20px',
                            display: isRoot ? 'block' : 'none',
                        },
                    });
        
                    renderTree(tree[key], subList, path + '/' + key);
                    item.appendChild(subList);
        
                    label.style.cursor = 'pointer';
                    label.addEventListener('click', () => {
                        subList.style.display =
                            subList.style.display === 'none' ? 'block' : 'none';
                    });
                }
            });
        }
        
        

        // Build and render the tree
        const tree = buildTree(fileListArray);
        let selectedFile = null;
        renderTree(tree, fileTreeContainer, '', true); // Root node expanded
    });
}

export async function choseFile() {
    const response = await doAjax('./getFilesList', {});
    const fileList = response.files || [];

    const selectedFile = await fileDialog(fileList);
    return selectedFile;
}
