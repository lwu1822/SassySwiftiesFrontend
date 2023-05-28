async function fetchUsername() {
    // retrieve cookie's value
    console.log(document.cookie);

    let cookie2 = document.cookie + ";";
    let correctCookie2 = cookie2.match(/(session=.*; |; session=.*;$|; session=.*; )/);
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
    let data = await response.json();
    return data; 

    /*
    .then(response => {
        if (!response.ok) {
            const errorMsg = 'Login error: ' + response.status;
            console.log(errorMsg);

            if (response.status == 400) {
                console.log("Incorrect username or password");
            }
            return;
        }

        response.json().then(data => {
            console.log(data);
           
           
            
            // show username
            let p = document.createElement("p");
            p.setAttribute("class", "inline");
            let text = document.createTextNode(data["sub"]);
            p.appendChild(text);
            document.getElementById("username").appendChild(p);
            
            

        })
        

    })
    */
}

/*
fetchUsername().then(data => {
    console.log("data: " + JSON.stringify(data));
});
*/

async function showUsername() {
    let data = await fetchUsername();

    // debugging
    console.log("data: " + JSON.stringify(data));


    let p = document.createElement("p");
    p.setAttribute("class", "inline");
    let text = document.createTextNode(data["sub"]);
    p.appendChild(text);
    document.getElementById("username").appendChild(p);
}

