//
export function makeElement(tag, attributes = {}) {
    // Create the DOM element
    const element = document.createElement(tag);

    // Apply the attributes to the element
    deepMerge(element, attributes);

    return element;
}

// Example usage
const myDiv = makeElement('div', {
    id: 'myDiv',
    className: 'container',
    style: {
        backgroundColor: 'lightblue',
        padding: '10px',
        border: '1px solid #000'
    },
    dataset: {
        custom: 'customValue',
        tracking: 'abc123'
    },
    'aria-label': 'A custom div'
});

// Append the created element to the DOM
document.body.appendChild(myDiv);


function deepMerge(target, source, seen = new WeakMap()) {
    if (seen.has(source)) {
        return target; // Avoid circular references
    }
    seen.set(source, true);

    for (const key in source) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue; // Ignore potentially dangerous keys
        }

        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== 'object') {
                target[key] = {};
            }
            deepMerge(target[key], source[key], seen);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
