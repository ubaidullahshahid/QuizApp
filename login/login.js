let user = JSON.parse(localStorage.getItem("userData")) || [];
let form = document.querySelector(".login-form");
let currentIndex = JSON.parse(localStorage.getItem("currentIndex")) || 0;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  formData.get("email");
  formData.get("password");
  let userExists = user.find((u, index) => u.email === formData.get("email"));
  currentIndex = user.findIndex((u) => u.email === formData.get("email"));
  if (userExists && userExists.password === formData.get("password")) {
    isLoggedIn = true;
    localStorage.setItem("currentIndex", currentIndex);
    localStorage.setItem("login", JSON.stringify(isLoggedIn));
    window.location.pathname = "/";
  } else {
    alert("Invalid email or password");
  }
});

// admin functionality start

let adminBtn = document.querySelector(".admin-login-btn");
let email = document.querySelector("#admin-email");
let password = document.querySelector("#admin-password");
let isAdmin = false;

adminBtn.addEventListener("click", () => {
  if (email.value === "admin@gmail.com" && password.value === "admin") {
    isAdmin = true;
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    window.location.pathname = "/admin/adminPanel.html";
  } else if (email.value === null && password.value === null) {
    alert("Please enter email and password");
  } else {
    alert("You are not an admin");
  }
});
// }
