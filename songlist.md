<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="songGuessing.css">

    <!-- Begin Jekyll SEO tag v2.8.0 -->
<title>Sassy Swifties - The Official Del Norte Taylor Swift Fan Club | A community with love and support for Taylor Swift</title>
<meta name="generator" content="Jekyll v3.9.2" />
<meta property="og:title" content="Sassy Swifties - The Official Del Norte Taylor Swift Fan Club" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="A community with love and support for Taylor Swift" />
<meta property="og:description" content="A community with love and support for Taylor Swift" />
<link rel="canonical" href="http://localhost:4000/login.html" />
<meta property="og:url" content="http://localhost:4000/login.html" />
<meta property="og:site_name" content="Sassy Swifties - The Official Del Norte Taylor Swift Fan Club" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<meta property="twitter:title" content="Sassy Swifties - The Official Del Norte Taylor Swift Fan Club" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebPage","description":"A community with love and support for Taylor Swift","headline":"Sassy Swifties - The Official Del Norte Taylor Swift Fan Club","url":"http://localhost:4000/login.html"}</script>
<!-- End Jekyll SEO tag -->

<link rel="stylesheet" href="/assets/css/style.css?v=b1dc66176689dcb290cf9d2d0cd46b8ab1096a5e">
<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="/assets/js/respond.js"></script>
<!--[if lt IE 9]>
<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!--[if lt IE 8]>
<link rel="stylesheet" href="/assets/css/ie.css">
<![endif]-->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<!-- start custom head snippets, customize with your own _includes/head-custom.html file -->

<!-- Setup theme-color -->
<!-- start theme color meta headers -->
<meta name="theme-color" content="#353535">
<meta name="msapplication-navbutton-color" content="#353535">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<!-- end theme color meta headers -->

  </head>
  <body> 
    <div class="wrapper">
    </div>

<!-- HTML table fragment for page -->

<div>Total song count: 227</div>
<p id="str(countSongs())"></p>

<div>Most liked song:</div>
<br>
<div>Least liked song:</div>
<br>

<div>Sort by...</div>
<select id="dropdown">
    <option value="default">Chronologically released</option>
    <option value="most-likes">Most to least likes</option>
    <option value="least-likes">Least to most likes</option>
    <option value="alphabetical">Alphabetical</option>
</select>
<div id="textBoxContainer">
    
</div>
<br>
<label>Search:
  <input type="search" class="" placeholder="" aria-controls="songtable">
</label> 
<br>

<table id="songtable" class="table">
  <thead>
  <tr>
    <th>Song</th>
    <th>Likes</th>
    <th>Dislikes</th>
  </tr>
  </thead>
  <tbody id="result"></tbody>
</table>

<script>

</script>

<!-- Script is layed out in a sequence (without a function) and will execute when page is loaded -->
<script>

  let songData = {
    song: "",
    likes: 0,
    dislikes: 0
  };
  // prepare HTML defined "result" container for new output
  const resultContainer = document.getElementById("result");

  // keys for song reactions
  const LIKES = "like";
  const DISLIKES = "dislike";

  // prepare fetch urls
  const url = "https://taylorswifties.duckdns.org/api/songs";
  const like_url = url + "/like/";  // haha reaction
  const dislike_url = url + "/dislike/";  // boohoo reaction

  // prepare fetch GET options
  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  // prepare fetch PUT options, clones with JS Spread Operator (...)
  const put_options = {...options, method: 'PUT'}; // clones and replaces method

  // fetch the API
  fetch(url, options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          error('GET API response failure: ' + response.status);
          return;
      }
      // valid response will have JSON data
      response.json().then(data => {
          console.log(data);
          for (const row of data) {
            // make "tr element" for each "row of data"
            const tr = document.createElement("tr");
            
            // td for joke cell
            const song = document.createElement("td");
              song.innerHTML = row.id + ". " + row.song;  // add fetched data to innerHTML

            // td for haha cell with onclick actions
            const like = document.createElement("td");
              const like_but = document.createElement('button');
              like_but.id = LIKES+row.id   // establishes a HAHA JS id for cell
              like_but.innerHTML = row.like;  // add fetched "haha count" to innerHTML
              like_but.onclick = function () {
                // onclick function call with "like parameters"
                reaction(LIKES, like_url+row.id, like_but.id);  
              };
              like.appendChild(like_but);  // add "haha button" to haha cell

            // td for boohoo cell with onclick actions
            const dislike = document.createElement("td");
              const dislike_but = document.createElement('button');
              dislike_but.id = DISLIKES+row.id  // establishes a BOOHOO JS id for cell
              dislike_but.innerHTML = row.dislike;  // add fetched "boohoo count" to innerHTML
              dislike_but.onclick = function () {
                // onclick function call with "jeer parameters"
                reaction(DISLIKES, dislike_url+row.id, dislike_but.id);  
              };
              dislike.appendChild(dislike_but);  // add "boohoo button" to boohoo cell
             
            // this builds ALL td's (cells) into tr (row) element
            tr.appendChild(song);
            tr.appendChild(like);
            tr.appendChild(dislike);

            // this adds all the tr (row) work above to the HTML "result" container
            resultContainer.appendChild(tr);

            songData[row.song] = {
              likes: row.like,
              dislikes: row.dislike
            };
          }
          console.log(songData);
          
          function sortByMostLikes(songData) {
            // Create an array of song names from the keys of the songData dictionary
            const songNames = Object.keys(songData);

            // Sort the songNames array based on the number of likes for each song
            songNames.sort((songA, songB) => {
              const likesA = songData[songA].likes;
              const likesB = songData[songB].likes;
              return likesB - likesA; // Sort in descending order of likes
            });

            return songNames;
          }
                    // Assuming you have the `songData` dictionary populated
          const sortedDescending = sortByMostLikes(songData);
          console.log(sortedDescending);

          function sortByLeastLikes(songData) {
            // Create an array of song names from the keys of the songData dictionary
            const songNames = Object.keys(songData);

            // Sort the songNames array based on the number of likes for each song
            songNames.sort((songA, songB) => {
              const likesA = songData[songA].likes;
              const likesB = songData[songB].likes;
              return likesA - likesB; // Sort in ascending order of likes
            });

            return songNames;
          }
                        // Assuming you have the `songData` dictionary populated
            const sortedAscending = sortByLeastLikes(songData);
            console.log(sortedAscending);

          function sortByAlphabetical(songData) {
            // Create an array of song names from the keys of the songData dictionary
            const songNames = Object.keys(songData);

            // Sort the songNames array alphabetically
            songNames.sort((songA, songB) => {
              return songA.localeCompare(songB); // Sort alphabetically
            });

            return songNames;
          }
                      
                      // Assuming you have the `songData` dictionary populated
          const sortedAlphabetic = sortByAlphabetical(songData);
          console.log(sortedAlphabetic);
          
          // Get references to the necessary elements
          const dropdown = document.getElementById("dropdown");

          // Add event listener to the dropdown
          dropdown.addEventListener("change", handleSortOptionChange);

          // Event handler for the dropdown change event
          function handleSortOptionChange(event) {
            const selectedOption = event.target.value;
            let sortedSongs;

            // Call the appropriate sorting function based on the selected option
            switch (selectedOption) {
              case "most-likes":
                sortedSongs = sortByMostLikes(songData);
                break;
              case "least-likes":
                sortedSongs = sortByLeastLikes(songData);
                break;
              case "alphabetical":
                sortedSongs = sortByAlphabetical(songData);
                break;
              default:
                // No specific sorting option selected, use default order
                sortedSongs = Object.keys(songData);
            }
            // Clear the existing table rows
            while (resultContainer.firstChild) {
              resultContainer.firstChild.remove();
            }

            // Generate new table rows based on the sorted song order
            for (const songName of sortedSongs) {
              const songInfo = songData[songName];

              // Create table row
              const tr = document.createElement("tr");

              // Create table cells
              const songCell = document.createElement("td");
              const likeCell = document.createElement("td");
              const dislikeCell = document.createElement("td");

               // Set cell content
              songCell.textContent = songInfo.song;
              likeCell.textContent = songInfo.likes;
              dislikeCell.textContent = songInfo.dislikes;

              // Append cells to the row
              tr.appendChild(songCell);
              tr.appendChild(likeCell);
              tr.appendChild(dislikeCell);

              // Append row to the table
              resultContainer.appendChild(tr);
            }
            // Perform further actions with the sortedSongs array
            console.log(sortedSongs);
          }

      })
  })
  // catch fetch errors (ie Nginx ACCESS to server blocked)
  .catch(err => {
    error(err + " " + url);
  });

  // Reaction function to likes or jeers user actions
  function reaction(type, put_url, elemID) {

    // fetch the API
    fetch(put_url, put_options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          error("PUT API response failure: " + response.status)
          return;  // api failure
      }
      // valid response will have JSON data
      response.json().then(data => {
          console.log(data);
          // Likes or Jeers updated/incremented
          if (type === LIKES) // like data element
            document.getElementById(elemID).innerHTML = data.like;  // fetched haha data assigned to haha Document Object Model (DOM)
          else if (type === DISLIKES) // jeer data element
            document.getElementById(elemID).innerHTML = data.dislike;  // fetched boohoo data assigned to boohoo Document Object Model (DOM)
          else
            error("unknown type: " + type);  // should never occur
      })
    })
    // catch fetch errors (ie Nginx ACCESS to server blocked)
    .catch(err => {
      error(err + " " + put_url);
    });
    
  }

  // Something went wrong with actions or responses
  function error(err) {
    // log as Error in console
    console.error(err);
    // append error to resultContainer
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = err;
    tr.appendChild(td);
    resultContainer.appendChild(tr);
  }

</script>

