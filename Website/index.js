// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkKXVTFUA26ed0lcv4bjGbRjaxRLIDOu4",
    authDomain: "school-erp-93b2a.firebaseapp.com",
    projectId: "school-erp-93b2a",
    storageBucket: "school-erp-93b2a.firebasestorage.app",
    messagingSenderId: "710573059611",
    appId: "1:710573059611:web:a8a6d9fa72a02d0a7292be",
    measurementId: "G-PTRD7GJTP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission event
document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('status');

    if (name && email && message) {
        try {
            // Add data to Firestore collection (Normal property)
            await addDoc(collection(db, "user_data"), {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            });

            status.textContent = "Data added successfully!";
            status.style.color = "green";

            // Clear form
            document.getElementById('dataForm').reset();
        } catch (error) {            //Property of error
            console.error("Error adding document: ", error);
            status.textContent = "Error adding data!";
            status.style.color = "red";
        }
    } else {
        status.textContent = "All fields are required!";
        status.style.color = "red";
    }
});
