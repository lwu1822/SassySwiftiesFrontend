<html>
<head> 
    <link rel="stylesheet" href="createaccount.css">
</head>

<body>
<form action="javascript:signup_user()">
    <center>
    <p><label>
        Username:
        <input type="text" name="username" id="username" required>
    </label></p>
    <p><label>
        Password:
        <input type="text" name="password" id="password" required>
    </label></p>
    <p><button>Create Account</button></p>
    <p id="message"></p>
    </center>
</form>

<script>

    function signup_user(){

        // URL for deployment
        // var url = "https://lwu1822.github.io/SassySwiftiesFrontend"
        // Comment out next line for local testing
        url = "http://localhost:8086"
        // Authenticate endpoint
        const signup_url = url + '/api/users/';

        // Set body to include login data
        const body = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        // Set Headers to support cross origin
        const requestOptions = {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        };

//        document.getElementById("message").innerHTML ="jsjsjs";

        // Fetch JWT
        fetch(signup_url, requestOptions)
        .then(response => {
            // trap error response from Web API
            if (response.status !== 200) {
                const message = 'Account creation error: ' + response.status + " " + response.statusText;
                document.getElementById("message").innerHTML = message;
                localStorage.removeItem("username");
                return;
            }
            // Valid response will contain json data

            response.json().then(data => {
                const message = 'Account creation success: ' + data.name;
                document.getElementById("message").innerHTML = message;
                localStorage.setItem("username", data.username);
                localStorage.setItem("password", data.password)
            })
        })
    }


</script>

</html>