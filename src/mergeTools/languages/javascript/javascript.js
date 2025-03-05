
import * as escodegen from 'escodegen';
import esprima from 'esprima-next';
import estraverse from 'estraverse';

const debug = true;


export class javascriptManipulator {
    constructor(code = '') {
        this.code = code;
    }
    async setCode(code) {
        this.code = code;
        await this.parse();
        return this.code;
    }
    async mergeCode(newCode) {
        try {
            await esprima.parseScript(newCode, {
                tolerant: true,
                range: true,
                loc: true,
                attachComment: true
            });
        } catch (e) {
            console.error(e);
            debugLog('Error parsing the new code snippet');
            return false;
        }
        this.code = this.code + '\n\n\n\n' + newCode;
        await this.parse();
        await this.mergeDuplicates();
        return await this.generateCode();
    }
    async mergeDuplicates() {
        try {
            await this.parse();
            console.log('parsed');
            await this.cleanUpComments();
            console.log('cleaned up comments');
            await this.makeAllFunctionsExported();
            console.log('made all functions exported');
            await this.makeAllClassesExported();
            console.log('made all classes exported');
            await this.mergeDuplicateImports();
            console.log('merged duplicate imports');
            await this.mergeDuplicateVariables();
            console.log('merged duplicate variables');
            await this.mergeDuplicateFunctions();
            console.log('merged duplicate functions');
            await this.mergeDuplicateClasses();
            console.log('merged duplicate classes');
            await this.removeEmptyExports();
            console.log('removed empty exports');
            return await this.generateCode();
        } catch (e) {
            console.error(e);
            debugLog('Error parsing the new code snippet');
            return false;
        }

    }
    async removeEmptyExports() {
        // Remove empty export statements
        await estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'ExportNamedDeclaration' && !node.declaration && (!node.specifiers || node.specifiers.length === 0)) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
    }
    async mergeDuplicateFunctions() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const functionMap = new Map();
        // Traverse the AST to collect all function declarations
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.type === 'FunctionDeclaration') {
                    const functionName = node.id.name;
                    debugLog(`Processing function: ${functionName}`);
                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);
                        debugLog(`Duplicate function found: ${functionName}`);
                        // Check if the new function contains code
                        const hasCode = node.body.body && node.body.body.length > 0;
                        const existingHasCode = existingFunction.body.body && existingFunction.body.body.length > 0;
                        // Handle JSDoc comments
                        const jsDocComment = node.leadingComments?.find(comment => comment.type === 'Block' && comment.value.startsWith('*'));
                        if (hasCode) {
                            debugLog(`Replacing existing function '${functionName}' with new implementation.`);
                            functionMap.set(functionName, node);
                            // Update map to hold the new function
                            // Copy JSDoc comments from the new function if exists
                            if (jsDocComment) {
                                existingFunction.leadingComments = [
                                    ...existingFunction.leadingComments || [],
                                    jsDocComment
                                ];
                            }
                        } else if (existingHasCode) {
                            debugLog(`Keeping existing function '${functionName}' as it has valid implementation.`);
                        } else {
                            debugLog(`Both functions '${functionName}' are stubs; keeping the first one.`);
                        }
                        // Keep the original stub
                        // Mark the duplicate function for removal (the one that is lower in the file)
                        if (hasCode) {
                            existingFunction.remove = true;
                        } else
                        // We want to remove the earlier one only if hasCode is true
                        {
                            node.remove = true;
                        }
                    } else
                    // If duplicate stubs, mark the later one for removal
                    {
                        debugLog(`Adding function '${functionName}' to map.`);
                        functionMap.set(functionName, node);
                    }
                }
            }
        });
        // Store the new function in the map
        // Remove marked duplicate functions
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.remove) {
                    debugLog(`Removing duplicate function: ${node.id.name}`);
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        // Check for exported functions and ensure they stay distinct
        estraverse.replace(this.ast, {
            enter: node => {
                if (node.type === 'ExportNamedDeclaration' && node.declaration && node.declaration.type === 'FunctionDeclaration') {
                    const functionName = node.declaration.id.name;
                    debugLog(`Processing exported function: ${functionName}`);
                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);
                        if (existingFunction !== node.declaration) {
                            debugLog(`Marking old exported function '${functionName}' for removal.`);
                            existingFunction.remove = true;
                        }
                    }
                }
            }
        });
        // Mark the old function for removal
        return this.ast;
    }
    async mergeDuplicateImports() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const importMap = new Map();
        const importNodes = [];
        debugLog('Merging duplicate imports');
        // Traverse the AST to collect and combine imports
        estraverse.traverse(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'ImportDeclaration') {
                    const source = node.source.value;
                    debugLog(`import {${node.specifiers.map(s => s.local.name).join(', ')}} from '${source}'`);
                    if (importMap.has(source)) {
                        // Merge specifiers from the duplicate import
                        const existingNode = importMap.get(source);
                        const existingSpecifiers = existingNode.specifiers;
                        const newSpecifiers = node.specifiers;
                        // Avoid duplicates in specifiers
                        newSpecifiers.forEach(specifier => {
                            if (!existingSpecifiers.some(existing => existing.local.name === specifier.local.name)) {
                                existingSpecifiers.push(specifier);
                            }
                        });
                        // Mark the duplicate node for removal
                        node.remove = true;
                    } else {
                        // Add the import to the map
                        importMap.set(source, node);
                        importNodes.push(node);
                    }
                }
            }
        });
        // Keep track of import nodes
        // Remove duplicate import nodes
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'ImportDeclaration' && node.remove) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        // Move all imports to the top of the program
        estraverse.replace(this.ast, {
            enter: node => {
                if (node.type === 'Program') {
                    // Remove all imports from their original position
                    node.body = node.body.filter(child => child.type !== 'ImportDeclaration');
                    // Add the combined import statements to the top
                    node.body.unshift(...importNodes);
                }
                return node;
            }
        });
        return this.ast;
    }
    async mergeDuplicateVariables() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const variableMap = new Map();
        // Traverse the AST to collect root-level variable declarations
        estraverse.traverse(this.ast, {
            enter: (node, parent) => {
                // Only process root-level variable declarations
                if (node.type === 'VariableDeclaration' && parent.type === 'Program') {
                    node.declarations.forEach(declaration => {
                        const variableName = declaration.id.name;
                        if (variableMap.has(variableName)) {
                            const existingDeclaration = variableMap.get(variableName);
                            existingDeclaration.id = declaration.id;
                            existingDeclaration.init = declaration.init;
                            // Mark the new (later) declaration for removal
                            declaration.remove = true;
                        } else {
                            // Add the variable to the map
                            variableMap.set(variableName, declaration);
                        }
                    });
                }
            }
        });
        // Remove duplicate variable declarations
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.type === 'VariableDeclaration' && node.declarations.every(decl => decl.remove)) {
                    return this.removeNodeFromParent(node, parent);
                }
                // Filter out removed declarations from VariableDeclaration nodes
                if (node.type === 'VariableDeclaration') {
                    node.declarations = node.declarations.filter(decl => !decl.remove);
                }
                return node;
            }
        });
        return this.ast;
    }
    async mergeDuplicateClasses() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        const classMap = new Map();
        // Traverse the AST to collect all class declarations
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.type === 'ClassDeclaration') {
                    const className = node.id.name;
                    if (classMap.has(className)) {
                        const existingClass = classMap.get(className);
                        const existingMethods = new Map(existingClass.body.body.filter(method => method.type === 'MethodDefinition').map(method => [
                            method.key.name,
                            method
                        ]));
                        node.body.body.forEach(method => {
                            if (method.type === 'MethodDefinition') {
                                const methodName = method.key.name;
                                if (existingMethods.has(methodName)) {
                                    const existingMethod = existingMethods.get(methodName);
                                    // Handle JSDoc comments
                                    const jsDocComment = method.leadingComments?.find(comment => comment.type === 'Block' && comment.value.startsWith('*'));
                                    // Replace method only if the new method has code
                                    if (method.value.body && method.value.body.body.length > 0) {
                                        existingMethod.value = method.value;
                                        if (jsDocComment) {
                                            existingMethod.leadingComments = [
                                                ...existingMethod.leadingComments || [],
                                                jsDocComment
                                            ];
                                        }
                                    } else {
                                        if (jsDocComment) {
                                            existingMethod.leadingComments = [
                                                ...existingMethod.leadingComments || [],
                                                jsDocComment
                                            ];
                                        }
                                    }
                                } else {
                                    // Add the new method if it does not exist
                                    existingClass.body.body.push(method);
                                }
                            }
                        });
                        // Mark the current class for removal
                        node.remove = true;
                    } else {
                        // Add the class to the map
                        classMap.set(className, node);
                    }
                }
            }
        });
        // Remove duplicate classes
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (node.remove) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        return this.ast;
    }
    async cleanUpComments() {
        // iterate over the AST and remove adjacent duplicate leading comments
        await estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    for (let i = 0; i < node.leadingComments.length - 1; i++) {
                        if (node.leadingComments[i].value === node.leadingComments[i + 1].value) {
                            node.leadingComments.splice(i, 1);
                        }
                    }
                }
            }
        });
        await estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.filter(comment => !comment.value.match(/... existing/i));
                }
            }
        });
        // if a comment includes "" remove the string "" (case insensitive)
        await estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    node.leadingComments = node.leadingComments.map(comment => {
                        return {
                            type: comment.type,
                            value: comment.value.replace(/New method:/i, '')
                        };
                    });
                }
            }
        });
    }
    removeNodeFromParent(node, parent) {
        if (!parent)
            return null;
        if (Array.isArray(parent.body)) {
            parent.body = parent.body.filter(child => child !== node);
        }
        return null;
    }
    async makeAllClassesExported() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        await estraverse.replace(this.ast, {
            enter: (node, parent) => {
                // Check if the node is a class declaration
                if (node.type === 'ClassDeclaration') {
                    // If the parent is not already an export declaration, modify it
                    if (!parent || parent.type !== 'ExportNamedDeclaration') {
                        // Wrap in ExportNamedDeclaration only if not already exported
                        // copy the comments from the function to the export statement
                        const leadingComments = node.leadingComments;
                        const trailingComments = node.trailingComments;
                        node.leadingComments = [];
                        node.trailingComments = [];
                        return {
                            type: 'ExportNamedDeclaration',
                            declaration: node,
                            specifiers: [],
                            source: null,
                            leadingComments,
                            trailingComments
                        };
                    }
                }
                return node;
            }
        });
        await this.generateCode();
        return this.ast;
    }
    async makeAllFunctionsExported() {
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }

        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                // Check if the node is a FunctionDeclaration
                if (node.type === 'FunctionDeclaration') {
                    // Ensure the parent is the root Program node
                    if (parent && parent.type === 'Program') {
                        // If not already an ExportNamedDeclaration, wrap it
                        if (!parent.body.some(
                            (child) =>
                                child.type === 'ExportNamedDeclaration' &&
                                child.declaration === node
                        )) {
                            // Handle comments
                            const leadingComments = node.leadingComments || [];
                            const trailingComments = node.trailingComments || [];
                            node.leadingComments = [];
                            node.trailingComments = [];

                            return {
                                type: 'ExportNamedDeclaration',
                                declaration: node,
                                specifiers: [],
                                source: null,
                                leadingComments,
                                trailingComments,
                            };
                        }
                    }
                }
                return node;
            },
        });

        await this.generateCode();
        return this.ast;
    }

    async parse() {
        this.ast = {};
        this.ast = await esprima.parseScript(this.code, {
            tolerant: true,
            range: true,
            loc: true,
            attachComment: true,
            sourceType: 'module'
        });
        // remove trailing comments from the original code except for the last one under the particular node
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.trailingComments) {
                    node.trailingComments = [];
                }
            }
        });
        // iterate over the AST and remove adjacent duplicate leading comments
        estraverse.traverse(this.ast, {
            enter: node => {
                if (node.leadingComments) {
                    for (let i = 0; i < node.leadingComments.length - 1; i++) {
                        if (node.leadingComments[i].value === node.leadingComments[i + 1].value) {
                            node.leadingComments.splice(i, 1);
                        }
                    }
                }
            }
        });
        //debugLog(this.ast);
        return this.ast;
    }
    async generateCode() {
        //debugLog('Generating code', this.code);
        if (!this.ast) {
            throw new Error('AST not parsed. Call the `parse` method first.');
        }
        //debugLog(this.ast)
        const newCode = await escodegen.generate(this.ast, {
            comment: true,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: true,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: true
            }
        });
        //debugLog(`this is the new code: ${newCode}`);
        //debugLog(this.ast);
        this.code = newCode;
        await this.parse();
        return this.code;
    }
}


async function debugLog(...args) {
    if (debug) {
        console.log(...args);
    }
}