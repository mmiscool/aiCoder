import fs from 'fs';
import path from 'path';

/**
 * Adds files to .gitignore if they are not already present.
 * @param {string[]} files - Array of file paths to add to .gitignore.
 */
function addFilesToGitignore(files) {
    const gitignorePath = path.resolve('.gitignore');

    // Read the .gitignore file or create it if it doesn't exist
    let gitignoreContent = '';
    try {
        gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error reading .gitignore: ${err}`);
            return;
        }
    }

    // Split the content by lines and create a Set for quick lookups
    const gitignoreLines = new Set(gitignoreContent.split('\n').map(line => line.trim()));

    // Collect files to be added
    const newEntries = files.filter(file => !gitignoreLines.has(file));

    if (newEntries.length === 0) {
        console.log('All files are already in .gitignore.');
        return;
    }

    // Append new entries to .gitignore
    const updatedContent = gitignoreContent + '\n' + newEntries.join('\n') + '\n';
    try {
        fs.writeFileSync(gitignorePath, updatedContent);
        console.log(`Added ${newEntries.length} new file(s) to .gitignore.`);
    } catch (err) {
        console.error(`Error writing to .gitignore: ${err}`);
    }
}

// Example usage:
addFilesToGitignore(['*aiCoder/*key*', '*aiCoder/backups/*']);
