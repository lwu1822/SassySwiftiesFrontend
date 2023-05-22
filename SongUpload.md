<!DOCTYPE html>
<html>
<head>
  <title>MP3 Upload</title>
  <link rel="stylesheet" type="text/css" href="uploadstyles.css>
</head>
<body>
  <h2>Upload MP3 File</h2>
  
  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" id="mp3File" accept=".mp3"><br>
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
          // Here, you can send the `mp3Data` to your server for database storage using AJAX or any other method
          // Example: You can use the fetch API to send the data to your server
          fetch('/store-mp3', {
            method: 'POST',
            body: mp3Data
          })
          .then(function(response) {
            // Handle the server response
            console.log('MP3 file uploaded successfully');
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