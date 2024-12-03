export class ConfirmDialog {
    static async confirm(message, timeoutInSeconds = 10, defaultValue = false) {
        return new Promise((resolve) => {
            const dialog = document.createElement('div');
            const messageDiv = document.createElement('div');
            const countdownDiv = document.createElement('div');
            const buttonContainer = document.createElement('div');
            const confirmButton = document.createElement('button');
            const cancelButton = document.createElement('button');

            // Set up styles
            dialog.style.position = 'fixed';
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
            dialog.style.backgroundColor = 'rgba(0,0,0,0.8)'; // Partly transparent black
            dialog.style.color = '#fff';
            dialog.style.padding = '20px';
            dialog.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            dialog.style.borderRadius = '8px';
            dialog.style.zIndex = '1000';
            dialog.style.fontSize = '18px'; // Medium font size
            dialog.style.textAlign = 'center';

            messageDiv.textContent = message;

            // Countdown indicator
            if (timeoutInSeconds && timeoutInSeconds > 0) {
                countdownDiv.textContent = `Time remaining: ${timeoutInSeconds} seconds`;
                countdownDiv.style.marginBottom = '10px';
                dialog.appendChild(countdownDiv);
            }

            confirmButton.textContent = 'Yes';
            cancelButton.textContent = 'No';

            confirmButton.style.margin = '10px';
            cancelButton.style.margin = '10px';

            // Highlight default button
            if (defaultValue) {
                confirmButton.style.border = '2px solid #00ff00';
                confirmButton.style.color = '#00ff00';
            } else {
                cancelButton.style.border = '2px solid #ff0000';
                cancelButton.style.color = '#ff0000';
            }

            buttonContainer.appendChild(confirmButton);
            buttonContainer.appendChild(cancelButton);

            dialog.appendChild(messageDiv);
            dialog.appendChild(buttonContainer);
            document.body.appendChild(dialog);

            let timeout = null;
            let countdownInterval = null;

            if (timeoutInSeconds && timeoutInSeconds > 0) {
                timeout = setTimeout(() => {
                    cleanup();
                    resolve(defaultValue);
                }, timeoutInSeconds * 1000);

                // Update countdown every second
                let remainingTime = timeoutInSeconds;
                countdownInterval = setInterval(() => {
                    remainingTime -= 1;
                    if (remainingTime <= 0) {
                        clearInterval(countdownInterval);
                    }
                    countdownDiv.textContent = `Time remaining: ${remainingTime} seconds`;
                }, 1000);
            }

            const cleanup = () => {
                if (timeout) clearTimeout(timeout); // Clear the timeout if it exists
                if (countdownInterval) clearInterval(countdownInterval); // Clear the countdown interval
                confirmButton.removeEventListener('click', onConfirm);
                cancelButton.removeEventListener('click', onCancel);
                dialog.remove(); // Remove the dialog from the DOM
            };

            const onConfirm = () => {
                cleanup(); // Ensure dialog is removed first
                resolve(true); // Then resolve the promise
            };

            const onCancel = () => {
                cleanup(); // Ensure dialog is removed first
                resolve(false); // Then resolve the promise
            };

            confirmButton.addEventListener('click', onConfirm);
            cancelButton.addEventListener('click', onCancel);
        });
    }
}
