function validateLogin() {
    let email = document.getElementById('Login_Email').value;
    let emailregex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!emailregex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    let password = document.getElementById('Login_Password').value;
    if (password.length === 0) {
        alert("Please enter your password!");
        return false;
    }
    if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return false;
    }

    alert("Logged in successfully!");
    return false;
}

function validatesignup() {
    let Fname = document.getElementById('Fname').value;
    let Fnameregex = /^[a-zA-Z\s]{3,}$/;
    if (!Fnameregex.test(Fname)) {
        alert("First Name should be more than 3 characters, letters only!");
        return false;
    }

    let Lname = document.getElementById('Lname').value;
    let Lnameregex = /^[a-zA-Z\s]{3,}$/;
    if (!Lnameregex.test(Lname)) {
        alert("Last Name should be more than 3 characters, letters only!");
        return false;
    }

    let email = document.getElementById('Email').value;
    let emailregex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!emailregex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    let password = document.getElementById('Password').value;
    let passwordregex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordregex.test(password)) {
        alert("Password must be at least 8 characters, 1 uppercase, 1 number!");
        return false;
    }

    let confirmPassword = document.getElementById('Confirm_Password').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    alert("Account created successfully!");
    return false;
}