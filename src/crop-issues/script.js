function uploadImage() {
    var fileInput = document.getElementById('imageUpload');
    var file = fileInput.files[0];
  
    if (file) {
      var formData = new FormData();
      formData.append('file', file);
  
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('File uploaded successfully:', data);
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').textContent = `File uploaded successfully: ${data}`;
      })
      .catch(error => {
        console.error('There was a problem with the upload:', error.message);
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').textContent = `Error uploading file: ${error.message}`;
      });
    } else {
      console.log('No file selected.');
      document.getElementById('message').style.display = 'block';
      document.getElementById('message').textContent = 'No file selected.';
    }
  }
  