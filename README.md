# aiCoder
**Harness AI to Craft Your JavaScript Libraries with Ease!**

Sick of endlessly copying and pasting code snippets from ChatGPT into your editor? **aiCoder** is here to transform your coding experience.

With **aiCoder** as your coding co-pilot, you’ll streamline development, refine your code, and bring your ideas to life through the power of AI. This tool lets you modify code files seamlessly using natural language prompts, intelligently merging AI-suggested changes without altering or disrupting the original code.

The real magic? aiCoder’s advanced merging keeps your code intact, seamlessly integrating new snippets with precision and reliability.



## INSTALLATION 
Clone this repo and navigate to the directory. 
```
cd aiCoder
npm install && npm install -g .
```
Getting started is a breeze! Just run the above command to install `aiCoder` globally.


## USAGE
Dive into your project folder using your terminal and launch the ```aiCoder``` command to start the magic. 
```
cd myProjectFolder
aiCoder
```

It will prompt you to select a file. You can also call ```aiCoder ./fileName.js``` to skip this step. 
```
? Select a file:
/home/user/projects/aiCoder/
├── src/
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
↑↓ navigate, <enter> select or open directory
<backspace> go back
```


A dynamic menu will appear, offering a variety of exciting options. Use the arrow keys to navigate through the possibilities. 
```
Current file: (BREP.js)
? Select an action: (Use arrow keys)
❯ Make AI assisted code changes
  Identify missing or incomplete functionality and add it
  Merge and format classes
 ──────────────
  Project settings
  Restore file from backup
 ──────────────
  Select a different file
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


# Project settings
The settings for aiCoder are stored per project in a folder `./.aiCoder/`. This folder also contains backups of files modified by the tool, stored in `./.aiCoder/backups/`.

```
? Settings: (Use arrow keys)
❯ Setup LLM
  Edit pre-made prompts
  Edit default system prompt
  skip approving changes (this session only)
 ──────────────
  Back to main menu
```
## Setup LLM
Provides a menu to configure the LLM you want to use. 
```
? Select the LLM setting you want to change: (Use arrow keys)
❯ API key
  Model
  AI service
 ──────────────
  back
```

## Edit pre-made prompts
This option will launch the nano text editor and open the ```./aiCoder/premade-prompts.txt``` file. You can add your own pre-made prompts in this file. Each prompt needs to be a single line of text.

You can add comments to this file by starting a line with a ```#``` character and these lines will be ignored. 

## Edit default system prompt
This will allow you to edit the default system prompt. You might want to modify this to adapt it to your specific project. Each time the LLM is called this prompt will be sent before the code and your specific instructions. You can put in instructions about what the end goal of your project is and your preferences about what style of code is generated. 

## Selecting and choosing an LLM provider
This feature has been recently added so your milage may vary. It is recommended to use openai at the moment. 
Ollama seems to provide better results than groq at this time. 

## Skip approving changes (this session only)


## Backup Functionality
Whenever a file is modified by aiCoder, a backup of the original file is created in the `./.aiCoder/backups/` folder. The backup file names include a timestamp to help identify different versions.

## ⭯ Restore file from backup
You can restore a file from its backup by selecting the `Restore file from backup` option in the menu. This will list all the available backup versions for the selected file, and you can choose which version to restore.

```
Current file: (BREP.js)
✔ Select an action: Restore file from backup
Restoring file from backup: BREP.js
? Select a backup version to restore:
❯ .aiCoder/backups/BREP.js_backup_2024-10-29T01-10-21.732Z
  .aiCoder/backups/BREP.js_backup_2024-10-29T03-14-57.722Z
  .aiCoder/backups/BREP.js_backup_2024-10-29T03-15-22.568Z
  .aiCoder/backups/BREP.js_backup_2024-10-29T05-58-19.764Z

```



# ✅ Current state of this project
Implemented: 
 * Clean up javascript file with multiple definitions of the same classes and functions updating the first instance of the class with elements of the class later defined in the file (Handy if you just copy and paste LLM snippets to the end of a file and want to automatically intelligently merge them in to the correct location. Works only on JS files at the moment.)
 * Prompt for instructions to modify a single JS file.
 * Backup files before they are modified. This is extremely important to prevent making unintended changes. 
 * Extraction of code snippets from last LLM response and automated workflow to accept or reject on a per snippet basis. 
 * Custom reusable pre-made prompt manager. 
 * Provide options to use other LLMs besides the openAI.
 * Automatic setup on first use (prompt for LLM provider, api key and model selection)

Todo: 
 * Make the tool work with multiple files at the same time. 
 * Make it possible for the llm to request adding NPM packages to project.
 * Add support for LLM to work with html, css and md files in addition to js. This will require parsing these files to an AST (abstract syntax tree) and merging ASTs to recreate the file. 
 * Preserve comments when merging. 
 * Publish as npm package


# 🌌 The Future Awaits
aiCoder is more than just a tool—it's your personal AI code assistant, crafted to make development smarter, faster, and, yes, even a bit more magical.

Start your journey with aiCoder today and redefine what’s possible in coding! 🌟

