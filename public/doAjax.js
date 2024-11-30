export async function doAjax(urlToCall, body) {
    const response = await fetch(urlToCall, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const responseJson = await response.json();
    //console.log(responseJson);
    return responseJson;
}