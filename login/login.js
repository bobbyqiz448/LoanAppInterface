document.getElementById('loginButton').addEventListener('click', function () {
    // Get user inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // TODO: Implement authentication logic here



    // For  successful login
    if (email !== "" && password.length > 8) {

        // validate email, if succes send rerquest
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(email)) {
            // send request

            fetch("http://localhost:8080/api/v1/login", {
                // fetch("https://mikey.free.beeceptor.com/api/v1/login", {

                // /api/v1/registration
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then(
                    (json) => {
                        if (json) {
                            console.log(json);
                            localStorage.setItem("token", json.token)
                            // console.log("loginResponse", `localStorage set with token value: ${localStorage.getItem("token")}`)

                            alert('Login successful! Redirecting to the Loan Calculator...');
                            // Redirect to the loan calculator page
                            window.location.href = 'http://127.0.0.1:5500/index.html';

                        }
                        else {
                            alert("Login attempt failed! Kindly try again.")

                        }

                    }
                );
        }


    } else {
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!(regex.test(email))) { alert('Invalid email. Please try again.'); }
        if (password.length < 8) {
            alert("Password must be at least 8 characters");
        }
    }
});
