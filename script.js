function submitRequest() {
    const amount = parseFloat(document.getElementById('amount').value);
    const frequency = document.getElementById('frequency').value;
    const period = parseInt(document.getElementById('period').value);
    const startDate = "2023-04-10"; // Temporal
    const bank = document.getElementById('bank').value;
    const interestType = document.getElementById('interestType').value;
    const email = document.getElementById('email').value;

    const rate = (bank === "A" ? (interestType === "flatRate" ? 20 : 22) : (bank === "B" ? (interestType === "flatRate" ? 18 : 25) : 0));

    const data = {
        principle: amount,
        frequency: frequency,
        period: period,
        startDate: startDate,
        interestType: interestType,
        rate: rate,
        email: email
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` //TODO Replace with a valid token
        },
        body: JSON.stringify(data)
    };

    // const response1 = {
    //     "data": {
    //         "principle": 200000.0,
    //         "frequency": 12,
    //         "period": 2,
    //         "startDate": "2021-02-21T00:00:00.000+00:00",
    //         "interestType": "Flat Rate",
    //         "processingFees": 6000.0,
    //         "exciseDuty": 1200.0,
    //         "legalFees": 10000.0,
    //         "interest": 2000.0,
    //         "installments": 10750.0015
    //     },
    //     "message": "Success calculating and sending to email",
    //     "status": 200
    // };



    // fetch('http://localhost:8080/api/v1/user_calculate', requestOptions)
    // https://bobbyqiz.free.beeceptor.com
    fetch('https://bobby.free.beeceptor.com/api/v1/user_calculate', requestOptions)
        .then(serverRes => serverRes.json())
        .then(response => {

            if (response[0]["status"] == 200) {
                alert('Request was successful');

                console.log((response));
                console.log(response[0]["data"]);

                let data = response[0]["data"];


                // response = response1;
                const resultsDiv = document.getElementById('results');
                console.log(typeof (date));

                // Check if the response variable is set
                if (response) {
                    // Populate the table with data
                    document.getElementById("principleInTable").textContent = data["principle"];
                    document.getElementById("frequencyInTable").textContent = data["frequency"];
                    document.getElementById("periodInTable").textContent = data["period"];
                    document.getElementById("startDateInTable").textContent = data["startDate"].substring(0, 10);
                    document.getElementById("interestTypeInTable").textContent = data["interestType"];
                    document.getElementById("processingFees").textContent = data["processingFees"];
                    document.getElementById("exciseDuty").textContent = data["exciseDuty"];
                    document.getElementById("legalFees").textContent = data["legalFees"];
                    document.getElementById("interest").textContent = data["interest"];
                    document.getElementById("installments").textContent = data["installments"];
                    resultsDiv.classList.remove('hidden');
                } else {
                    // Hide the table if the response variable is not set
                    // document.getElementById("tableContainer").style.display = "none";
                    resultsDiv.classList.add("hidden")
                }






            } else {
                alert('Request failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


}


// just verifying if token is available
// window.onload = ()=> {
//     console.log("Ni hii hapa: "+localStorage.getItem("token"))
//     // automatically set date(make work easier)
//     // document.getElementById("startDate").defaultValue = "10/04/2023"
// };   
















// Code block for sharing results via email
function shareViaEmail() {
    const principle = document.getElementById("principleInTable").value;
    const frequency = document.getElementById("frequencyInTable").value;
    const period = document.getElementById("periodInTable").value;
    const startDate = document.getElementById("startDateInTable").value;
    const interestType = document.getElementById("interestTypeInTable").value;
    // const rate = document.getElementById("rateInTable").value;
    const email = document.getElementById("email").value;
    const rate = (bank === "A" ? (interestType === "flatRate" ? 20 : 22) : (bank === "B" ? (interestType === "flatRate" ? 18 : 25) : 0));


    const data = {
        principle: principle,
        frequency: frequency,
        period: period,
        startDate: startDate,
        interestType: interestType,
        rate: rate,
        email: email
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` //TODO Replace with a valid token
        },
        body: JSON.stringify(data)
    };



    if (localStorage.getItem('token')) {


        // fetch('http://localhost:8080/api/v1/user_share', requestOptions)
        // https://bobbyqiz.free.beeceptor.com
        fetch('https://bobby.free.beeceptor.com/api/v1/user_share', requestOptions)
            .then(serverRes => serverRes.json())
            .then(response => {

                if (response[0]["status"] == 200) {

                    alert(response[0]["message"]);


                    const resultsDiv = document.getElementById('results');


                    if (response) {

                        // Make table visible Just incase
                        resultsDiv.classList.remove('hidden');

                    } else {
                        // Hide the table if the response variable is not set
                        // document.getElementById("tableContainer").style.display = "none";
                        resultsDiv.classList.add("hidden")
                    }



                } else {
                    alert('Request failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });




    } else {

        // Format the email body
        const emailBody = `
            Principal Amount: ${principle}
            Frequency: ${frequency}
            Period: ${period}
            Start Date: ${startDate}
            Interest Type: ${interestType}
            Interest Rate: ${rate}%
            Email: ${email}
            `;

        // Create a mailto link with the email body
        const mailtoLink = `mailto:?subject=Loan Details&body=${encodeURIComponent(emailBody)}`;

        // Open the user's default email client with the pre-filled email
        window.location.href = mailtoLink;
    }


}








// function to print table
function printTable() {
    const printContents = document.getElementById("tableContainer").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
