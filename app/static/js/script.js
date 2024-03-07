document.addEventListener('DOMContentLoaded', () => {
    // Activate the first PDF button
    document.querySelector('button[data-pdf-src]').classList.add('active-pdf-button');
  
    // PDF Viewer source update
    document.querySelectorAll('button[data-pdf-src]').forEach(button => {
        button.addEventListener('click', function() {
            // Update the PDF viewer source
            document.getElementById('pdfViewer').src = this.getAttribute('data-pdf-src');
  
            // Remove the active class from all buttons
            document.querySelectorAll('button[data-pdf-src]').forEach(btn => {
                btn.classList.remove('active-pdf-button');
            });
  
            // Add the active class to the clicked button
            this.classList.add('active-pdf-button');
        });
    });
  
    // Handle clicks on evidence links to update PDF viewer to a specific page
    document.querySelectorAll('.openEvidence').forEach(element => {
        element.addEventListener('click', e => {
            e.preventDefault();
  
            var iframe = document.getElementById('pdfViewer');
            var pageNumber = element.getAttribute('data-page-number');
            var pdfUrl = 'static/medical-record.pdf#page=' + pageNumber;
  
            iframe.src = 'about:blank';
            setTimeout(() => {
                iframe.src = pdfUrl;
            }, 100);
        });
    });
  
  })
  document.addEventListener('DOMContentLoaded', function() {
      setupDragAndDrop();
  });
  
  function setupDragAndDrop() {
      const dropZones = document.querySelectorAll('.drop-zone');
  
      dropZones.forEach(zone => {
          zone.addEventListener('dragover', (e) => {
              e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
              zone.classList.add('dragover');
          });
  
          zone.addEventListener('dragleave', (e) => {
              e.preventDefault();
              zone.classList.remove('dragover');
          });
  
          zone.addEventListener('drop', (e) => {
              e.preventDefault(); // Prevent default behavior
              zone.classList.remove('dragover');
  
              // Assuming the drop zone has a single <p> element for instructions.
              let infoText = zone.querySelector('p');
              let files = e.dataTransfer.files;
              if (files.length > 0) {
                  // Update the text to show the name of the file
                  let fileName = files[0].name; // Assuming the user is dropping one file. Adjust if multiple files are supported.
                  infoText.textContent = `File "${fileName}" ready for upload.`;
  
                  // Optionally, handle the file upload process here.
                  // For example, setting the files to a FormData object, or updating the file input for a form.
              }
          });
      });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('toggle-button').addEventListener('click', function() {
          var container = document.querySelector('.options-container');
          container.classList.toggle('hidden');
      });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
      const steps = document.querySelectorAll('.step');
      
      steps.forEach(step => {
          let currentSectionIndex = 0;
          const sections = step.querySelectorAll('.reasoning-container');
          const nextButton = step.querySelector('.next-button');
  
          // Initially show only the first section (e.g., reasoning)
          sections.forEach((section, index) => {
              if (index !== 0) section.classList.add('hidden');
          });
  
          nextButton.addEventListener('click', () => {
              // Hide current section
              sections[currentSectionIndex].classList.add('hidden');
  
              // Calculate next section index
              currentSectionIndex = (currentSectionIndex + 1) % sections.length;
  
              // Show next section
              sections[currentSectionIndex].classList.remove('hidden');
          });
      });
  });