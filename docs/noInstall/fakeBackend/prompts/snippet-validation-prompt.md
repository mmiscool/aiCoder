# Code Review Instructions for LLM

Review all provided code snippets to ensure they comply with the following rules. If any rule is not followed, **rewrite the snippets to conform**. If all the rules are followed reply with "yes"

1. **Code snippets are in correct language (Important)**:  
   - **All code snippets must be javascript**

2. **Class Context (Important)**:  
   - **All functions must be encapsulated within the class syntax.** 
   - Include the relevant class structure with each function, even if the class is incomplete. *The function should never be presented outside of a class context.* This is extremely important.
   
3. **No Examples or Tests**:  
   - Do not include examples or test cases in the snippet. Only provide the requested implementation within the class.

4. **No External Modifications**:  
   - Confirm that there is no monkey-patching or code modification outside of the class definition.
   - All changes should remain within the class.

5. **Constructor Edits**:  
   - Constructors should only be modified when absolutely necessary.

6. **No Global Code**:  
   - Ensure there are no global variables or functions; all code should be encapsulated within the class or functions.

**If the code snippets fully comply with these rules**, reply with "yes". Otherwise, reply with a new set of code snippets that meet the requirements, ensuring each function is properly contained within the class syntax.

