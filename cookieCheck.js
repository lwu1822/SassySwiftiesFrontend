console.log(document.cookie);

let cookie = document.cookie + ";";
let correctCookie = cookie.match(/(session=.*;|; session=.*;$|; session=.*; )/);

if (correctCookie === null) {
    // show "Log In" in navbar
    let a = document.createElement("a");
    let text = document.createTextNode("Log In");
    a.appendChild(text);
    a.href = window.location.origin + "/login";

    let li = document.createElement("li");
    li.appendChild(a);

    document.getElementById("loginStatus").appendChild(li);


    // show "Create Account" in navbar
    a = document.createElement("a");
    text = document.createTextNode("Create Account");
    a.appendChild(text);
    a.href = window.location.origin + "/createaccount";

    li = document.createElement("li");
    li.appendChild(a);

    document.getElementById("createAccount").appendChild(li);

    // hide "Settings" in navbar
    document.getElementById("settings").innerHTML = "";
} else {
    // show "Log Out" in navbar
    let a = document.createElement("a");
    let text = document.createTextNode("Log Out");
    a.appendChild(text);
    a.href = window.location.origin + "/logout";

    let li = document.createElement("li");
    li.appendChild(a);

    document.getElementById("loginStatus").appendChild(li);


    // show "Settings" in navbar
    a = document.createElement("a");
    text = document.createTextNode("Settings");
    a.appendChild(text);
    a.href = window.location.origin + "/settings";

    li = document.createElement("li");
    li.appendChild(a);

    document.getElementById("settings").appendChild(li);

    // hide "Create Account" in navbar
    document.getElementById("createAccount").innerHTML = "";

}