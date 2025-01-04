import Parser from 'tree-sitter';
import Rust from 'tree-sitter-rust';

class RustParser {
    constructor() {
        this.parser = new Parser();
        this.parser.setLanguage(Rust);
    }

    parseCode(code) {
        const tree = this.parser.parse(code);
        return tree;
    }

    regenerateCodeFromAST(node, code) {
        // Base case: If it's a leaf node, return the original source slice
        if (node.childCount === 0) {
            return code.slice(node.startIndex, node.endIndex);
        }

        console.log(node.type, node);

        // Preserve comments and whitespace
        const regenerated = [];
        let lastEndIndex = node.startIndex;

        node.children.forEach((child) => {
            // Add any interstitial whitespace or comments
            if (child.startIndex > lastEndIndex) {
                regenerated.push(code.slice(lastEndIndex, child.startIndex));
            }

            // Add the child node content
            regenerated.push(this.regenerateCodeFromAST(child, code));
            lastEndIndex = child.endIndex;
        });

        // Add any trailing whitespace or comments after the last child
        if (lastEndIndex < node.endIndex) {
            regenerated.push(code.slice(lastEndIndex, node.endIndex));
        }

        return regenerated.join('');
    }

    processCode(code) {
        const tree = this.parseCode(code);
        const rootNode = tree.rootNode;

        const regeneratedCode = this.regenerateCodeFromAST(rootNode, code);
        return regeneratedCode;
    }
}

// Sample Rust code with comments
const rustCode = `
// This is a sample Rust program
fn main() {
    // Print a message to the console
    println!("Hello, world!"); // Inline comment
}
`;







const rustParser = new RustParser();
const regeneratedCode = rustParser.processCode(rustCode);
//console.log("AST    ");
//console.log(JSON.stringify(rustParser.parseCode(rustCode).rootNode.children, null, 2));

console.log('Original Code:');
console.log(rustCode);

console.log('\nRegenerated Code:');
console.log(regeneratedCode);


// tree-sitter tree-sitter-rust