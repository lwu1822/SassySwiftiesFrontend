<!DOCTYPE html>
<html>
<head>
  <title>MP3 Upload</title>
  <link rel="stylesheet" type="text/css" href="uploadstyles.css">
</head>
<body>
  <h2>Upload MP3 File</h2>
  
  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" id="mp3File" accept=".mp3">
    <button type="submit">Upload</button>
  </form>

  <script>
    document.getElementById('uploadForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form submission
      
      var fileInput = document.getElementById('mp3File');
      var file = fileInput.files[0];
      
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var mp3Data = e.target.result;
          // Send the data to the server using fetch API
          fetch('http://your-domain.com/store-mp3', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mp3Data: mp3Data })
          })
          .then(function(response) {
            // Handle the server response
            if (response.ok) {
              console.log('MP3 file uploaded successfully');
            } else {
              console.error('Failed to upload MP3 file. Status:', response.status);
            }
          })
          .catch(function(error) {
            // Handle errors
            console.error('Error uploading MP3 file', error);
          });
        }
        reader.readAsDataURL(file);
      }
    });
  </script>
</body>
</html>
