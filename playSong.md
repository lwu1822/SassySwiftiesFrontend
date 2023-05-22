<!DOCTYPE html>
<html>
<head>
  <title>MP3 Player</title>
  <link rel="stylesheet" type="text/css" href="uploadstyles.css">
</head>
<body>
  <h2>MP3 Player</h2>
  
  <ul id="songList"></ul>
  
  <script>
    // Retrieve the locally stored MP3 data and display a list of songs
    function displaySongList() {
      var songList = document.getElementById('songList');
      songList.innerHTML = ''; // Clear existing list
      
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith('mp3Data')) {
          var mp3Data = localStorage.getItem(key);
          var songTitle = localStorage.getItem('songTitle-' + key.slice(7));
          var artistName = localStorage.getItem('artistName-' + key.slice(7));
          
          var listItem = document.createElement('li');
          listItem.innerHTML = '<b>' + songTitle + '</b> by ' + artistName + ' <button onclick="playSong(\'' + mp3Data + '\')">Play</button>';
          
          songList.appendChild(listItem);
        }
      }
    }
    
    // Play the selected song
    function playSong(mp3Data) {
      var audio = new Audio(mp3Data);
      audio.play();
    }
    
    displaySongList(); // Display the initial song list
  </script>
</body>
</html>