<html>
<head>
  <title>MP3 Upload</title>
  <link rel="stylesheet" type="text/css" href="uploadstyles.css">
</head>
<body>
  <h2>Upload MP3 File</h2>
  
  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" id="mp3File" accept=".mp3"><br>
    <input type="text" id="songTitle" placeholder="Song Title">
    <input type="text" id="artistName" placeholder="Artist Name">
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
          var songTitle = document.getElementById('songTitle').value;
          var artistName = document.getElementById('artistName').value;

          // Store the MP3 data and additional data locally
          localStorage.setItem('mp3Data', mp3Data);
          localStorage.setItem('songTitle', songTitle);
          localStorage.setItem('artistName', artistName);

          // Clear form fields
          fileInput.value = '';
          document.getElementById('songTitle').value = '';
          document.getElementById('artistName').value = '';

          console.log('MP3 file and data stored locally');
        }
        reader.readAsDataURL(file);
      }
    });
  </script>
</body>
</html>