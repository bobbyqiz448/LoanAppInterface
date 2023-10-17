document.getElementById('registerButton').addEventListener('click', function () {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // TODO: Implement user registration logic here 
  // console.log(firstName);


  if (firstName == "") {
    document.getElementById('firstName').focus();
  }
  if (lastName == "") {
    document.getElementById('lastName').focus();
  }
  if (email == "") {
    document.getElementById('email').focus();
  }
  if (password == "") {
    document.getElementById('password').focus();
  }


  fetch("http://localhost:8080/api/v1/registration", {
    // fetch("https://mikey.free.beeceptor.com/api/v1/registration", {
    // http://localhost:8080
    method: "POST",
    body: JSON.stringify({
      name: firstName+" "+ lastName,
      email: email,
      password: password,
      roles: "USER"
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then(
      (json) => {
        console.log(json);
        if (json.firstName && json.lastName && json.email && json.password) {
          alert(`Registration successful for ${json.firstName}  ${json.lastName}`);
          // console.log(json);
          window.location.href = "http://127.0.0.1:5500/login/login.html"
        }
        else {
          alert(`Registration failed! Kindly Retry. `);
        }

      }
    );





});
