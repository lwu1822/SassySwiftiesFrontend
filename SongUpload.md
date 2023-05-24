<!DOCTYPE html>
<html>
<head>
  <title>Song Upload</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
  </style>
  <link rel="stylesheet" href="uploadstyle.css">
</head>
<body>
  <h1>Song Upload</h1>
  
  <form id="uploadForm">
    <label for="songName">Song Name:</label>
    <input type="text" id="songName" required><br><br>
    <label for="artistName">Artist Name:</label>
    <input type="text" id="artistName" required><br><br>
    <label for="mp3File">Choose an MP3 file:</label>
    <input type="file" id="mp3File" accept=".mp3" required><br><br>
    <input type="submit" value="Upload">
  </form>
  
  <script>
    document.getElementById("uploadForm").addEventListener("submit", function(event) {
      event.preventDefault();
      
      var songName = document.getElementById("songName").value;
      var artistName = document.getElementById("artistName").value;
      var mp3File = document.getElementById("mp3File").files[0];
      
      // Save the form data to localStorage
      localStorage.setItem("songName", songName);
      localStorage.setItem("artistName", artistName);
      localStorage.setItem("mp3File", mp3File.name);
      
      // Perform any additional actions or display a success message
      console.log("Form data saved to localStorage.");
    });
  </script>
</body>
</html>
