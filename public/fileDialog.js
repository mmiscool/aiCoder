// File: fileDialog.js
import { makeElement } from './domElementFactory.js';
import { doAjax } from './doAjax.js';

export function generateTreeView(targetElement, list, splitChar, onSingleClick, onDoubleClick) {
    let clickTimeout;
    const CLICK_DELAY = 300; // 300ms to differentiate single from double click

    function buildTree(list) {
        const tree = {};
        list.forEach((item) => {
            const parts = item.split(splitChar);
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
        Object.keys(tree).sort().forEach((key) => {
            const item = makeElement('li', { style: { marginLeft: '10px' } });
            const fullPath = `${path}${splitChar}${key}`.substring(1);
            const isFolder = tree[key] !== null;

            const label = makeElement('span', {
                innerText: isFolder ? `📁 ${key}/` : `📄 ${key}`,
                style: { cursor: 'pointer', color: isFolder ? '#ffffff' : '#66ccff' },
            });

            label.addEventListener('click', () => {
                if (clickTimeout) clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => onSingleClick(fullPath, label), CLICK_DELAY);
            });

            label.addEventListener('dblclick', () => {
                if (clickTimeout) clearTimeout(clickTimeout);
                onDoubleClick(fullPath);
            });

            item.appendChild(label);
            container.appendChild(item);

            if (isFolder) {
                const subList = makeElement('ul', {
                    style: { listStyleType: 'none', paddingLeft: '20px', display: 'none' },
                });
                renderTree(tree[key], subList, `${path}${splitChar}${key}`);
                item.appendChild(subList);

                label.addEventListener('click', () => {
                    subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
                });
            }
        });
    }

    const tree = buildTree(list);
    targetElement.innerHTML = '';
    renderTree(tree, targetElement, '', true);
}

export async function fileDialog(fileListArray) {
    return new Promise((resolve) => {
        let selectedFilePath = '';

        const modal = makeElement('div', {
            style: {
                position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center',
                alignItems: 'center', zIndex: '10000', color: '#f0f0f0',
            },
        });

        const dialog = makeElement('div', {
            style: {
                backgroundColor: '#333', padding: '20px', borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', width: '400px',
            },
        });

        const title = makeElement('h2', { innerText: 'Select a File', style: { color: '#ffffff' } });
        const fileTreeContainer = makeElement('ul', { style: { listStyleType: 'none', padding: '0' } });
        const inputField = makeElement('input', {
            type: 'text',
            style: {
                width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box',
                backgroundColor: '#222', color: '#f0f0f0', border: '1px solid #555',
            },
            readOnly: true,
            placeholder: 'Selected file will appear here...',
        });

        const submitButton = makeElement('button', {
            innerText: 'Submit',
            style: {
                padding: '10px 20px', marginTop: '10px', cursor: 'pointer',
                backgroundColor: '#66ccff', border: 'none', borderRadius: '4px', color: '#333',
            },
            onclick: () => {
                if (selectedFilePath) resolve(selectedFilePath);
                else alert('Please select a file.');
                document.body.removeChild(modal);
            },
        });

        const cancelButton = makeElement('button', {
            innerText: 'Cancel',
            style: {
                padding: '10px 20px', marginTop: '10px', cursor: 'pointer', marginLeft: '10px',
                backgroundColor: '#444', color: '#f0f0f0', border: 'none', borderRadius: '4px',
            },
            onclick: () => {
                resolve(null);
                document.body.removeChild(modal);
            },
        });

        const buttonContainer = makeElement('div', { style: { marginTop: '10px', display: 'flex' } });
        buttonContainer.appendChild(submitButton);
        buttonContainer.appendChild(cancelButton);

        dialog.appendChild(title);
        dialog.appendChild(fileTreeContainer);
        dialog.appendChild(inputField);
        dialog.appendChild(buttonContainer);
        modal.appendChild(dialog);
        document.body.appendChild(modal);

        generateTreeView(
            fileTreeContainer,
            fileListArray,
            "/",
            (filePath, label) => {
                selectedFilePath = filePath;
                inputField.value = filePath;
                fileTreeContainer.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));
                label.classList.add('selected');
            },
            (filePath) => {
                selectedFilePath = filePath;
                resolve(filePath);
                document.body.removeChild(modal);
            }
        );
    });
}

export async function choseFile() {
    const response = await doAjax('./getFilesList', {});
    // Remove the first character from each file path
    // because the first character is always '/'
    // and we don't want to show it in the file dialog

    const fileList = (response.files || []).map((file) => file.substring(2));
    console.log(fileList);
    return await fileDialog(fileList);
}

