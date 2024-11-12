import * as acorn from 'acorn-loose';

import {confirmAction} from './terminalHelpers.js';

import { readFile, writeFile, } from './fileIO.js';
import {  filePathArg,  } from './fileSelector.js';


export async function showListOfClassesAndFunctions() {
  const list = await getClassAndFunctionList(await readFile(filePathArg));

  // Prompt if the user wants to include function names in the list
  const includeFunctions = await confirmAction('Include function names in the list?', false);

  // Print the list in terminal in the format: class name extends parentClass {}
  let listOfClasses = '';

  for (const className in list) {
    const { functions, superClass } = list[className];
    const extendsClause = superClass ? ` extends ${superClass}` : '';

    // Start the class declaration
    listOfClasses += `class ${className}${extendsClause} {`;

    // Optionally add function names
    if (includeFunctions) {
      listOfClasses += '\n';
      functions.forEach(func => {
        listOfClasses += `  ${func}() {}\n`;
      });
    }

    // Close the class
    listOfClasses += `}\n`; // Double newline for separation between classes
  }

  console.log(listOfClasses);

  // Prompt if the user wants to prepend the list to the file
  const prependToFile = await confirmAction('Prepend the list to the file?', false);

  if (prependToFile) {
    // Read the file
    const fileContent = await readFile(filePathArg);

    // Prepend the list to the file content
    await writeFile(filePathArg, listOfClasses + '\n\n' + fileContent);
  }
}

export function getClassAndFunctionList(code) {
  const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 'latest' });
  const classFunctionMap = {};

  ast.body.forEach(node => {
    let classNode = null;

    if (node.type === 'ClassDeclaration') {
      // Regular class declaration
      classNode = node;
    } else if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'ClassDeclaration') {
      // Exported class declaration
      classNode = node.declaration;
    }

    if (classNode) {
      const className = classNode.id.name;
      const superClass = classNode.superClass ? classNode.superClass.name : null;
      const functions = [];

      classNode.body.body.forEach(classElement => {
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          functions.push(classElement.key.name);
        }
      });

      classFunctionMap[className] = { functions, superClass };
    }
  });

  return classFunctionMap;
}




export function getClassAndFunctionListSorted(code) {
  const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 'latest' });
  const classInfo = new Map();

  // Collect information on each class and its methods, along with its parent class if it extends one
  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration') {
      const className = node.id.name;
      const parentClassName = node.superClass && node.superClass.name ? node.superClass.name : null;
      const methods = [];

      node.body.body.forEach(classElement => {
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          methods.push(classElement.key.name);
        }
      });

      classInfo.set(className, { className, parentClassName, methods });
    }
  });

  // Sort classes based on dependency hierarchy and alphabetically within each level
  const sortedClasses = [];
  const processedClasses = new Set();

  function addClassAndSubclasses(className) {
    if (processedClasses.has(className)) return;

    const classData = classInfo.get(className);
    if (!classData) return;

    // Add the parent class first if it exists
    if (classData.parentClassName && classInfo.has(classData.parentClassName)) {
      addClassAndSubclasses(classData.parentClassName);
    }

    // Add the current class
    sortedClasses.push(classData);
    processedClasses.add(className);
  }

  // Sort classes alphabetically before building the hierarchy
  Array.from(classInfo.keys()).sort().forEach(addClassAndSubclasses);

  // Convert sorted classes into the final output format
  const result = {};
  sortedClasses.forEach(({ className, methods }) => {
    result[className] = methods;
  });

  return result;
}






