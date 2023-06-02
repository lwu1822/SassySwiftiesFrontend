$(document).ready(function() {
  // Function to get all posts from API
  getPosts();
  
  // Function to add post HTML to the page
  function addPost(post) {
    var postHTML = 
    '<div class="container" id=' + post.id + '>' +  
    '<div class="text-column">' +
    '<div class="title-row">' +
    '<img class="profile" src="/SassySwiftiesFrontend/images/profiles/profile_' + post.image + '.jpeg">' +
    '<div class="text-subtitle">' + post.title + '</div>' +
    '</div>' +
    '<div class="text-details">' + post.username + ' - ' + post.date + '</div>' +
    '<div class="text-description">' + post.note + '</div>' +
    '</div>' +
    '<div class="likes-row">' +
    '<div class="like-button" data-liked="' + post.liked + 'data-likedby="' + post.likedby + '></div>' +
    '<div class="dislike-button"></div>' +
    '<div class="text-likes">' + post.likes + ' upvotes</div>' +
    '<div class="report-button"></div>' +
    '</div>' +
    '</div>' +
    '</div>';
   
    $("#posts").append(postHTML);
    $(".like-button").last().click(function() {
      // Function to like a post
      like($(this).parents(".container").attr("id"), 1);
    });
    $(".dislike-button").last().click(function() {
      // Function to dislike a post
      like($(this).parents(".container").attr("id"), -1);
    });
    $(".report-button").last().click(function() {
      // Function to delete a post
      remove($(this).parents(".container").attr("id"));
    });
  }

  // Function to delete a post
  function remove(id) {
    var url = "https://taylorswifties.duckdns.org/api/messageboard/delete?id=" + id;
    fetch(url, {
    method: "DELETE"
    })
    .then((response) => response.json())
    .then(location.reload())
  }

  // Function to like a post
  function like(id, likeChange) {
    var url = "https://taylorswifties.duckdns.org/api/posts/update?id=" + id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likeChange
      })
      })
      .then((response) => response.json())
      .then(() => {
        location.reload();
      })
  }

  // Function to get all posts from API
  function getPosts() {
    var url = "https://taylorswifties.duckdns.org/api/posts/";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => { 
      if (request.status == 200) {
        let posts = JSON.parse(request.response);
        posts = sort(posts);
        Object.entries(posts).forEach((post) => {
          addPost(post[1]);
        });
      } else {
        window.alert("ERROR: Failed to pull posts from API - Try refreshing or check for firewall");
      }
    };
  }
  
  // Function to send post to API
 // $("#post-form").submit(function(e) {
  document.getElementById("Submit Button").addEventListener("click", async function(e) {
    e.preventDefault();
    let username = await fetchUsernameOnly();
    console.log("username: " + username);

    let id = await getId(username);
    await sendPost(id);
  });

  async function sendPost(id) {
    // Get post title and text from form
    /*fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userID: 13
      })
      })
      .then((response) => response.json())
      .then(() => { location.reload()})*/
      var title = $("#post-title").val();
      var text = $("#post-text").val();
      var url = "https://taylorswifties.duckdns.org/api/posts/post";

      var options = {
          method: 'POST', 
          mode: 'cors', 
          cache: 'default', 
          //credentials: 'include', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            text: text,
            userID: id
          })
      };


      let response = await fetch(url, options)
      
      if (!response["ok"]) {
          console.log("Error");
          return;
      }

      let data = await response.json();
      console.log(response.status);
      location.reload();
    }
});

function sort(posts) {
  for (let i = 0; i < posts.length - 1; i++) {
    for (let j = 0; j < posts.length - i - 1; j++) {
      if (posts[j].likes < posts[j + 1].likes) {
        let temp = posts[j];
        posts[j] = posts[j + 1];
        posts[j + 1] = temp;
      }
    }
  }
  return posts
}
async function fetchUsername() {
  // retrieve cookie's value
  console.log(document.cookie);

  let cookie2 = document.cookie + ";";
  let correctCookie2 = cookie2.match(/(session=.*;|; session=.*;$|; session=.*; )/);
  correctCookie2 = correctCookie2[0].replace(/;/g, '');
  correctCookie2 = correctCookie2.replace('session=', '');
  correctCookie2 = correctCookie2.replace(/ /g, '');
  console.log(correctCookie2);

  // send fetch to backend's endpoint for user info
  var baseurl = "https://taylorswifties.duckdns.org/api/users/info";
  
  const body = {
      token: correctCookie2,
  };

  // Set Headers to support cross origin
  //IMPORTANT!!!!!!! TO SUCCESSFULLY POST, YOU NEED TO REMOVE
  // credentials:'include'
  const requestOptions = {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'include', // include, *same-origin, omit
      body: JSON.stringify(body),
      headers: {
          "content-type": "application/json"
      },
  };

  let response = await fetch(baseurl, requestOptions)

  if (!response["ok"]) {
      window.location.href = "https://lwu1822.github.io/SassySwiftiesFrontend/logout";
  }

  let data = await response.json();
  return data; 

}



async function fetchUsernameOnly() {
  let data = await fetchUsername();
  return data["sub"];
}
async function getId(username) {
  var getUrl = "https://taylorswifties.duckdns.org/api/users/userinfo/" + username;

      var getOptions = {
          method: 'GET', 
          mode: 'cors', 
          cache: 'default', 
          //credentials: 'include', 
          headers: {
              'Content-Type': 'application/json',
          },
      };


      let response = await fetch(getUrl, getOptions)
      
      if (!response["ok"]) {
          console.log("Error");
          return;
      }

      let data = await response.json();
      console.log(response.status);
      console.log(data["id"]);
      return data["id"]; 

}

function createNfts(id) {
  var url = "https://taylorswifties.duckdns.org/api/nfts/create";
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({"userID": id})
  })
  .then((response) => response.json())
  .then(prep(id))
}
