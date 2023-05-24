<form method="POST" action="javascript:login_user()">
    <center>
        <p><label>
            Username:
            <input type="text" name="username" id="username" required>
        </label></p>
        <p><label>
            Password:
            <input type="password" name="password" id="password" required>
        </label></p>
        <p><button>Login</button></p>
        <p id="message"></p>
     </center>
</form>

<script>

        // URL for deployment
        var url = "https://taylorswifties.duckdns.org"
        // Comment out next line for local testing
        // url = "http://192.168.1.20:8731/"
        // Authenticate endpoint
        const login_url = url + '/api/users/login';

        function login_user(){

        // Set body to include login data
            const body = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
            };    

        // Set Headers to support cross origin
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'include', // include, *same-origin, omit
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            };

        // Fetch JWT
            fetch(login_url, requestOptions)
            .then(response => {
                // trap error response from Web API
                if (response.status !== 200) {
                    const message = 'Login error: ' + response.status + " " + response.statusText;
                    document.getElementById("message").innerHTML = message;
                    localStorage.removeItem("username");
                    localStorage.removeItem("visitor");
                    return;
                }

                // Valid response will contain json data
                response.json().then(data => {
                    const message = 'Login success: ' + username: document.getElementById("username").value;
                    document.getElementById("message").innerHTML = message;
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("visitor", data.name);
                })
            })
        }


</script>
