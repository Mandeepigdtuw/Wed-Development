// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkKXVTFUA26ed0lcv4bjGbRjaxRLIDOu4",
  authDomain: "school-erp-93b2a.firebaseapp.com",
  projectId: "school-erp-93b2a",
  storageBucket: "school-erp-93b2a.firebasestorage.app",
  messagingSenderId: "710573059611",
  appId: "1:710573059611:web:a8a6d9fa72a02d0a7292be",
  measurementId: "G-PTRD7GJTP3"
};

import {getFirestore} from "firebase/firestore";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =  getFirestore(app);

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try{
        let userFound = false;

        //Check in all collections(teacher,student,admin)
        const collections = ["student", "teacher" , "admin"];
        for (const collection of collections){
            const userDoc = await db.collection(collection).doc(userId).get();
            if (userDoc.exists && userDoc.data().yourpassword === password){
                userFound = true;

                //Redirect based on role
                if (collection === "student") window.location.href = "./student-dasboard.html";
                else if (collection === "teacher") window.location.href = "./teacher-dashboard.html";
                else if (collection === "admin") window.location.href = "./admin-dashboard.html";

                break;
            }
        }

        if (!userFound) {
            message.textContent = "Invalid ID or Password";
            message.style.color = "red";
        }
    } catch (error){
        console.error("Error:", error);
        message.textContent = "Something went wrong. Try again.";
    }
});



document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try{
        let userFound = false;

        //Check in all collections(teacher,student,admin)
        const collections = ["student", "teacher" , "admin"];
        for (const col of collections){

            const userRef = doc(db, col, email);  
            const userDoc = await getDoc(userRef);


            if (userDoc.exists && userDoc.data().yourpassword === password){
                userFound = true;

                //Redirect based on role
                if (col === "student") window.location.href = "./student-dasboard.html";
                else if (col === "teacher") window.location.href = "./teacher-dashboard.html";
                else if (col === "admin") window.location.href = "./admin-dashboard.html";

                break;
            }
        }

        if (!userFound) {
            message.textContent = "Invalid ID or Password";
            message.style.color = "red";
        }
    } catch (error){
        console.error("Error:", error);
        message.textContent = "Something went wrong. Try again.";
    }
});





