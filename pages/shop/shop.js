$(document).ready(async function() {
    window.alert("test")
    // Run the getStatus method when the page loads
    let data = await getStatus(1);
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
});

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