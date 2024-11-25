import * as acorn from 'acorn-loose';
import { confirmAction } from './terminalHelpers.js';
import { readFile, writeFile, } from './fileIO.js';
import { filePathArg, } from './fileSelector.js';


export async function showListOfClassesAndFunctions(onlyStubs = true) {
  onlyStubs = true;
  const list = await getMethodsWithArguments(await readFile(filePathArg), onlyStubs);
  console.log(list);

  // Prompt if the user wants to include function names in the list
  const includeFunctions = true; //await confirmAction('Include function names in the list?', false);

  // Build the output of classes and methods
  let listOfClasses = '';

  for (const className in list) {
    const methods = list[className];

    // Start the class declaration
    listOfClasses += `class ${className} {`;

    // Optionally add method names with arguments
    if (includeFunctions) {
      listOfClasses += '\n';
      methods.forEach(({ name, args }) => {
        const argList = args.join(', ');
        listOfClasses += `  ${name}(${argList}) {}\n`;
      });
    }

    // Close the class
    listOfClasses += `}\n\n`; // Double newline for separation between classes
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




export function getMethodsWithArguments(code) { 
  const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 'latest' });
  const classInfo = new Map();

  // Collect information on each class, its methods, and arguments
  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration') {
      const className = node.id.name;
      const parentClassName = node.superClass && node.superClass.name ? node.superClass.name : null;
      const methods = [];

      node.body.body.forEach(classElement => {
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          const methodName = classElement.key.name;

          // Collect method arguments
          const args = classElement.value.params.map(param => {
            if (param.type === 'Identifier') return param.name;
            if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') return param.left.name;
            return 'unknown';
          });

          // Check if method is a stub
          const isStub =
            classElement.value.body &&
            (classElement.value.body.body.length === 0 || // Empty body
              (classElement.value.body.body.length === 1 &&
                classElement.value.body.body[0].type === 'ReturnStatement' &&
                !classElement.value.body.body[0].argument)); // Single "return;" statement

          // Debugging output for each method
          console.debug(`Class: ${className}, Method: ${methodName}, Args: ${args}, IsStub: ${isStub}`);

          // Include all methods, no filter for onlyStubs
          methods.push({ name: methodName, args, isStub });
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



export async function getStubMethods(code) {
  // Call the original getMethodsWithArguments function
  const allMethods = await getMethodsWithArguments(code);

  // Filter to only include classes and methods where isStub is true
  const stubMethods = {};

  for (const [className, methods] of Object.entries(allMethods)) {
    // Filter methods within the class asynchronously
    const stubMethodsInClass = await methods.filter(method => method.isStub);

    // Only include the class if it has stub methods
    if (stubMethodsInClass.length > 0) {
      stubMethods[className] = stubMethodsInClass;
    }
  }

  return stubMethods;
}
