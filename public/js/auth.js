// ── Credentials ──────────────────────────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@miuegypt.edu.eg';
const ADMIN_PASSWORD = 'admin1234';

// ── Login ─────────────────────────────────────────────────────────────────────
function validateLogin() {
    const email    = document.getElementById('Login_Email').value.trim();
    const password = document.getElementById('Login_Password').value;
    const errorEl  = document.getElementById('error-msg');

    // Email format check
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Password presence check
    if (password.length === 0) {
        alert( 'Please enter your password.');
        return false;
    }
    if (password.length < 8) {
        alert( 'Password must be at least 8 characters.');
        return false;
    }

    // ── Admin check ───────────────────────────────────────────────────────────
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('lumiskin_admin_auth', 'true');
        window.location.href = 'admin.html';
        return false;
    }

    alert( 'Invalid credentials. Please try again.');
    return false;
}

// ── Sign-up ───────────────────────────────────────────────────────────────────
function validatesignup() {
    const Fname = document.getElementById('Fname').value;
    if (!/^[a-zA-Z\s]{3,}$/.test(Fname)) {
        alert('First name must be at least 3 letters.'); return false;
    }

    const Lname = document.getElementById('Lname').value;
    if (!/^[a-zA-Z\s]{3,}$/.test(Lname)) {
        alert('Last name must be at least 3 letters.'); return false;
    }

    const email = document.getElementById('Email').value;
    if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email)) {
        alert('Please enter a valid email address.'); return false;
    }

    const password = document.getElementById('Password').value;
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        alert('Password must be at least 8 characters, include 1 uppercase letter and 1 number.'); return false;
    }

    const confirmPassword = document.getElementById('Confirm_Password').value;
    if (password !== confirmPassword) {
        alert('Passwords do not match.'); return false;
    }

    alert('Account created successfully!');
    return false;
}
