$(document).ready(function() {
    id = 13;
    createNfts(id);
    //updatePage({"id":1,"nfts":[true,true,false,false,false,false],"profile":0,"userID":13})
});

function createNfts(id) {
    var url = "https://taylorswifties.duckdns.org/api/nfts/post";
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

function prep(id) {
    var url = "https://taylorswifties.duckdns.org/api/nfts/update?id=" + id;
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"id": id})
    })
    .then((response) => response.json())
    .then(getData(id))
}
function getData(id) {
    var url = "https://taylorswifties.duckdns.org/api/nfts/";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => { 
      if (request.status == 200) {
        let posts = JSON.parse(request.response);
        updatePage(posts[id-1]);
      } else {
        window.alert("ERROR: Failed to pull posts from API - Try refreshing or check for firewall");
      }
    };
}

function updatePage(data) {
    // Run the getStatus method when the page loads
    console.log(data);
    let nfts = data["nfts"];
    //console.log(nfts);
    let selectedProfile = data["profile"];
    let unlockThresholds = [0, 5, 10, 30, 100, 500];

    // Loop through each of the six profiles
    for (let i = 0; i < 6; i++) {
        // Create a new container for the profile
        let container = $('<div>').addClass('container');
        // Add the profile image
        container.append($('<img>').addClass('img').attr('src', '/images/profiles/profile_' + i + '.jpeg'));
        // Add the status text
        if (nfts[i]) {
            container.append($('<h4>').text('You Own This!'));
        } else {
            container.append($('<h4>').text('Unlocked at ' + unlockThresholds[i] + ' Swifites'));
        }
        // Add a green outline if this is the selected profile
        if (i === selectedProfile) {
            container.css('outline', 'thick solid green');
            container.find('h4').text('Selected!');
        }
        // Add a click handler to update the selected profile
        container.click(function() {
            if (nfts[i]) {
                update(1, i);
                location.reload();
            }
        });
        // Add the container to the page
        $('#nfts').append(container);
    }
}



   


async function getStatus(id) {

    // Update the user to show new changes
    /*var url = "https://taylorswifties.duckdns.org/api/nfts/update?id=" + id;
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"id": id})
    })
    .then((response) => response.json())
    .then(console.log(response.json()))*/

    //return {"id":1,"nfts":[true,false,false,false,false,false],"profile":0,"userID":1}
    //Get new updated user
    
    const response = await fetch('https://taylorswifties.duckdns.org/api/nfts');
    const data = await response.json();
    window.alert("a")
    console.log(data);
    return data;
}



function update(id, profile) {

}