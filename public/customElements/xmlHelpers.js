




async function escapeForXMLAsync(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
const specialTags = ['code-snippet'];
export async function escapeCodeSnippetContent(originalText, tags = specialTags) {
    const tagPattern = tags.map(tag => `<(${tag})\\b([^>]*)>([\\s\\S]*?)</\\1>`).join('|');
    const regex = new RegExp(tagPattern, 'g');

    let match;
    const replacements = [];
    while ((match = regex.exec(originalText)) !== null) {
        const [fullMatch, tagName, attributes, content] = match;
        const escapedContent = await escapeForXMLAsync(content);
        const replacement = `<${tagName}${attributes}>${escapedContent}</${tagName}>`;
        replacements.push({ fullMatch, replacement });
    }

    let escapedText = originalText;
    for (const { fullMatch, replacement } of replacements) {
        escapedText = escapedText.replace(fullMatch, replacement);
    }

    return escapedText;
}
