// create an absolute positioned overlay div that shows when doAjax is called
// and hides when the response is received

const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.color = 'white';
overlay.style.fontSize = '24px';
// make the div fade in and out
overlay.style.transition = 'opacity 0.3s';
overlay.style.zIndex = '1000';
overlay.textContent = 'Loading...';
document.body.appendChild(overlay);



// add a div to the overlay that displays the messages from the server. 

const messageDiv = document.createElement('div');
messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
messageDiv.style.padding = '10px';
messageDiv.style.borderRadius = '5px';
overlay.appendChild(messageDiv);




export async function doAjax(urlToCall, body) {
    overlay.style.display = 'flex';
    let responseJson;

    try {
        const response = await fetch(urlToCall, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        responseJson = await response.json();
        // make overlay fade out
    } catch (error) {
        console.error(error);
        responseJson = { error: error.message };
    }
    overlay.style.display = 'none';

    return responseJson;
}







  class WebSocketClient {
    constructor() {
      this.url = `ws://${window.location.host}`;
      this.socket = null;
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
  
      // Event listener for when the connection is opened
      this.socket.addEventListener('open', () => {
        console.log('WebSocket connection opened.');
      });
  
      // Event listener for when a message is received
      this.socket.addEventListener('message', (event) => {
        console.log('Message received:', event.data);
        messageDiv.textContent += event.data;
      });
  
      // Event listener for when the connection is closed
      this.socket.addEventListener('close', () => {
        console.log('WebSocket connection closed.');
      });
  
      // Event listener for when there's an error
      this.socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });
    }
  }
  
  // Usage example
  const client = new WebSocketClient();
  client.connect();
  
