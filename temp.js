$(document).ready(function() {
    $("#Submit Button").click(function() {
        var post = {
            id: Date.now(),
            title: $("#post-title").val(),
            text: $("#post-text").val(),
            liked: false,
            imageURL: ""
        };
        var postHTML = '<div class="container" id="' + post.id + '">' +
            '<div class="text-column">' +
            '<div class="text-subtitle">' + post.title + '</div>' +
            '<div class="text-description">' + post.text + '</div>' +
            '</div>' +
            '<div class="likes-row">' +
            '<div class="like-button" data-liked="' + post.liked + '"></div>' +
            '<div class="dislike-button"></div>' +
            '<div class="text-likes">' + post.imageURL + ' Likes</div>' +
            '<div class="report-button"></div>' +
            '</div>' +
            '</div>';
        $("#posts").append(postHTML);
    });
});
