import { readFile, writeFile } from './fileIO.js';
import * as esprima from 'esprima';

export async function prependClassStructure(targetFile, onlyStubs = false) {
  // You can toggle onlyStubs = true or false as needed

  const fileContent = await readFile(targetFile);
  const list = await getMethodsWithArguments(fileContent, onlyStubs);
  console.log(list);

  // Prompt if the user wants to include function names in the list
  const includeFunctions = true;

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

  //console.log(listOfClasses);

  // Prepend the list to the file content
  await writeFile(targetFile, listOfClasses + '\n\n' + fileContent);
}


export function getMethodsWithArguments(code, onlyStubs = false) {
  //console.log(code);
  // Parse the code using esprima
  const ast = esprima.parseModule(code, {
    sourceType: 'module',
    tolerant: true,
    range: true,
    loc: true,
    attachComment: true
  });
  const classInfo = new Map();

  // Collect information on each class, its methods, and arguments
  ast.body.forEach(node => {
    if (node.type === 'ClassDeclaration' && node.id && node.id.name) {
      const className = node.id.name;
      const parentClassName = node.superClass && node.superClass.name ? node.superClass.name : null;
      let methods = [];

      node.body.body.forEach(classElement => {
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          const methodName = classElement.key.name;
          const startCharacterLocation = classElement.start;
          console.log(classElement.loc);
          const lineNumber = classElement.loc.start.line;

          // Collect method arguments
          const args = classElement.value.params.map(param => {
            if (param.type === 'Identifier') return param.name;
            if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') return param.left.name;
            return 'unknown';
          });

          // Check if method is a stub
          const methodBody = classElement.value.body?.body || [];
          const isStub =
            methodBody.length === 0 ||
            (methodBody.length === 1 &&
              methodBody[0].type === 'ReturnStatement' &&
              !methodBody[0].argument);

          methods.push({ name: methodName, args, isStub, lineNumber });
        }
      });

      // If onlyStubs is true, filter out non-stub methods
      if (onlyStubs) {
        methods = methods.filter(m => m.isStub);
      }

      classInfo.set(className, { className, parentClassName, methods });
    }
  });

  // Sort classes based on dependency hierarchy
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

    sortedClasses.push(classData);
    processedClasses.add(className);
  }

  //console.log(classInfo);
  // Process classes in the order they appear in the original code
  Array.from(classInfo.keys()).forEach(addClassAndSubclasses);

  // Convert sorted classes into the final output format
  const result = {};
  sortedClasses.forEach(({ className, methods }) => {
    result[className] = methods;
  });



  return result;
}

export async function getStubMethods(code) {
  // Call the original getMethodsWithArguments function with onlyStubs = true
  const allMethods = await getMethodsWithArguments(code, true);

  // Filter to only include classes and methods where isStub is true
  const stubMethods = {};

  for (const [className, methods] of Object.entries(allMethods)) {
    const stubMethodsInClass = methods.filter(method => method.isStub);

    // Only include the class if it has stub methods
    if (stubMethodsInClass.length > 0) {
      stubMethods[className] = stubMethodsInClass;
    }
  }

  return stubMethods;
}
