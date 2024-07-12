let user = localStorage.getItem("userData");
user = user ? JSON.parse(user) : [];

// let isLoggedIn = localStorage.getItem("login");
// isLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : true;

// window.onload = function () {
//   if (isLoggedIn) {
//     window.location.pathname = "/";
//   } else {
//     window.location.pathname = "../login/login.html";
//   }
// };

if (location.pathname.includes("login.html")) {
  let form = document.querySelector(".login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(form);
    formData.get("email");
    formData.get("password");
    let userExists = user.find((u) => u.email === formData.get("email"));

    if (userExists && userExists.password === formData.get("password")) {
      isLoggedIn = true;
      localStorage.setItem("login", JSON.stringify(isLoggedIn));
      window.location.pathname = "/";
      x;
    } else {
      alert("Invalid email or password");
    }
  });
}
