import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';

export async function mergeSnippets(sourceCode, snippet) {
  const parser = new Parser();
  parser.setLanguage(JavaScript);

  // Parse the source code and the snippet into ASTs
  const sourceTree = parser.parse(sourceCode);
  const snippetTree = parser.parse(snippet);

  // Find root nodes for classes, functions, and variables
  const sourceRootNode = sourceTree.rootNode;
  const snippetRootNode = snippetTree.rootNode;

  // Logic to find and merge classes/functions/variables in the ASTs
  snippetRootNode.namedChildren.forEach(snippetNode => {
    if (snippetNode.type === 'class_declaration') {
      const className = snippetNode.childForFieldName('name').text;
      const sourceClassNode = findClassNodeByName(sourceRootNode, className);

      if (sourceClassNode) {
        mergeClassNodes(sourceClassNode, snippetNode);
      } else {
        // Append new class to the source
        sourceRootNode.appendChild(snippetNode);
      }
    } else if (snippetNode.type === 'function_declaration') {
      const functionName = snippetNode.childForFieldName('name').text;
      const sourceFunctionNode = findFunctionNodeByName(sourceRootNode, functionName);

      if (sourceFunctionNode) {
        // Replace the existing function
        sourceRootNode.replaceChild(sourceFunctionNode, snippetNode);
      } else {
        // Append the new function to the source
        sourceRootNode.appendChild(snippetNode);
      }
    } else if (snippetNode.type === 'variable_declaration') {
      snippetNode.namedChildren.forEach(variableDeclarator => {
        const variableName = variableDeclarator.childForFieldName('name').text;
        const sourceVariableNode = findVariableNodeByName(sourceRootNode, variableName);

        if (sourceVariableNode) {
          // Replace the existing variable declaration
          sourceRootNode.replaceChild(sourceVariableNode, snippetNode);
        } else {
          // Append the new variable declaration to the source
          sourceRootNode.appendChild(snippetNode);
        }
      });
    } else {
      // Handle non-class/function/variable snippets, add to root
      sourceRootNode.appendChild(snippetNode);
    }
  });

  // Regenerate the source code from the updated AST
  const updatedSourceCode = generateSourceCodeFromAST(sourceRootNode);

  return updatedSourceCode;
}

function findClassNodeByName(rootNode, className) {
  return rootNode.namedChildren.find(node =>
    node.type === 'class_declaration' &&
    node.childForFieldName('name').text === className
  );
}

function findFunctionNodeByName(rootNode, functionName) {
  return rootNode.namedChildren.find(node =>
    node.type === 'function_declaration' &&
    node.childForFieldName('name').text === functionName
  );
}

function findVariableNodeByName(rootNode, variableName) {
  return rootNode.namedChildren.find(node =>
    node.type === 'variable_declaration' &&
    node.namedChildren.some(declarator =>
      declarator.type === 'variable_declarator' &&
      declarator.childForFieldName('name').text === variableName
    )
  );
}

function mergeClassNodes(sourceClassNode, snippetClassNode) {
  snippetClassNode.namedChildren.forEach(snippetChild => {
    if (snippetChild.type === 'method_definition') {
      const methodName = snippetChild.childForFieldName('name').text;
      const sourceMethodNode = findMethodNodeByName(sourceClassNode, methodName);

      if (sourceMethodNode) {
        // Replace the existing method
        sourceClassNode.replaceChild(sourceMethodNode, snippetChild);
      } else {
        // Append the new method to the class
        sourceClassNode.appendChild(snippetChild);
      }
    }
  });
}

function findMethodNodeByName(classNode, methodName) {
  return classNode.namedChildren.find(node =>
    node.type === 'method_definition' &&
    node.childForFieldName('name').text === methodName
  );
}

function generateSourceCodeFromAST(rootNode) {
  // Implement code generation logic based on the updated AST
  // You could use an external library or write a custom function for this
  return rootNode.toString();
}

