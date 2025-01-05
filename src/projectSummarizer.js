
// file: projectSummarizer.js
import fs from 'fs';
import path from 'path';
// file: projectSummarizer.js
export class ProjectSummarizer {
    constructor(inputObject) {
        // default excluded files
        this.excludedFiles = [
            './node_modules',
            './.git',
            './.*'
        ];
        this.targetFolder = inputObject.targetFolder;
        this.excludedFiles = inputObject.excludedFiles ? [
            ...inputObject.excludedFiles,
            ...this.excludedFiles
        ] : this.excludedFiles;
    }
    generateFileTree() {
        let fileTreeString = '';
        const walkDir = (dir, indentLevel = 0) => {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                const indent = '  '.repeat(indentLevel);
                if (stat.isDirectory()) {
                    if (!this.excludedFiles.some(excluded => filePath.includes(excluded))) {
                        fileTreeString += `${ indent }- ${ file }/\n`;
                        walkDir(filePath, indentLevel + 1);
                    }
                } else {
                    if (!this.excludedFiles.some(excluded => filePath.includes(excluded))) {
                        fileTreeString += `${ indent }- ${ file }\n`;
                    }
                }
            });
        };
        walkDir(this.targetFolder);
        return fileTreeString;
    }
    collectAndConcatenateFiles() {
        let concatenatedFiles = '';
        const walkDir = dir => {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isFile() && !this.excludedFiles.some(excluded => filePath.includes(excluded))) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const relativePath = path.relative(this.targetFolder, filePath);
                    concatenatedFiles += `### ${ relativePath }\n\`\`\`\n${ fileContent }\n\`\`\`\n\n`;
                } else if (stat.isDirectory() && !this.excludedFiles.some(excluded => filePath.includes(excluded))) {
                    walkDir(filePath);
                }
            });
        };
        walkDir(this.targetFolder);
        return concatenatedFiles;
    }
    async summarize() {
        return `Project Summary:
===================================================================================================
File tree:
${ await this.generateFileTree() }
===================================================================================================
Project Source Files: 
${ await this.collectAndConcatenateFiles() }
`;
    }
}
// test code
export function test() {
    const summarizer = new ProjectSummarizer({
        targetFolder: './src',
        excludedFiles: ['./src/projectSummarizer.js']
    });
    // write the summary to a file
    summarizer.summarize().then(summary => {
        fs.writeFileSync('./projectSummary.md', summary);
    });
}
test();