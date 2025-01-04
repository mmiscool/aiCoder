
// create an absolute positioned overlay div that shows when doAjax is called
// and hides when the response is received
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0px';
overlay.style.bottom = '0px';
overlay.style.left = '0px';
overlay.style.right = '0px';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.color = 'white';
overlay.style.fontSize = '24px';
overlay.style.display = 'flex';
overlay.style.flexDirection = 'column';
// make the div fade in and out
overlay.style.transition = 'opacity 0.3s';
overlay.style.zIndex = '1000';
overlay.textContent = 'Loading...';
document.body.appendChild(overlay);
// container for messages from the server
const messageDivContainer = document.createElement('div');
messageDivContainer.style.width = '100%';
messageDivContainer.style.height = '100%';
messageDivContainer.style.border = '5px solid black';
messageDivContainer.style.position = 'relative';
messageDivContainer.style.overflow = 'auto';
overlay.appendChild(messageDivContainer);
// add a div to the overlay that displays the messages from the server. 
const messageDiv = document.createElement('div');
messageDiv.style.overflow = 'auto';
// format as preformatted text with no word wrapping at all
messageDiv.style.whiteSpace = 'pre';
// font size
messageDiv.style.fontSize = '12px';
messageDivContainer.appendChild(messageDiv);
// footer element that goes at the bottom of the 
const footer = document.createElement('br');
messageDivContainer.appendChild(footer);
export async function doAjax(urlToCall, body) {
    messageDiv.textContent = '';
    overlay.style.display = 'flex';
    let responseJson;
    try {
        const response = await fetch(urlToCall, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        responseJson = await response.json();
    } // make overlay fade out
    catch (error) {
        console.error(error);
        responseJson = { error: error.message };
    }
    overlay.style.display = 'none';
    return responseJson;
}
const getWebSocketURL = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const pathname = window.location.pathname.replace(/\/[^/]*$/, '');
    // Remove the file name if present
    return `${ protocol }//${ host }${ pathname }/ws`;
};
export class WebSocketClient {
    constructor() {
        this.url = getWebSocketURL();
        this.socket = null;
        this.statusIndicator = this.createStatusIndicator();
    }
    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.addEventListener('open', () => {
            console.log('WebSocket connection opened.');
            this.statusIndicator.style.display = 'none';
        });
        // Hide when connected
        this.socket.addEventListener('message', event => {
            console.log('Message received:', event.data);
            messageDiv.textContent += event.data;
            footer.scrollIntoView();
        });
        this.socket.addEventListener('close', () => {
            console.log('WebSocket connection closed. Reconnecting...');
            this.statusIndicator.style.display = 'block';
            // Show when disconnected
            this.reconnect();
        });
        this.socket.addEventListener('error', error => {
            console.error('WebSocket error:', error);
        });
    }
    reconnect() {
        setTimeout(() => this.connect(), 1000);
    }
    createStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.top = '10px';
        indicator.style.right = '10px';
        indicator.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        indicator.style.color = 'white';
        indicator.style.padding = '5px 10px';
        indicator.style.borderRadius = '5px';
        indicator.style.display = 'none';
        indicator.textContent = 'Offline';
        document.body.appendChild(indicator);
        return indicator;
    }
}
// Usage example
const client = new WebSocketClient();
client.connect();