// MarkdownToHtml.js
// A class-based Markdown to HTML converter with proper indentation for lists

export class MarkdownToHtml {
    constructor(targetElement, markdown) {
        if (!(targetElement instanceof HTMLElement)) {
            throw new Error("Target element must be a valid DOM element.");
        }
        this.targetElement = targetElement;

        this.listStyles = {
            paddingLeft: "20px", // Add indentation for nested lists
        };

        this.codeBlockStyles = {
            backgroundColor: "black",
            color: "cyan",
            padding: "10px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            borderRadius: "4px",
        };

        if (markdown) {
            this.render(markdown);
        }
    }

    render(markdown) {
        this.targetElement.innerHTML = ""; // Clear previous content
        const lines = markdown.split("\n");

        const fragment = this.parseLines(lines);

        this.targetElement.appendChild(fragment);
    }

    parseLines(lines) {
        const fragment = document.createDocumentFragment();
        let insideCodeBlock = false;
        let codeContent = [];
        let codeLanguage = "";
        let currentList = null;

        for (const line of lines) {
            if (insideCodeBlock) {
                if (line.startsWith("```")) {
                    // End of code block
                    const pre = this.createCodeBlockElement(codeContent.join("\n"), codeLanguage);
                    fragment.appendChild(pre);
                    insideCodeBlock = false;
                    codeContent = [];
                    codeLanguage = "";
                } else {
                    codeContent.push(line);
                }
                continue;
            }

            if (line.startsWith("```")) {
                // Start of code block
                insideCodeBlock = true;
                codeLanguage = line.slice(3).trim(); // Capture language, if specified
                continue;
            }

            if (/^\s*[\*\-\+]\s/.test(line)) {
                // List item
                const listItem = this.createListItem(line);

                if (!currentList) {
                    // Start a new list if not already in one
                    currentList = document.createElement("ul");
                    this.applyStyles(currentList, this.listStyles);
                    fragment.appendChild(currentList);
                }
                currentList.appendChild(listItem);
            } else {
                if (currentList) {
                    // Close the current list if a non-list line is encountered
                    currentList = null;
                }

                if (/^#{1,6}\s/.test(line)) {
                    // Heading
                    const heading = this.createHeadingElement(line);
                    fragment.appendChild(heading);
                } else if (/^\>\s/.test(line)) {
                    // Blockquote
                    const blockquote = this.createBlockquoteElement(line);
                    fragment.appendChild(blockquote);
                } else if (line.trim() === "") {
                    // Skip empty lines
                    continue;
                } else {
                    // Paragraph with inline formatting
                    const paragraph = this.createParagraphElement(line);
                    fragment.appendChild(paragraph);
                }
            }
        }

        return fragment;
    }

    createCodeBlockElement(content, language) {
        const pre = document.createElement("code");
        // 

        pre.textContent = content;
        this.applyStyles(pre, this.codeBlockStyles);
        if (language) {
            pre.setAttribute("data-language", language);
        }
        return pre;
    }

    createHeadingElement(line) {
        const match = line.match(/^(#{1,6})\s+(.*)$/);
        const level = match[1].length;
        const text = match[2];
        const heading = document.createElement(`h${level}`);
        heading.textContent = text;
        return heading;
    }

    createBlockquoteElement(line) {
        const text = line.replace(/^\>\s/, "").trim();
        const blockquote = document.createElement("blockquote");
        blockquote.textContent = text;
        return blockquote;
    }

    createListItem(line) {
        const text = line.replace(/^\s*[\*\-\+]\s/, "").trim();
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    }

    createParagraphElement(line) {
        const paragraph = document.createElement("p");
        const formattedContent = this.parseInlineFormatting(line);
        paragraph.append(...formattedContent);
        return paragraph;
    }

    parseInlineFormatting(line) {
        const elements = [];
        const regex = /(\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[(.*?)\]\((.*?)\))/g;
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(line)) !== null) {
            // Add text before the current match
            if (match.index > lastIndex) {
                elements.push(document.createTextNode(line.slice(lastIndex, match.index)));
            }

            if (match[2]) {
                // Bold (**text**)
                const strong = document.createElement("strong");
                strong.textContent = match[2];
                elements.push(strong);
            } else if (match[3]) {
                // Italic (*text*)
                const em = document.createElement("em");
                em.textContent = match[3];
                elements.push(em);
            } else if (match[4]) {
                // Inline code (`text`)
                const code = document.createElement("code");
                code.textContent = match[4];
                elements.push(code);
            } else if (match[5] && match[6]) {
                // Link [text](url)
                const a = document.createElement("a");
                a.textContent = match[5];
                a.href = match[6];
                elements.push(a);
            }

            lastIndex = regex.lastIndex;
        }

        // Add remaining text after the last match
        if (lastIndex < line.length) {
            elements.push(document.createTextNode(line.slice(lastIndex)));
        }

        return elements;
    }

    applyStyles(element, styles) {
        Object.assign(element.style, styles);
    }
}
