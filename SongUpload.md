<html>
<head>
  <title>Song Upload</title>
  <link rel="stylesheet" href="uploadstyles.css">
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
      
      // Create an object to store the uploaded song data
      var songData = {
        songName: songName,
        artistName: artistName,
        mp3File: mp3File.name
      };
      
      // Retrieve the uploaded songs from localStorage or initialize an empty array
      var uploadedSongs = JSON.parse(localStorage.getItem("uploadedSongs")) || [];
      
      // Push the new song data to the array
      uploadedSongs.push(songData);
      
      // Save the updated uploaded songs array to localStorage
      localStorage.setItem("uploadedSongs", JSON.stringify(uploadedSongs));
      
      // Perform any additional actions or display a success message
      console.log("Form data saved to localStorage.");
    });
  </script>
</body>
</html>
