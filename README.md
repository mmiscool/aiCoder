# aiCoder
Unleash the Power of AI to Write JS Libraries!


## INSTALLATION 
```
npm install -g .
```
Getting started is a breeze! Just run the above command to install `aiCoder` globally.


## USAGE
Dive into your project folder using your terminal and launch the ```aiCoder``` command to start the magic. 
```
cd myProjectFolder
aiCoder
```

It will prompt you to select a file. You can also call ```aiCoder ./fileName.js``` to skip this step. 


A dynamic menu will appear, offering a variety of exciting options. Use the arrow keys to navigate through the possibilities. 
```
Current file: (junk/BREP.js)
? Select an action: (Use arrow keys)
❯ Make AI assisted code changes
  Identify missing or incomplete functionality and add it
  Make my code more elegant
 ──────────────
  Merge and format classes
  Setup openAI API key
  Edit pre-made prompts
  Select a different file
  Restore file from backup
  Exit
```

## Setup openAI API key
Select this option to input your openAI API key. This will be stored in the file ```./.aiCoder/openai-key.txt``` in the current directory. 

## Make AI assisted code changes
This tool will ask you what you want to achieve. You can request changes or describe issues you're facing with the current code file.

The LLM response will be displayed in the terminal when received. 

You can either provide further instructions or simply hit enter to apply the code snippets from the last response to the current file. 

It will then prompt you to either accept or reject each snippet from the response. 

## Identify missing or incomplete functionality and add it
Pre-written instructions for the LLM can be incredibly useful for specific tasks. 

In this case, we have the pre-made prompt ```Identify missing or incomplete functionality and add it```

This is particularly handy when there are stub functions or missing functionality in a library. The LLM will attempt to identify and generate the missing code. 

This feature is highly valuable, and you can easily create your own pre-made prompts to display in the menu. 


# Settings and Backups
The settings for aiCoder are stored per project in a folder `./.aiCoder/`. This folder also contains backups of files modified by the tool, stored in `./.aiCoder/backups/`.

## Edit pre-made prompts
This option will launch the nano text editor and open the ```./aiCoder/premade-prompts.txt``` file. You can add your own pre-made prompts in this file. Each prompt needs to be a single line of text.

You can add comments to this file by starting a line with a ```#``` character. 

## Backup Functionality
Whenever a file is modified by aiCoder, a backup of the original file is created in the `./.aiCoder/backups/` folder. The backup file names include a timestamp to help identify different versions.

## Restore file from backup
You can restore a file from its backup by selecting the `Restore file from backup` option in the menu. This will list all the available backup versions for the selected file, and you can choose which version to restore.

```
Current file: (junk/BREP.js)
✔ Select an action: Restore file from backup
Restoring file from backup: junk/BREP.js
? Select a backup version to restore:
❯ .aiCoder/backups/junk/BREP.js_backup_2024-10-29T01-10-21.732Z
  .aiCoder/backups/junk/BREP.js_backup_2024-10-29T03-14-57.722Z
  .aiCoder/backups/junk/BREP.js_backup_2024-10-29T03-15-22.568Z
  .aiCoder/backups/junk/BREP.js_backup_2024-10-29T05-58-19.764Z
  .aiCoder/backups/junk/BREP.js_backup_2024-10-29T06-01-08.084Z
  .aiCoder/backups/junk/BREP.js_backup_2024-10-29T06-04-01.031Z
  .aiCoder/backups/junk/BREP.js_backup_2024-10-29T06-17-31.942Z
```



# Current state of this project
Implemented: 
 * Clean up javascript file with multiple definitions of the same classes and functions updating the first instance of the class with elements of the class later defined in the file (Handy if you just copy and paste LLM snippets to the end of a file and want to automatically intelligently merge them in to the correct location. Works only on JS files at the moment.)
 * Prompt for instructions to modify a single JS file.
 * Backup files before they are modified. This is extremely important to prevent making unintended changes. 
 * Extraction of code snippets from last LLM response and automated workflow to accept or reject on a per snippet basis. 
 * Custom reusable pre-made prompt manager. 

Todo: 
 * Make the tool work with multiple files at the same time. 
 * Provide options to use other LLMs besides the openAI.
 * Make it possible for the llm to request adding NPM packages to project.
 * Add support for LLM to work with html, css and md files in addition to js. This will require parsing these files to an AST (abstract syntax tree) and merging ASTs to recreate the file. 
 * Preserve comments when merging. 
