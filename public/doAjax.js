// create an absolute positioned overlay div that shows when doAjax is called
// and hides when the response is received

const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '20px';
overlay.style.bottom = '20px';
overlay.style.left = '20px';
overlay.style.right = '20px';
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

// format as preformatted text
messageDiv.style.whiteSpace = 'pre-wrap';
// font size
messageDiv.style.fontSize = '16px';
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
      // scroll to make the footer visible
      footer.scrollIntoView();
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

