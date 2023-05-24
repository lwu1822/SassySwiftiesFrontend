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
      
      // Read the MP3 file as base64 data
      var reader = new FileReader();
      reader.onload = function() {
        var base64Data = reader.result.split(",")[1];
        
        // Create an object to store the uploaded song data
        var songData = {
          songName: songName,
          artistName: artistName,
          mp3File: base64Data
        };
        
        // Generate a unique key for the batch
        var batchKey = "uploadedSongs_" + Date.now();
        
        // Retrieve the previously stored batches or initialize an empty array
        var storedBatches = JSON.parse(localStorage.getItem("uploadedBatches")) || [];
        
        // Push the new song data to the current batch
        var currentBatch = storedBatches.find(function(batch) {
          return batch.key === batchKey;
        });
        if (!currentBatch) {
          currentBatch = { key: batchKey, songs: [] };
          storedBatches.push(currentBatch);
        }
        currentBatch.songs.push(songData);
        
        // Save the updated batches to localStorage
        localStorage.setItem("uploadedBatches", JSON.stringify(storedBatches));
        
        // Perform any additional actions or display a success message
        console.log("Form data saved to localStorage.");
      };
      
      reader.readAsDataURL(mp3File);
    });
  </script>
</body>
</html>
