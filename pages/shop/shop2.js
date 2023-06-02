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




$(document).ready(function() {
    //console.log("username: " + await fetchUsernameOnly());
    start();
    //updatePage({"id":1,"nfts":[true,true,false,false,false,false],"profile":0,"userID":13})
});

async function start() {
    let username = await fetchUsernameOnly();
    console.log("username: " + username);

    let id = await getId(username);

    console.log(id);
    createNfts(id);
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
        container.append($('<img>').addClass('img').attr('src', '/SassySwiftiesFrontend/images/profiles/profile_' + i + '.jpeg'));
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
    var url = "https://taylorswifties.duckdns.org/api/nfts/update?id=" + id;
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"id": id, "profile": profile})
    })
    .then((response) => response.json())
    .then(getData(id))
}