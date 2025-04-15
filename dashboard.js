// ✅ Import Firebase Modules & Other Dependencies
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { app } from "./firebase-config.js";
import { generateIrrigationSchedule } from "./schedule.js"; // Local schedule.js

// ✅ Initialize Firebase Services
const auth = getAuth(app);
const db = getDatabase(app);

// ✅ Select UI Elements
const usernameElement = document.getElementById("username");
const logoutBtn = document.getElementById("logout");
const motorOnBtn = document.getElementById("motor-on");
const motorOffBtn = document.getElementById("motor-off");
const tempElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const soilMoistureElement = document.getElementById("soil-moisture");
const scheduleTable = document.getElementById("schedule-body");

// Theme toggle elements
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;

// Sidebar navigation elements
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const views = document.querySelectorAll('main > div[id$="-view"]');
const contentTitle = document.querySelector('.content-title');

// Settings elements
const profileUsernameElement = document.getElementById('profile-username');
const UsernameElement = document.getElementById('username');

// Analytics elements (Example: if you add a humidity chart)
const humidityCtx = document.getElementById("humidityChart")?.getContext("2d"); 
let humidityChart; // Placeholder for humidity chart instance

// --- Theme Toggling Logic --- 
const setTheme = (theme) => {
    bodyElement.className = theme; // Set body class
    localStorage.setItem('theme', theme); // Save theme preference
    const icon = themeToggleButton.querySelector('i');
    if (theme === 'dark-mode') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

themeToggleButton.addEventListener('click', () => {
    const currentTheme = bodyElement.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
    setTheme(currentTheme);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    setTheme(savedTheme);
});

// --- End Theme Toggling Logic ---

// --- View Switching Logic ---
const switchView = (viewId) => {
    views.forEach(view => {
        if (view.id === viewId) {
            view.classList.remove('view-hidden');
        } else {
            view.classList.add('view-hidden');
        }
    });

    const activeLink = document.querySelector(`.sidebar-nav a[href="#${viewId.split('-')[0]}"]`);
    if (activeLink) {
        let titleText = activeLink.textContent.trim();
        if (viewId === 'dashboard-view') titleText = 'Agriculture Dashboard';
        if (viewId === 'analytics-view') titleText = 'Analytics';
        if (viewId === 'settings-view') titleText = 'Settings';
        
        document.querySelectorAll('#' + viewId + ' .content-title').forEach(title => {
            title.textContent = titleText;
        });

        sidebarLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    if (viewId === 'analytics-view') {
        initializeHumidityChart();
    }
};

sidebarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetViewId = link.getAttribute('href').substring(1) + '-view';
        switchView(targetViewId);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const initialView = window.location.hash ? window.location.hash.substring(1) + '-view' : 'dashboard-view';
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    setTheme(savedTheme);
    switchView(initialView);
});

// --- End View Switching Logic ---

// ✅ Handle User Authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        const username = user.displayName || user.email.split("@")[0] || "User";
        usernameElement.textContent = `Welcome, ${username}`;
        if (profileUsernameElement) { 
            profileUsernameElement.textContent = username;
        }
    } else {
        window.location.href = "index.html"; // Redirect if not logged in
    }
});

// ✅ Logout Function
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => window.location.href = "index.html")
        .catch(error => alert("Logout failed: " + error.message));
});

// ✅ Motor ON/OFF Actions (for now, just alerts)
motorOnBtn.addEventListener("click", () => alert("Motor turned ON!"));
motorOffBtn.addEventListener("click", () => alert("Motor turned OFF!"));

// ✅ Fetch Real-time Sensor Data & Update UI
onValue(ref(db, "sensor"), async (snapshot) => {
    if (!snapshot.exists()) {
        console.warn("No sensor data found.");
        return;
    }

    const data = snapshot.val();
    console.log("Fetched Sensor Data:", data);

    const soilMoisturePercentage = Math.round((1 - data.soilMoisture / 4095) * 100);

    tempElement.textContent = `${data.temperature} °C`;
    humidityElement.textContent = `${data.humidity} %`;
    soilMoistureElement.textContent = `${soilMoisturePercentage} %`;

    updateCharts({ 
        temperature: data.temperature, 
        soilMoisture: soilMoisturePercentage, 
        humidity: data.humidity 
    });

    // Fetch irrigation prediction from Flask backend
    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                soilMoisture: soilMoisturePercentage,
                humidity: data.humidity,
                temperature: data.temperature,
                cropType: 'wheat' // Default crop type, can be made dynamic
            })
        });

        const prediction = await response.json();
        
        // Update motor control buttons based on prediction
        if (prediction.irrigationNeeded) {
            motorOnBtn.classList.add('active');
            motorOffBtn.classList.remove('active');
            // You can also update the UI to show the recommended water amount
            console.log(`Irrigation needed. Recommended water amount: ${prediction.waterAmount}mm`);
        } else {
            motorOnBtn.classList.remove('active');
            motorOffBtn.classList.add('active');
        }
    } catch (error) {
        console.error('Error fetching irrigation prediction:', error);
    }

    const schedules = generateIrrigationSchedule(soilMoisturePercentage, data.humidity);
    displayIrrigationSchedule(schedules);
});

// ✅ Initialize Charts
const tempCtx = document.getElementById("tempChart").getContext("2d");
const soilCtx = document.getElementById("soilMoistureChart").getContext("2d");

const tempChart = new Chart(tempCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{ label: "Temperature (°C)", data: [], borderColor: "red", borderWidth: 2 }]
    }
});

const soilChart = new Chart(soilCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{ label: "Soil Moisture (%)", data: [], borderColor: "blue", borderWidth: 2 }]
    }
});

function initializeHumidityChart() {
    if (!humidityCtx) return;
    if (humidityChart) return;

    humidityChart = new Chart(humidityCtx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Humidity (%)",
                data: [],
                backgroundColor: 'rgba(33, 150, 243, 0.6)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    console.log("Humidity chart initialized.");
}

// ✅ Update Charts Dynamically
function updateCharts(data) {
    const time = new Date().toLocaleTimeString();
    const MAX_POINTS = 10;

    if (tempChart.data.labels.length >= MAX_POINTS) {
        tempChart.data.labels.shift();
        tempChart.data.datasets[0].data.shift();
    }
    tempChart.data.labels.push(time);
    tempChart.data.datasets[0].data.push(data.temperature);
    tempChart.update();

    if (soilChart.data.labels.length >= MAX_POINTS) {
        soilChart.data.labels.shift();
        soilChart.data.datasets[0].data.shift();
    }
    soilChart.data.labels.push(time);
    soilChart.data.datasets[0].data.push(data.soilMoisture);
    soilChart.update();

    if (humidityChart && document.getElementById('analytics-view').offsetParent !== null) { 
        if (humidityChart.data.labels.length >= MAX_POINTS) {
            humidityChart.data.labels.shift();
            humidityChart.data.datasets[0].data.shift();
        }
        humidityChart.data.labels.push(time);
        humidityChart.data.datasets[0].data.push(data.humidity);
        humidityChart.update();
    }
}

// ✅ Display Next 5 Irrigation Schedules
function displayIrrigationSchedule(schedules) {
    scheduleTable.innerHTML = "";
    schedules.forEach((schedule, index) => {
        scheduleTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${schedule.time}</td>
                <td>${schedule.soil_moisture} %</td>
                <td>${schedule.temperature} °C</td>
            </tr>
        `;
    });
}

// ✅ Mobile: Click Outside to Close Sidebar
document.addEventListener('click', function (e) {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-nav-toggle');
    if (sidebar && toggle && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
        document.body.classList.remove('sidebar-open');
    }
});
