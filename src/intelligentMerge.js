import * as acorn from 'acorn-loose';
import * as astring from 'astring';
import prettier from 'prettier';
import { readFile, writeFile, } from './fileIO.js';
import { printDebugMessage } from './debugging.js';
import { createBackup } from './backupSystem.js';


import {
    pressEnterToContinue,
    printAndPause,
} from './terminalHelpers.js';

export async function intelligentlyMergeSnippets(filename) {
    // Create a backup of the file before making changes
    await createBackup(filename);
    await organizeImportsAndDeclarations(filename);

    //await convertMonkeyPatchesToClasses(filename);
    await mergeAndFormatClasses(filename);

    await printAndPause('Completed merging classes and functions', 3);
}



export async function mergeAndFormatClasses(filePath) {
    // Read the file content
    let fileContent = await readFile(filePath);

    fileContent = await convertMonkeyPatchesToClasses(fileContent);

    // Parse into AST with loose parsing
    let ast;
    try {
        ast = acorn.parse(fileContent, { sourceType: 'module', ecmaVersion: 'latest' });
        printDebugMessage('AST parsing successful');
    } catch (error) {
        console.error("Parsing error:", error.message);
        process.exit(1);
    }

    // Helper function to merge methods from one class into another, retaining non-empty methods
    function mergeClassMethods(targetClass, sourceClass) {
        const targetMethods = new Map(targetClass.body.body.map(method => [method.key.name, method]));

        // Merge methods, replacing or adding each method from sourceClass
        sourceClass.body.body.forEach(method => {
            const methodName = method.key.name;
            const targetMethod = targetMethods.get(methodName);

            // Check if the source method has an empty body
            const isSourceMethodEmpty = !method.value.body || method.value.body.body.length === 0;

            // Replace the method only if the source is not empty, or target method doesn't exist
            if (!isSourceMethodEmpty || !targetMethod) {
                targetMethods.set(methodName, method);
                printDebugMessage(`Added or replaced method: ${methodName} (Empty: ${isSourceMethodEmpty})`);
            } else {
                printDebugMessage(`Skipped replacing method: ${methodName} due to empty body in source`);
            }
        });

        // Update the methods list in targetClass
        targetClass.body.body = Array.from(targetMethods.values());

        // Retain inheritance only if the target class does not already have it
        if (!targetClass.superClass && sourceClass.superClass) {
            targetClass.superClass = sourceClass.superClass;
        }
    }

    // Traverse AST to collect and merge classes and functions
    const classesByName = new Map();
    const functionsByName = new Map();
    const newBody = [];

    ast.body.forEach(node => {
        let classNode = null;
        let className = null;

        if (node.type === 'ClassDeclaration') {
            classNode = node;
            className = node.id.name.toLowerCase();
        } else if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'ClassDeclaration') {
            classNode = node.declaration;
            className = classNode.id.name.toLowerCase();
        }

        if (classNode) {
            printDebugMessage(`Processing class: ${className}`);

            if (classesByName.has(className)) {
                const existingClass = classesByName.get(className);
                printDebugMessage(`Merging duplicate class: ${className}`);
                mergeClassMethods(existingClass, classNode);
            } else {
                classesByName.set(className, classNode);
                newBody.push(node); // Add the first occurrence
                printDebugMessage(`Added class: ${className}`);
            }
        } else if (node.type === 'FunctionDeclaration') {
            const functionName = node.id.name;
            printDebugMessage(`Processing function: ${functionName}`);
            functionsByName.set(functionName, node);
        } else {
            newBody.push(node); // Add non-class, non-function nodes as is
        }
    });

    // Add the latest instance of each function to the body
    functionsByName.forEach(functionNode => {
        newBody.push(functionNode);
    });

    // Replace the AST body with the merged classes and functions
    ast.body = newBody;

    // Generate code from the modified AST
    try {
        let updatedCode = astring.generate(ast);

        // Format the code with Prettier
        updatedCode = await prettier.format(updatedCode, {
            parser: 'babel',
            tabWidth: 4,
            useTabs: false,
            printWidth: 80,
            endOfLine: 'lf',
            semi: true,
            singleQuote: true
        });

        // Custom post-process to add extra lines between classes and functions
        updatedCode = await addCustomSpacing(updatedCode);

        // Write formatted code back to the file
        await writeFile(filePath, updatedCode, false);
        console.log(`Classes and functions in ${filePath} merged and formatted successfully.`);
    } catch (error) {
        console.error("Error during code generation or formatting:", error.message);
        await pressEnterToContinue();
    }
}



export async function organizeImportsAndDeclarations(filePath) {
    const fileContent = await readFile(filePath);

    // Parse into AST with loose parsing
    let ast;
    try {
        ast = acorn.parse(fileContent, { sourceType: 'module', ecmaVersion: 'latest' });
        console.log('AST parsing successful');
    } catch (error) {
        console.error("Parsing error:", error.message);
        process.exit(1);
    }

    // Separate imports, variable declarations, and other statements
    const importStatements = [];
    const variableDeclarations = [];
    const otherStatements = [];

    ast.body.forEach(node => {
        if (node.type === 'ImportDeclaration') {
            importStatements.push(node);
        } else if (node.type === 'VariableDeclaration') {
            variableDeclarations.push(node);
        } else {
            otherStatements.push(node);
        }
    });

    // Reorganize AST body with imports and variables at the top
    ast.body = [...importStatements, ...variableDeclarations, ...otherStatements];

    // Generate code from the modified AST
    let updatedCode = fileContent;
    try {
        updatedCode = astring.generate(ast);

        // Format the code with Prettier
        updatedCode = await prettier.format(updatedCode, {
            parser: 'babel',
            tabWidth: 4,
            useTabs: false,
            printWidth: 80,
            endOfLine: 'lf',
            semi: true,
            singleQuote: true
        });


        //updatedCode = await addCustomSpacing(updatedCode);
        // Write organized code back to the file
        await writeFile(filePath, updatedCode, false);
        console.log(`Imports and variable declarations in ${filePath} organized successfully.`);
    } catch (error) {
        console.error("Error during code generation or formatting:", error.message);
        await printAndPause({ message: "Error during code generation or formatting:", error }, 10);
        await pressEnterToContinue();
    }

    return updatedCode;
}




// Function to add custom spacing between classes and functions
function addCustomSpacing(code) {
    // Add 2 blank lines between class declarations
    code = code.replace(/}\nclass /g, '}\n\n\nclass ');

    // Add 1 blank line between methods inside classes
    code = code.replace(/}\n\s*(\w+\s*\()/g, '}\n\n    $1');

    // Add 2 blank lines between functions
    code = code.replace(/}\nfunction /g, '}\n\n\nfunction ');
    return code;
}



export async function convertMonkeyPatchesToClasses(fileContent) {
    // Read the file content
    //const fileContent = await readFile(filePath);

    // Parse into AST with loose parsing
    let ast;
    try {
        ast = acorn.parse(fileContent, { sourceType: 'module', ecmaVersion: 'latest' });
        printDebugMessage('AST parsing successful for monkey patch conversion');
    } catch (error) {
        console.error("Parsing error:", error.message);
        process.exit(1);
    }

    // Store detected monkey patches by class name
    const monkeyPatches = new Map();

    // Traverse the AST to locate monkey-patched methods
    const newBody = [];
    ast.body.forEach(node => {
        // Identify monkey patches
        if (
            node.type === 'ExpressionStatement' &&
            node.expression.type === 'AssignmentExpression' &&
            node.expression.left.type === 'MemberExpression' &&
            node.expression.left.object.type === 'Identifier' &&
            node.expression.left.property.type === 'Identifier'
        ) {
            const className = node.expression.left.object.name;
            const methodName = node.expression.left.property.name;
            const methodBody = node.expression.right;

            printDebugMessage(`Identified monkey patch: ${className}.${methodName}`);

            // Store the monkey-patched method by class name
            if (!monkeyPatches.has(className)) {
                monkeyPatches.set(className, []);
            }
            monkeyPatches.get(className).push({ methodName, methodBody });

            // Skip adding this node to the new body, effectively removing it
            return;
        }

        // Add non-monkey-patch nodes to the new AST body
        newBody.push(node);
    });

    // Create new class declarations for each monkey-patched class
    monkeyPatches.forEach((methods, className) => {
        printDebugMessage(`Creating new class for monkey-patched methods: ${className}`);

        // Create a new class AST node
        const newClass = {
            type: 'ClassDeclaration',
            id: { type: 'Identifier', name: className },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: methods.map(({ methodName, methodBody }) => ({
                    type: 'MethodDefinition',
                    key: { type: 'Identifier', name: methodName },
                    value: methodBody,
                    kind: 'method',
                    static: false,
                    computed: false
                }))
            }
        };

        // Add the new class to the list of appended classes
        newBody.push(newClass);
    });

    // Replace the AST body with the new body containing converted classes and no monkey patches
    ast.body = newBody;

    // Generate code from the modified AST
    try {
        let updatedCode = astring.generate(ast);

        // Format the code with Prettier
        updatedCode = await prettier.format(updatedCode, {
            parser: 'babel',
            tabWidth: 4,
            useTabs: false,
            printWidth: 80,
            endOfLine: 'lf',
            semi: true,
            singleQuote: true
        });

        // Write the modified code back to the file
        return updatedCode;
        console.log(`Monkey patches in ${filePath} converted to new classes and original patches removed successfully.`);
    } catch (error) {
        console.error("Error during code generation or formatting:", error.message);
        await pressEnterToContinue();
    }
}





export async function extractClassesAndFunctions(codeString) {
    // Parse the code string into an AST
    let ast;
    try {
        ast = acorn.parse(codeString, { sourceType: 'module', ecmaVersion: 'latest' });
        printDebugMessage('AST parsing successful for extracting classes and functions');
    } catch (error) {
        console.error("Parsing error:", error.message);
        return null;
    }

    // Filter AST to retain only class and function declarations
    const extractedBody = ast.body.filter(node =>
        node.type === 'ClassDeclaration' || node.type === 'FunctionDeclaration'
    );

    // Replace the AST body with only the extracted classes and functions
    const extractedAst = {
        ...ast,
        body: extractedBody
    };

    // Generate code from the extracted AST
    try {
        let extractedCode = astring.generate(extractedAst);

        // Format the extracted code with Prettier
        extractedCode = await prettier.format(extractedCode, {
            parser: 'babel',
            tabWidth: 4,
            useTabs: false,
            printWidth: 80,
            endOfLine: 'lf',
            semi: true,
            singleQuote: true
        });

        return extractedCode;
    } catch (error) {
        console.error("Error during code generation or formatting:", error.message);
        return null;
    }
}