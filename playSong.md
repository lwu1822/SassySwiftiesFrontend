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
      
      var li = document.createElement("li");
      var div = document.createElement("div");
      div.className = "song";
      
      var songName = document.createElement("span");
      songName.className = "song-name";
      songName.textContent = song.songName;
      
      var artistName = document.createElement("span");
      artistName.textContent = " by " + song.artistName;
      
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
      
      div.appendChild(songName);
      div.appendChild(artistName);
      div.appendChild(deleteButton);
      li.appendChild(div);
      li.appendChild(audio);
      
      songList.appendChild(li);
    }
  </script>
</body>
</html>
