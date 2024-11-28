// MarkdownToHtml.js
// A class-based Markdown to HTML converter with a target DOM element

export class MarkdownToHtml {
    constructor(targetElement, markdown) {
        if (!(targetElement instanceof HTMLElement)) {
            throw new Error("Target element must be a valid DOM element.");
        }
        this.targetElement = targetElement;

        this.rules = {
            heading: /^(#{1,6})\s+([^\n]+)$/gm,
            bold: /\*\*([^\*]+)\*\*/g,
            italic: /\*([^\*]+)\*/g,
            codeBlock: /```([^`]+)```/gs,
            inlineCode: /`([^`]+)`/g,
            link: /\[([^\]]+)\]\(([^\)]+)\)/g,
            listItem: /^(\*|\-|\+)\s+(.+)/gm,
            blockquote: /^>\s+(.+)/gm,
            newline: /\n/g
        };

        this.codeBlockBackgroundColor = "black";
        this.codeBlockColor = "cyan";

        this.codeStyle = `style='color:${this.codeBlockColor};padding:5px;'`;

        if (markdown) {
            this.render(markdown);
        }
    }

    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        return text.replace(/[&<>"']/g, (char) => map[char]);
    }

    parse(markdown) {
        let html = this.escapeHtml(markdown);

        html = html.replace(this.rules.heading, (_, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content.trim()}</h${level}>`;
        });

        html = html.replace(this.rules.codeBlock, (_, code) => {
            return `<pre><code ${this.codeStyle}>${this.escapeHtml(code.trim())}</code></pre>`;
        });

        html = html.replace(this.rules.inlineCode, (_, code) => {
            return `\`${this.escapeHtml(code)}\``;
        });

        html = html.replace(this.rules.bold, (_, text) => `<strong>${text}</strong>`);
        html = html.replace(this.rules.italic, (_, text) => `<em>${text}</em>`);

        html = html.replace(this.rules.link, (_, text, href) => {
            return `<a href="${this.escapeHtml(href)}">${this.escapeHtml(text)}</a>`;
        });

        html = html.replace(this.rules.listItem, (_, marker, text) => {
            return `<li>${this.escapeHtml(text.trim())}</li>`;
        });

        html = html.replace(this.rules.blockquote, (_, quote) => {
            return `<blockquote>${this.escapeHtml(quote.trim())}</blockquote>`;
        });

        html = html.replace(this.rules.newline, "<br>");

        return html;
    }

    render(markdown) {
        const html = this.parse(markdown);
        this.targetElement.innerHTML = html;
    }
}

