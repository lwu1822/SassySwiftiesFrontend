<html>
<head>
  <title>Uploaded Songs</title>
  <link rel="stylesheet" href="uploadstyles.css">
</head>
<body>
  <h1>Songs List</h1>
  
  <ul id="songList"></ul>
  
  <script>
    var songs = JSON.parse(localStorage.getItem("uploadedSongs")) || [];
    // Sorting by alphabet
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
    // get the stored song from localstorage
    var songList = document.getElementById("songList");
    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      
      var li = document.createElement("li");
      var audioWrapper = document.createElement("div"); // New div to wrap audio and delete button
      audioWrapper.className = "audio-wrapper";
      
      var audio = document.createElement("audio");
      audio.controls = true;
      audio.src = "data:audio/mp3;base64," + song.mp3Data;
      
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function(event) {
        var index = Array.from(songList.children).indexOf(event.target.parentNode.parentNode);
        songs.splice(index, 1);
        localStorage.setItem("uploadedSongs", JSON.stringify(songs));
        songList.removeChild(event.target.parentNode.parentNode);
      });
      
      audioWrapper.appendChild(audio);
      audioWrapper.appendChild(deleteButton); // Append delete button after audio
      li.appendChild(audioWrapper); // Append audio wrapper to the list item
      
      songList.appendChild(li);
    }
  </script>
</body>
</html>
