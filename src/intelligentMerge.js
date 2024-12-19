import * as escodegen from 'escodegen';
import esprima from 'esprima-next';
import estraverse from 'estraverse';
import { appendFile, readFile, writeFile, } from './fileIO.js';
import { createBackup } from './backupSystem.js';
import { clearTerminal, } from './terminalHelpers.js';



export async function intelligentlyMergeSnippets(filename) {
    const originalCode = await readFile(filename);
    const manipulator = await new codeManipulator(originalCode);
    await manipulator.parse();
    await manipulator.mergeDuplcates();
    await writeFile(await manipulator.generateCode());
}


export async function applySnippets(targetFile, snippets) {
    let cleanedSnippets = await snippets.join('\n\n\n\n\n', true);
    const manipulator = await new codeManipulator(await readFile(targetFile));
    return await manipulator.mergeCode(cleanedSnippets);
}




export class codeManipulator {
    constructor(code = '') {
        this.code = code;
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
            return false;
        }

        this.code += '\n\n\n\n' + newCode;
        await this.parse();
        await this.mergeDuplcates();
        return await this.generateCode();
    }



    async mergeDuplcates() {
        await this.makeAllFunctionsExported();

        await this.makeAllClassesExported();

        await this.mergeDuplicateImports();
        await this.mergeDuplicateVariables();

        await this.mergeDuplicateFunctions();
        await this.mergeDuplicateClasses();

        // Remove empty export statements
        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                if (
                    node.type === 'ExportNamedDeclaration' &&
                    !node.declaration &&
                    (!node.specifiers || node.specifiers.length === 0)
                ) {
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });

        return this.generateCode();
    }


    async mergeDuplicateFunctions() {
        if (!this.ast) {
            throw new Error("AST not parsed. Call the `parse` method first.");
        }

        const functionMap = new Map();

        // Traverse the AST to collect all function declarations
        estraverse.traverse(this.ast, {
            enter: (node) => {
                if (node.type === 'FunctionDeclaration') {
                    const functionName = node.id.name;

                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);

                        // Check if the new function contains code
                        const hasCode =
                            node.body &&
                            node.body.body &&
                            node.body.body.length > 0;

                        const existingHasCode =
                            existingFunction.body &&
                            existingFunction.body.body &&
                            existingFunction.body.body.length > 0;

                        if (hasCode) {
                            // Replace the existing function with the new one
                            functionMap.set(functionName, node);
                        } else if (existingHasCode) {
                            // Do nothing, as the existing function contains code
                        } else {
                            // Both are stubs; retain the first one
                        }

                        // Mark the duplicate function for removal
                        node.remove = true;
                    } else {
                        // Add the function to the map
                        functionMap.set(functionName, node);
                    }
                }
            }
        });

        // Remove duplicate functions
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




    async mergeDuplicateImports() {
    }



    async mergeDuplicateVariables() {
        if (!this.ast) {
            throw new Error("AST not parsed. Call the `parse` method first.");
        }

        const variableMap = new Map();

        // Traverse the AST to collect root-level variable declarations
        estraverse.traverse(this.ast, {
            enter: (node, parent) => {
                // Only process root-level variable declarations
                if (node.type === 'VariableDeclaration' && parent.type === 'Program') {
                    node.declarations.forEach((declaration) => {
                        const variableName = declaration.id.name;

                        if (variableMap.has(variableName)) {
                            const existingDeclaration = variableMap.get(variableName);

                            // Replace the existing declaration's id and init
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
                if (
                    node.type === 'VariableDeclaration' &&
                    node.declarations.every((decl) => decl.remove)
                ) {
                    return this.removeNodeFromParent(node, parent);
                }

                // Filter out removed declarations from VariableDeclaration nodes
                if (node.type === 'VariableDeclaration') {
                    node.declarations = node.declarations.filter((decl) => !decl.remove);
                }

                return node;
            }
        });

        return this.ast;
    }







    async mergeDuplicateClasses() {
        if (!this.ast) {
            throw new Error("AST not parsed. Call the `parse` method first.");
        }

        const classMap = new Map();

        // Traverse the AST to collect all class declarations
        estraverse.traverse(this.ast, {
            enter: (node) => {
                if (node.type === 'ClassDeclaration') {
                    const className = node.id.name;

                    if (classMap.has(className)) {
                        const existingClass = classMap.get(className);

                        // Merge methods from the new class into the existing one
                        const existingMethods = new Map(
                            existingClass.body.body
                                .filter((method) => method.type === 'MethodDefinition')
                                .map((method) => [method.key.name, method])
                        );

                        node.body.body.forEach((method) => {
                            if (method.type === 'MethodDefinition') {
                                const methodName = method.key.name;

                                if (existingMethods.has(methodName)) {
                                    const existingMethod = existingMethods.get(methodName);

                                    // Replace method only if the new method has code
                                    if (
                                        method.value.body &&
                                        method.value.body.body.length > 0
                                    ) {
                                        existingMethod.value = method.value;
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

    removeNodeFromParent(node, parent) {
        if (!parent) return null;
        if (Array.isArray(parent.body)) {
            parent.body = parent.body.filter((child) => child !== node);
        }
        return null;
    }




    async makeAllClassesExported() {
        if (!this.ast) {
            throw new Error("AST not parsed. Call the `parse` method first.");
        }

        estraverse.replace(this.ast, {
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
                            trailingComments,
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
            throw new Error("AST not parsed. Call the `parse` method first.");
        }

        estraverse.replace(this.ast, {
            enter: (node, parent) => {
                // Check if the node is a FunctionDeclaration
                if (node.type === 'FunctionDeclaration') {
                    // If the parent is not already an export declaration, modify it
                    if (!parent || parent.type !== 'ExportNamedDeclaration') {
                        // Wrap in ExportNamedDeclaration only if not already exported
                        // remove the comments from the function

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
                            trailingComments,
                        };
                    }
                }
                return node;
            }
        });
        await this.generateCode();
        return this.ast;
    }



    async parse() {
        this.ast = await esprima.parseScript(this.code, {
            tolerant: true,
            range: true,
            loc: true,
            attachComment: true
        });


        // remove trailing comments from the original code except for the last one under the particular node
        await estraverse.traverse(this.ast, {
            enter: (node) => {
                if (node.trailingComments) {
                    node.trailingComments = [];
                }
            }
        });


        // iterate over the AST and remove adjacent duplicate leading comments
        await estraverse.traverse(this.ast, {
            enter: (node) => {
                if (node.leadingComments) {
                    for (let i = 0; i < node.leadingComments.length - 1; i++) {
                        if (node.leadingComments[i].value === node.leadingComments[i + 1].value) {
                            node.leadingComments.splice(i, 1);
                        }
                    }
                }
            }
        });




        console.log(this.ast);
        return this.ast;
    }

    async generateCode() {
        if (!this.ast) {
            throw new Error("AST not parsed. Call the `parse` method first.");
        }


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
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: true,
            },
        });
        //console.log(this.ast);
        this.code = newCode;
        await this.parse();
        return this.code;
    }
}






