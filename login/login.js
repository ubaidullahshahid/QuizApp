let user = localStorage.getItem("userData");
user = user ? JSON.parse(user) : [];

let isLoggedIn = localStorage.getItem("login");
isLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : false;

window.onload = function () {
  console.log("Page loaded.");
  console.log("Login status:", isLoggedIn);
  if (isLoggedIn && !window.location.pathname.includes("/index.html")) {
    console.log("Redirecting to index.html");
    window.location.href = "/index.html";
  } else if (
    !isLoggedIn &&
    !window.location.pathname.includes("/login/login.html")
  ) {
    window.location.href = "/login/login.html";
    console.log("Redirecting to login.html");
  }
};

if (location.pathname === "/login/login.html") {
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
      window.location.href = "../index.html";
    } else {
      alert("Invalid email or password");
    }
  });
}
