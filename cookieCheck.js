console.log(document.cookie);

let cookie = document.cookie + ";";
let correctCookie = cookie.match(/(session=.*; |; session=.*;$|; session=.*; )/);

if (correctCookie === null) {
    let a = document.createElement("a");
    let text = document.createTextNode("Log In");
    a.appendChild(text);
    a.href = window.location.origin + "/login";

    let li = document.createElement("li");
    li.appendChild(a);

    document.getElementById("loginStatus").appendChild(li);
} else {
    let a = document.createElement("a");
    let text = document.createTextNode("Log Out");
    a.appendChild(text);
    a.href = window.location.origin + "/logout";

    let li = document.createElement("li");
    li.appendChild(a);

    document.getElementById("loginStatus").appendChild(li);
}

