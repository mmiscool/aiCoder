export class VoiceRecognitionInput {
    constructor(targetElement) {
        if (!('webkitSpeechRecognition' in window)) {
            throw new Error('Your browser does not support the Web Speech API.');
        }

        if (!targetElement) {
            throw new Error('A valid DOM element must be provided.');
        }

        this.targetElement = targetElement;
        this.recognition = new webkitSpeechRecognition();
        this.isListening = false;

        // Configure speech recognition
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        // Bind event handlers
        this.recognition.onresult = this.handleResult.bind(this);
        this.recognition.onerror = this.handleError.bind(this);
        this.recognition.onend = this.handleEnd.bind(this);

        // Start recognition
        this.recognition.start();
        console.log('Voice recognition started.');
    }

    handleResult(event) {
        const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');

        // Detect the "coder" keyword to start listening
        if (!this.isListening && transcript.toLowerCase().includes('coder')) {
            this.isListening = true;
            console.log('Started listening for input.');
            this.targetElement.value = ''; // Clear the target element
        }

        // Capture input or detect "submit prompt" to stop listening
        if (this.isListening) {
            if (transcript.toLowerCase().includes('submit prompt')) {
                console.log('Stopping input capture.');
                this.isListening = false;
                this.recognition.stop();
                alert('Prompt submitted: ' + this.targetElement.value);
            } else {
                this.targetElement.value = transcript.trim();
            }
        }
    }

    handleError(event) {
        console.error('Speech recognition error:', event.error);
    }

    handleEnd() {
        console.log('Speech recognition ended.');
        if (this.isListening) {
            this.recognition.start(); // Restart recognition if it ends unexpectedly
        }
    }

    stop() {
        console.log('Voice recognition stopped manually.');
        this.recognition.stop();
        this.isListening = false;
    }
}



