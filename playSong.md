<html>
<head>
  <title>Uploaded Songs</title>
  <link rel="stylesheet" href="uploadstyles.css">
</head>
<body>
  <h1>Uploaded Songs</h1>
  
  <ul id="songList"></ul>
  
  <script>
    // Retrieve the uploaded songs from localStorage
    var songs = JSON.parse(localStorage.getItem("uploadedSongs")) || [];
    
    // Sort the songs in alphabetical order by song name
    songs.sort(function(a, b) {
      var songA = a.songName.toLowerCase();
      var songB = b.songName.toLowerCase();
      if (songA < songB) {
        return -1;
      }
      if (songA > songB) {
        return 1;
      }
      return 0;
    });
    
    // Display the songs in the list
    var songList = document.getElementById("songList");
    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      
      var li = document.createElement("li");
      var div = document.createElement("div");
      div.className = "song";
      
      var songName = document.createElement("span");
      songName.className = "song-name";
      songName.textContent = song.songName;
      
      var artistName = document.createElement("span");
      artistName.textContent = "by " + song.artistName;
      
      var audio = document.createElement("audio");
      audio.controls = true;
      
      // Create a Blob URL from the base64-encoded data
      var blob = base64ToBlob(song.mp3File, "audio/mpeg");
      var url = URL.createObjectURL(blob);
      audio.src = url;
      
      div.appendChild(songName);
      div.appendChild(artistName);
      li.appendChild(div);
      li.appendChild(audio);
      
      songList.appendChild(li);
    }
    
    // Convert base64 to Blob object
    function base64ToBlob(base64Data, contentType) {
      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var byteArrays = [];
      
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      return new Blob(byteArrays, { type: contentType });
    }
  </script>
</body>
</html>
