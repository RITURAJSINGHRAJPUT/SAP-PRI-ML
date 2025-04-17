import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Validation function
function validateInput(email, password) {
    if (!email || !password) {
        alert("Please enter both email and password.");
        return false;
    }
    // You can add more validation here (e.g., email format check)
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    return true;
}

export function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate inputs
    if (!validateInput(email, password)) {
        return;  // Stop if validation fails
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "dashboard.html";  // Instant redirect to dashboard
        })
        .catch((error) => {
            // Show error in a pop-up
            alert(`Login failed: ${error.message}`);
        });
}
