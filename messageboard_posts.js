$(document).ready(function() {
  // Function to get all posts from API
  getPosts();
  
  // Function to add post HTML to the page
  function addPost(post) {
    var postHTML = 
    '<div class="container">' + 
    '<div class="text-column">' +
    '<div class="title-row">' +
    '<img class="profile" src="images/profiles/profile_0.jpeg">' +
    '<div class="text-subtitle">' + post.title + '</div>' +
    '</div>' +
    '<div class="text-details">' + post.username + ' - ' + post.date + '</div>' +
    '<div class="text-description">' + post.note + '</div>' +
    '</div>' +
    '<div class="likes-row">' +
    '<div class="like-button" data-liked="' + post.liked + '"></div>' +
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
    var url = "http://127.0.0.1:8036/api/messageboard/delete?id=" + id;
    fetch(url, {
    method: "DELETE"
    })
    .then((response) => response.json())
    location.reload();
  }

  // Function to like a post
  function like(id, likeChange) {
    var url = "http://127.0.0.1:8036/api/messageboard/update?id=" + id;
    fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageURL: likeChange
    })
    })
    .then((response) => response.json())

    location.reload();
  }

  // Function to get all posts from API
  function getPosts() {
    var url = "http://127.0.0.1:8036/api/posts/";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => { 
      if (request.status == 200) {
        let posts = JSON.parse(request.response);
        Object.entries(posts).forEach((post) => {
          addPost(post[1]);
        });
      } else {
        window.alert("ERROR: Failed to pull posts from API - Try refreshing or check for firewall");
      }
    };
  }
  
  // Function to send post to API
  $("#post-form").submit(function(e) {
    e.preventDefault();
    sendPost();
    location.reload();
  });

  function sendPost() {
    // Get post title and text from form
    var title = $("#post-title").val();
    var text = $("#post-text").val();
    
    var url = "http://127.0.0.1:8036/api/posts/post";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userID: 3
      })
      })
      .then((response) => response.json())
    }
});