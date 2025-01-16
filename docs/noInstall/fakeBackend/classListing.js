import { readFile, writeFile } from './fileIO.js';
import * as esprima from 'esprima-next';

export async function prependClassStructure(targetFile, onlyStubs = false) {
  // You can toggle onlyStubs = true or false as needed

  const fileContent = await readFile(targetFile);
  const list = await getMethodsWithArguments(fileContent, onlyStubs);
  //console.log(list);

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
  const ast = esprima.parseModule(code, {
    sourceType: 'module',
    tolerant: true,
    range: true,
    loc: true,
    attachComment: true,
  });
  const classInfo = new Map();

  ast.body.forEach(node => {
    let classNode = null;

    if (node.type === 'ClassDeclaration') {
      classNode = node;
    } else if (
      node.type === 'ExportNamedDeclaration' &&
      node.declaration &&
      node.declaration.type === 'ClassDeclaration'
    ) {
      classNode = node.declaration;
    }

    if (classNode && classNode.id && classNode.id.name) {
      const className = classNode.id.name;
      const parentClassName = classNode.superClass && classNode.superClass.name ? classNode.superClass.name : null;
      let methods = [];

      classNode.body.body.forEach(classElement => {
        
        if (classElement.type === 'MethodDefinition' && classElement.key.type === 'Identifier') {
          const methodName = classElement.key.name;
          const lineNumber = classElement.loc.start.line;
          //console.log(methodName,lineNumber);

          const args = classElement.value.params.map(param => {
            if (param.type === 'Identifier') return param.name;
            if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') return param.left.name;
            return 'unknown';
          });

          const methodBody = classElement.value.body?.body || [];
          const isStub =
            methodBody.length === 0 ||
            (methodBody.length === 1 &&
              methodBody[0].type === 'ReturnStatement' &&
              !methodBody[0].argument);

          methods.push({ name: methodName, args, isStub, lineNumber });
        }
      });

      if (onlyStubs) {
        methods = methods.filter(m => m.isStub);
      }

      classInfo.set(className, { className, parentClassName, methods});
    }
  });

  const sortedClasses = [];
  const processedClasses = new Set();

  function addClassAndSubclasses(className) {
    if (processedClasses.has(className)) return;
    const classData = classInfo.get(className);
    if (!classData) return;

    if (classData.parentClassName && classInfo.has(classData.parentClassName)) {
      addClassAndSubclasses(classData.parentClassName);
    }

    sortedClasses.push(classData);
    processedClasses.add(className);
  }

  Array.from(classInfo.keys()).forEach(addClassAndSubclasses);

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


export async function getListOfFunctions(code) {
  const ast = esprima.parseModule(code, {
    sourceType: 'module',
    tolerant: true,
    range: true,
    loc: true,
    attachComment: true,
  });
  const functionsInfo = new Map();

  ast.body.forEach(node => {
    let functionNode = null;

    if (node.type === 'FunctionDeclaration') {
      functionNode = node;
    } else if (
      node.type === 'ExportNamedDeclaration' &&
      node.declaration &&
      node.declaration.type === 'FunctionDeclaration'
    ) {
      functionNode = node.declaration;
    }

    if (functionNode && functionNode.id && functionNode.id.name) {
      const functionName = functionNode.id.name;
      const lineNumber = functionNode.loc.start.line;
      let args = [];

      functionNode.params.forEach(param => {
        if (param.type === 'Identifier') args.push(param.name);
        if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') args.push(param.left.name);
      });

      const isStub = functionNode.body.body.length === 0;

      functionsInfo.set(functionName, { functionName, args, isStub, lineNumber });
    }
  });

  // convert the Map to an object
  const result = {};
  functionsInfo.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

