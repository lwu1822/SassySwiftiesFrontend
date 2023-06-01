temp();

async function temp() {
    let data = await getStatus(1);
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
    
    var url = "https://taylorswifties.duckdns.org/api/nfts"
    let response = await fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
    },
    });
    let data = await response.json();
    console.log("Test1: " + data);
    return data;
}



function update(id, profile) {

}