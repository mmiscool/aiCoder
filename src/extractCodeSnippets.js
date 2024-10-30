export function extractCodeSnippets(markdownText) {
  const codeSnippets = [];
  const codeBlockRegex = /```[\s\S]*?```/g;

  let matches;
  while ((matches = codeBlockRegex.exec(markdownText)) !== null) {
    // Remove the backticks and any language specifier (like javascript) from the match
    const codeSnippet = matches[0].replace(/```(?:\w+)?|```/g, '').trim();

    codeSnippets.push(codeSnippet);
  }

  return codeSnippets;
}
