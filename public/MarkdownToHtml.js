// MarkdownToHtml.js
// A class-based Markdown to HTML converter with inline JavaScript syntax highlighting

export class MarkdownToHtml {
    constructor(targetElement, markdown) {
        if (!(targetElement instanceof HTMLElement)) {
            throw new Error("Target element must be a valid DOM element.");
        }
        this.targetElement = targetElement;
        this.codeBlocks = [];

        this.listStyles = {
            paddingLeft: "20px", // Add indentation for nested lists
        };

        this.codeBlockStyles = {
            backgroundColor: "black",
            color: "white",
            padding: "0px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            borderRadius: "4px",
            overflowX: "auto",
            maxWidth: "100%",
            margin: "0px",
            padding: "0px",
            display: "inline-block",
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
        const pre = document.createElement("pre");
        const code = document.createElement("code");


        code.textContent = content; // No extra wrapping or element creation
        this.codeBlocks.push(content);
        this.applyStyles(pre, this.codeBlockStyles);

        // Add the language class for CSS-based styling
        if (language) {
            code.classList.add(`language-${language.toLowerCase()}`);
        } else {
            code.classList.add("language-plaintext");
        }
        code.style.paddingTop = "30px";

        pre.appendChild(code);
        return pre;
    }


    highlightJavaScript(code) {
        // Regex patterns for JavaScript syntax
        const patterns = [
            { regex: /(\/\/.*$)/gm, class: "comment" }, // Single-line comment
            { regex: /(["'`])(?:\\.|[^\1\\])*?\1/g, class: "string" }, // String literals
            { regex: /\b(const|let|var|if|else|for|while|function|return|class|new|this|super|import|export|default|extends)\b/g, class: "keyword" }, // Keywords
            { regex: /\b\d+(\.\d+)?\b/g, class: "number" }, // Numbers
            { regex: /\b(true|false|null|undefined)\b/g, class: "literal" }, // Literals
        ];

        let highlighted = this.escapeHtml(code);

        patterns.forEach(({ regex, class: className }) => {
            highlighted = highlighted.replace(regex, (match) => `<span class="${className}">${match}</span>`);
        });

        return highlighted;
    }

    escapeHtml(text) {
        const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return text.replace(/[&<>"']/g, (char) => map[char]);
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
            if (match.index > lastIndex) {
                elements.push(document.createTextNode(line.slice(lastIndex, match.index)));
            }

            if (match[2]) {
                const strong = document.createElement("strong");
                strong.textContent = match[2];
                elements.push(strong);
            } else if (match[3]) {
                const em = document.createElement("em");
                em.textContent = match[3];
                elements.push(em);
            } else if (match[4]) {
                const code = document.createElement("code");
                code.textContent = match[4];
                elements.push(code);
            } else if (match[5] && match[6]) {
                const a = document.createElement("a");
                a.textContent = match[5];
                a.href = match[6];
                elements.push(a);
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
            elements.push(document.createTextNode(line.slice(lastIndex)));
        }

        return elements;
    }

    applyStyles(element, styles) {
        Object.assign(element.style, styles);
    }
}
