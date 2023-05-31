<html>
<head>
  <title>Uploaded Songs</title>
  <link rel="stylesheet" href="uploadstyles.css">
</head>
<body>
  <h1>Songs List</h1>
  
  <div id="songList"></div>
  
  <script>
    var songs = JSON.parse(localStorage.getItem("uploadedSongs")) || [];
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
    
    var songList = document.getElementById("songList");
    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      
      var container = document.createElement("div");
      container.className = "song-container";
      
      var songName = document.createElement("div");
      songName.className = "song-name";
      songName.textContent = song.songName + " by " + song.artistName;
      
      var coverImage = document.createElement("img");
      coverImage.className = "cover-image";
      coverImage.src = "data:image/*;base64," + song.coverData;
      
      var audio = document.createElement("audio");
      audio.controls = true;
      audio.src = "data:audio/mp3;base64," + song.mp3Data;
      
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", function(event) {
        var index = Array.from(songList.children).indexOf(event.target.parentNode);
        songs.splice(index, 1);
        localStorage.setItem("uploadedSongs", JSON.stringify(songs));
        songList.removeChild(event.target.parentNode);
      });
      
      container.appendChild(songName);
      container.appendChild(coverImage);
      container.appendChild(deleteButton);
      container.appendChild(audio);
      
      songList.appendChild(container);
    }
  </script>
</body>
</html>
