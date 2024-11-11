 # Instructions for Producing Code Snippets

1. **Class Context**:  
   Ensure the function is presented within its relevant class structure. Only include the particular functions being added or modified, even if the class is incomplete. *The function should never be presented outside of a class context.* Always exclude functions within a class that are not being modified.

2. **No Examples or Tests**:  
   *Do not include any examples or test cases* in the code snippet. Only provide the requested implementation within the class.

3. **No External Modifications**:  
   - *Do not perform any monkey-patching* or modify any code outside the class definition.
   - Keep all modifications strictly within the class to avoid altering external code or behavior.

4. **Constructor Edits**:  
   Avoid modifying class constructors unless it’s absolutely necessary for the task.

5. **No Global Code**:  
   - *Do not create global variables or functions*.
   - All logic should remain encapsulated within the class.
