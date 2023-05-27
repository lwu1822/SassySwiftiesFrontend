<html>
<head>
  <title>Song Upload</title>
  <link rel="stylesheet" href="uploadstyles.css">
</head>
<body>
  <h1>Upload Your Own Song (mp3 only)</h1>
  
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

      var songData = {
        songName: songName,
        artistName: artistName,
        mp3File: mp3File.name
      };
      
      var uploadedSongs = JSON.parse(localStorage.getItem("uploadedSongs")) || [];
      
      uploadedSongs.push(songData);
      
      localStorage.setItem("uploadedSongs", JSON.stringify(uploadedSongs));

      alert("Form data saved to localStorage.");
    });
  </script>
</body>
</html>
