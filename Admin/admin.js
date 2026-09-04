import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// =========================================================
// FIREBASE CONFIG
// =========================================================

const firebaseConfig = {
  apiKey: "AIzaSyBhndR9oFuLWEUVvDOQDzzepv2p7sGPKG4",
  authDomain: "moryastore-2a88e.firebaseapp.com",
  projectId: "moryastore-2a88e",
  storageBucket: "moryastore-2a88e.firebasestorage.app",
  messagingSenderId: "891569428587",
  appId: "1:891569428587:web:4712e19c6898e6471af92e",
  measurementId: "G-W32ZYR66CK"
};


// =========================================================
// INITIALIZE FIREBASE
// =========================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// =========================================================
// ELEMENTS
// =========================================================

const loginCard = document.getElementById("loginCard");
const dashboardCard = document.getElementById("dashboardCard");

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

const logoutButton = document.getElementById("logoutButton");


// =========================================================
// ADMIN UID
// =========================================================

const ADMIN_UID = "ToXEvCMED0T7udiO3xXtvcVzBiN2";


// =========================================================
// AUTH STATE
// =========================================================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    showLogin();
    return;
  }

  // Extra protection:
  // Only our known admin UID can use this dashboard.

  if (user.uid !== ADMIN_UID) {

    signOut(auth);

    showLogin();

    loginMessage.textContent =
      "या खात्याला Admin access नाही.";

    return;
  }

  showDashboard();

});


// =========================================================
// LOGIN
// =========================================================

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    loginMessage.textContent =
      "ई-मेल आणि पासवर्ड भरा.";
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "लॉगिन होत आहे...";
  loginMessage.textContent = "";

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    if (user.uid !== ADMIN_UID) {

      await signOut(auth);

      throw new Error(
        "या खात्याला Admin access नाही."
      );
    }

  } catch (error) {

    console.error(error);

    loginMessage.textContent =
      getLoginErrorMessage(error);

  } finally {

    loginButton.disabled = false;
    loginButton.textContent = "लॉगिन करा";

  }

});


// =========================================================
// LOGOUT
// =========================================================

logoutButton.addEventListener("click", async () => {

  try {

    await signOut(auth);

  } catch (error) {

    console.error("Logout error:", error);

  }

});


// =========================================================
// SHOW LOGIN
// =========================================================

function showLogin() {

  loginCard.classList.remove("hidden");
  dashboardCard.classList.add("hidden");

}


// =========================================================
// SHOW DASHBOARD
// =========================================================

function showDashboard() {

  loginCard.classList.add("hidden");
  dashboardCard.classList.remove("hidden");

}


// =========================================================
// FRIENDLY LOGIN ERRORS
// =========================================================

function getLoginErrorMessage(error) {

  switch (error.code) {

    case "auth/invalid-credential":
      return "ई-मेल किंवा पासवर्ड चुकीचा आहे.";

    case "auth/invalid-email":
      return "कृपया योग्य ई-मेल टाका.";

    case "auth/too-many-requests":
      return "खूप प्रयत्न झाले. थोड्या वेळाने पुन्हा प्रयत्न करा.";

    case "auth/user-disabled":
      return "हे Admin खाते बंद करण्यात आले आहे.";

    default:
      return "लॉगिन करता आले नाही. पुन्हा प्रयत्न करा.";

  }

}