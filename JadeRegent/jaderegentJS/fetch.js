fetch('adventureLog.html')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const lastEntryContainer = document.getElementById('last-entry-container');
    const lastHeader = doc.getElementById('newest');

    // Find the paragraphs after the 'newest' header until the next major break
    let currentNode = lastHeader.nextElementSibling;
    const lastParagraphs = [];

    while (currentNode && currentNode.tagName !== 'HR' && currentNode.tagName !== 'H4') {
      if (currentNode.tagName === 'P') {
        lastParagraphs.push(currentNode);
      }
      currentNode = currentNode.nextElementSibling;
    }

    // Select the last two paragraphs from collected paragraphs
    const lastTwoParagraphs = lastParagraphs.slice(-2);

    if (lastHeader) {
      const entryHeader = document.createElement('h4');
      entryHeader.innerHTML = lastHeader.innerHTML;
      lastEntryContainer.appendChild(entryHeader);
    }

    lastTwoParagraphs.forEach((paragraph, index) => {
      const entryParagraph = document.createElement('p');
      entryParagraph.innerHTML = paragraph.innerHTML;
      lastEntryContainer.appendChild(entryParagraph);

      // Add <br> except after the last paragraph
      if (index < lastTwoParagraphs.length - 1) {
        lastEntryContainer.appendChild(document.createElement('br'));
      }
    });
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });;