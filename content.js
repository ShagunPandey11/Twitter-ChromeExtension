// Function to add the button to each reply field
function addButtonToReplyFields() {
    // Select all reply fields on the page
    const replyFields = document.querySelectorAll('div[data-testid="tweetTextarea_0"]');
   
    replyFields.forEach(replyField => {
      // Create the button element
      const button = document.createElement('button');
      button.textContent = 'T';
      button.style.position='relative';
      button.style.float='right';
      button.style.backgroundColor = '#1da1f2';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.borderRadius = '50%';
      // Add event listener to the button
      button.addEventListener('click', () => {
        // Find the original Tweet text
    
        const tweet = document.querySelector('div[data-testid="tweetText"][lang]');

        if (tweet) {
          const tweetText = tweet.innerText;
          alert(`Original Tweet: ${tweetText}`);
          
          // Populate the reply field with the original Tweet text
          const replyInput = document.querySelector('.public-DraftEditor-content[contenteditable="true"]');


          if (replyInput) {
            // Set focus to the reply field to mimic user action
           replyInput.focus();

           // Hide the placeholder by adding the focus class
           const placeholderRoot = document.querySelector('.public-DraftEditorPlaceholder-root');
           placeholderRoot.classList.add('public-DraftEditorPlaceholder-hasFocus'); 

           // Trigger input events to ensure the placeholder updates correctly
           const event = new Event('input', { bubbles: true });
           replyInput.dispatchEvent(event);

           const span = replyInput.querySelector('span[data-offset-key]');
           span.innerText=tweetText;
          }
        }
      });
      
      // Append the button to the reply field
      if (!replyField.querySelector('button')) {
        replyField.appendChild(button);
      }
    });
  }
  
  // Initial function call
  addButtonToReplyFields();
  
  // Observe for new reply fields added dynamically (e.g., via AJAX)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        addButtonToReplyFields();
      }
    });
  });
  
  // Observe the entire document
  observer.observe(document.body, { childList: true, subtree: true });
  
