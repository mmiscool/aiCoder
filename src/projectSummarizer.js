
// file: projectSummarizer.js
import fs from 'fs';
import path from 'path';
// file: projectSummarizer.js
export class ProjectSummarizer {
    constructor(inputObject) {
        this.excludedFiles = [
            'node_modules',
            '.git',
            '.*',
            '.*/*',
            'dist*',
            'build*',
            '.aicoder*',
            '*.png*',
            '*.jpg*',
            '*.jpeg*',
            '*.gif*',
            '*.ico*',
            '*.svg*',
            'CHANGELOG.xml',
            'package*.json',
            'LICENSE*'
        ];
        this.targetFolder = inputObject.targetFolder || './';
        this.maxFileSize = inputObject.maxFileSize || 1024 * 100;
        // 100KB default
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
                if (stat.isDirectory() && !this.isExcluded(filePath)) {
                    fileTreeString += `${ indent }- ${ file }/\n`;
                    walkDir(filePath, indentLevel + 1);
                } else if (stat.isFile() && !this.isExcluded(filePath)) {
                    fileTreeString += `${ indent }- ${ file }\n`;
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
                if (stat.isFile() && !this.isExcluded(filePath)) {
                    try {
                        const fileContent = fs.readFileSync(filePath, 'utf-8');
                        const relativePath = path.relative(this.targetFolder, filePath);
                        if (fileContent.length > this.maxFileSize) {
                            console.warn(`Warning: File ${ relativePath } exceeds maximum size limit. Truncating...`);
                            const truncatedContent = fileContent.substring(0, this.maxFileSize);
                            concatenatedFiles += `<file fileName="${ relativePath }">${ truncatedContent }...</file>\n\n`;
                        } else {
                            concatenatedFiles += `<file fileName="${ relativePath }">${ fileContent }</file>\n\n`;
                        }
                    } catch (error) {
                        console.error(`Error reading file ${ filePath }:`, error);
                    }
                } else if (stat.isDirectory() && !this.isExcluded(filePath)) {
                    walkDir(filePath);
                }
            });
        };
        walkDir(this.targetFolder);
        return concatenatedFiles;
    }
    async summarize() {
        return `<fileTree>
${ await this.generateFileTree() }
</fileTree>
<fileContents>
${ await this.collectAndConcatenateFiles() }
</fileContents>`;
    }
    isExcluded(filePath) {
        const normalizedPath = path.normalize(filePath).replace(/\\/g, '/');
        const fileName = path.basename(normalizedPath);
        // Direct check for hidden files (starting with '.')
        if (fileName.startsWith('.')) {
            return true;
        }
        return this.excludedFiles.some(pattern => {
            // Normalize the pattern to use forward slashes
            const normalizedPattern = pattern.replace(/\\/g, '/');
            if (normalizedPattern === '.*') {
                return fileName.startsWith('.');
            }
            // Handle directory patterns ending with /*
            if (normalizedPattern.endsWith('/*')) {
                const dirPattern = normalizedPattern.slice(0, -2);
                return normalizedPath.startsWith(dirPattern);
            }
            // Convert glob pattern to regex
            const regexPattern = normalizedPattern.replace(/\./g, '\\.').replace(/\*\*/g, '###').replace(/\*/g, '[^/]*').replace(/###/g, '.*').replace(/\?/g, '.');
            const regex = new RegExp(`^${ regexPattern }$|/${ regexPattern }$|^${ regexPattern }/|/${ regexPattern }/`);
            return regex.test(normalizedPath) || regex.test(fileName) || normalizedPath.includes(`/${ normalizedPattern }/`);
        });
    }
}
// test code
export function test() {
    console.log('Testing ProjectSummarizer');
    const summarizer = new ProjectSummarizer({
        targetFolder: './',
        excludedFiles: [
            '*/projectSummarizer.js',
            'docs',
            '*.xml',
            'scripts',
            'projectSummary.xml',
        ]
    });
    // write the summary to a file
    summarizer.summarize().then(summary => {
        fs.writeFileSync('./projectSummary.xml', summary);
    });
}
test();