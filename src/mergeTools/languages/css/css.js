
export class cssManipulator {
    constructor() {
        this.parsedCSS = [];
    }
    // Method to parse CSS into an array of selector-declaration pairs
    parse(css) {
        const regex = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)*\}/g;
        this.parsedCSS = [];
        let match;
        while ((match = regex.exec(css)) !== null) {
            const selector = match[1].trim();
            const declarationBlock = this.extractDeclarations(match[0]);
            this.parsedCSS.push({
                selector,
                declarationBlock
            });
        }
    }
    // Method to resolve duplicate selectors
    mergeDuplicates() {
        const selectorMap = new Map();
        // Traverse from the end to preserve the last occurrence
        for (let i = this.parsedCSS.length - 1; i >= 0; i--) {
            const {selector, declarationBlock} = this.parsedCSS[i];
            if (selectorMap.has(selector)) {
                // Remove the earlier occurrence
                this.parsedCSS.splice(i, 1);
            } else {
                selectorMap.set(selector, declarationBlock);
            }
        }
    }
    // Method to convert the parsed CSS structure back into a CSS string
    toCSSString() {
        return this.parsedCSS.map(({selector, declarationBlock}) => {
            const indentedDeclarations = declarationBlock.split(';').map(declaration => declaration.trim()).filter(Boolean).map(declaration => `  ${ declaration };`).join('\n');
            return `${ selector } {\n${ indentedDeclarations }\n}`;
        }).join('\n\n');
    }
    extractDeclarations(cssBlock) {
        const start = cssBlock.indexOf('{') + 1;
        const end = cssBlock.lastIndexOf('}');
        return cssBlock.slice(start, end).trim();
    }
}
// Example usage
const css = `
  div > .button {
    color: red;
  }
  .container, .box {
    margin: 10px;
  }
  div > .button {
    background: blue;
  }
  @media (max-width: 600px) {
    .responsive {
      display: block;
    }
  }
  `;
const manipulator = new cssManipulator();
manipulator.parse(css);
manipulator.mergeDuplicates();
const resolvedCSS = manipulator.toCSSString();
console.log('Original CSS:\n', css);
console.log('Resolved CSS:\n', resolvedCSS);