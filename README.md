# aiCoder
A tool to write JS libraries using AI


# INSTALLATION 
```
npm install -g .
```


# USAGE
Simply navigate to your projects folder using your terminal and launch the ```aiCoder``` command to start it. 
```
cd myProjectFolder
aiCoder
```

It will ask the user to select a file. You can call ```aiCoder ./fileName.js``` to skip this step. 


It will present a menu of things you can do. You can us the arrow keys to navigate the menu. 
```
? What do you want to do?
❯ Make AI assisted code changes
  Identify missing or incomplete functionality and add it
 ──────────────
  Identify missing imports.
 ──────────────
  Merge and format classes
  Setup openAI API key
  Edit pre-made prompts
  Select a different file
  Exit
```

# Setup openAI API key
Select this option to input your openAI api key. This will be stored in the file ```openai-key.txt``` in the current directory. 

# Make AI assisted code changes
This tool will ask the user for what they want to do. You can ask for changes or tell the LLM about problems you are having with the current code file.

The LLM response will be displayed in the terminal when the response is received. 

You can either give it more instructions or simply hit enter to apply the code snippets in the last response to the current file. 

It will then prompt you to either accept or reject each snippet from the response. 

# Identify missing or incomplete functionality and add it
It can be useful to have some pre written instructions for the LLM to do specific tasks. 

In this case we have the pre-made prompt ```Identify missing or incomplete functionality and add it```

I use this frequently when there are stub functions or missing functionality in a library. The LLM will attempt to identify missing functionality and generate the missing code. 

This is a particularly useful feature and you can create your own pre-made prompts to display in the menu easily. 

# Edit pre-made prompts
This option will launch the nano text editor and open the ```premade-prompts.txt``` file. You can add your own pre-made prompts in this file. Each prompt needs to be a single line of text.

You can add comments to this file by starting a line with a ```#``` character. 