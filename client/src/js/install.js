const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    const installPrompt = document.getElementById('install-prompt');
});

// TODO: Implement a click event handler on the `butInstall` element
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

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed successfully.');
  });
