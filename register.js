import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);

export function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate empty fields
    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Name should only contain alphabets and spaces
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Name should only contain alphabets and spaces.");
        return;
    }

    // Email must contain only alphabets before @
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(email)) {
        alert("Email must contain only alphabets before and after '@'. Example: abc@xyz.com");
        return;
    }

    // Strong password pattern (min 8 characters, uppercase, lowercase, number, special character)
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!strongPasswordPattern.test(password)) {
        alert("Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.");
        return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Firebase registration
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User Registered:", userCredential.user);
            alert("Registration successful!");
            window.location.href = "login.html"; // Redirect to login
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert(error.message);
        });
}
