import { auth, db, ref, set, onValue } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.querySelector('.form-input[type="text"]');
    const emailInput = document.querySelector('.form-input[type="email"]');
    const phoneInput = document.querySelector('.form-input[type="tel"]');
    const locationInput = document.querySelector('.form-input[type="text"]:nth-of-type(2)');
    const aboutInput = document.querySelector('.form-textarea');
    const saveBtn = document.querySelector('.btn-primary');

    auth.onAuthStateChanged(user => {
        if (user) {
            const userRef = ref(db, 'users/' + user.uid);

            // 🟡 Load data on page load
            onValue(userRef, snapshot => {
                const data = snapshot.val();
                if (data) {
                    nameInput.value = data.name || '';
                    emailInput.value = user.email || '';
                    phoneInput.value = data.phone || '';
                    locationInput.value = data.location || '';
                    aboutInput.value = data.about || '';
                }
            });

            // 🔵 Save data to Firebase
            saveBtn.addEventListener('click', () => {
                const updatedData = {
                    name: nameInput.value,
                    phone: phoneInput.value,
                    location: locationInput.value,
                    about: aboutInput.value
                };

                set(userRef, updatedData)
                    .then(() => alert("Profile updated successfully!"))
                    .catch(err => alert("Error saving profile: " + err.message));
            });

        } else {
            alert("You must be logged in to view this page.");
            window.location.href = "login.html";
        }
    });
});
