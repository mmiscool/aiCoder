export async function doAjax(endpoint, data) {
    try {
        const response = await fetch("./" + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        try {
            return JSON.parse(result);
        } catch (err) {
            throw new Error("Failed to parse JSON: " + result);
        }
    } catch (error) {
        console.error("Error in doAjax:", error);
        return null;
    }
}


export const mainApp= {
    toolbar: document.getElementById("toolbar"),
    leftSideBar: document.getElementById("leftSideBar"),
    rightMain: document.getElementById("rightMain"),
}



let code;

export async function loadCode() {
    // check if the code element exists and if not create it and add it to the body
    if (!code) {
        code = document.createElement("textarea");
        code.id = "code";
        code.style.width = "calc(100% - 10px)";
        code.style.height = "calc(100% - 10px)";
        code.style.margin = "5px";
        rightMain.appendChild(code);
    }



    const response = await doAjax("readFile", {});
    if (response && response.file) {
        code.value = response.file;
    } else {
        code.value = "Error: Could not load the code. Check the console for details.";
    }
}

loadCode();