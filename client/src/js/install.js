const butInstall = document.getElementById('buttonInstall');
let installPrompt;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block'; // Display your custom install button
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (installPrompt !== null) {
    // Show the installation prompt to the user
    installPrompt.prompt();

    // Wait for the user's response
    const choiceResult = await installPrompt.userChoice;

    // Check if the user accepted or denied the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation.');
    } else {
      console.log('User declined the PWA installation.');
    }

    // Reset the installPrompt variable
    installPrompt = null;
  }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Display an alert when the PWA is installed
  alert('PWA was installed successfully.');
  console.log('PWA was installed successfully.');
});