class cssManipulator {
    constructor() {
      this.parsedCSS = [];
    }
  
    // Method to parse CSS into an array of selector-declaration pairs
    parseCSS(css) {
      const regex = /([^{}]+)\{([^}]*)\}/g; // Match selectors and declaration blocks
      this.parsedCSS = [];
      let match;
  
      while ((match = regex.exec(css)) !== null) {
        const selector = match[1].trim();
        const declarationBlock = match[2].trim();
  
        // Push the parsed selector and declaration block into the structure
        this.parsedCSS.push({
          selector: selector,
          declarationBlock: declarationBlock,
        });
      }
    }
  
    // Method to resolve duplicate selectors
    resolveDuplicates() {
      const selectorMap = new Map();
  
      // Traverse from the end to preserve the last occurrence
      for (let i = this.parsedCSS.length - 1; i >= 0; i--) {
        const { selector, declarationBlock } = this.parsedCSS[i];
  
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
      return this.parsedCSS
        .map(({ selector, declarationBlock }) => `${selector} { ${declarationBlock} }`)
        .join('\n');
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
  manipulator.parseCSS(css);
  manipulator.resolveDuplicates();
  const resolvedCSS = manipulator.toCSSString();
  
  console.log('Resolved CSS:\n', resolvedCSS);
  