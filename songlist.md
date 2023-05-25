<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

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
<table>
  <thead>
  <tr>
    <th>Song</th>
    <th>Likes</th>
    <th>Dislikes</th>
  </tr>
  </thead>
 <tbody id="result">
    <tr>
      <td>
        Tim McGraw
      </td>
      <td>
        <button id="like">#</button>
      </td>
      <td>
        <button id="dislike">#</button>
      </td>
    </tr>
  </tbody>
</table>

<!-- Script is layed out in a sequence (without a function) and will execute when page is loaded -->
<script>

  // prepare HTML defined "result" container for new output
  const resultContainer = document.getElementById("result");

  // keys for joke reactions
  const LIKES = "like";
  const DISLIKES = "dislike";

  // prepare fetch urls
  const url = "http://localhost:8036/api/songs";
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
              like_but.innerHTML = row.likea;  // add fetched "haha count" to innerHTML
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
