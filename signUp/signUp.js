let userData = localStorage.getItem("userData");
userData = userData ? JSON.parse(userData) : [];

if (location.pathname.includes("signUp.html")) {
  let form = document.querySelector(".sign-up-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let currentUser = {
      username: "",
      email: "",
      password: "",
    };
    let formData = new FormData(form);
    let userExist = userData.find(
      (item) => formData.get("email") === item.email
    );
    if (userExist) {
      alert("already have account");
    } else if (formData.get("password") !== formData.get("confirm-password")) {
      alert("Passwords do not match");
    } else {
      currentUser.email = formData.get("email");
      currentUser.password = formData.get("password");
      currentUser.username = formData.get("username");
      userData.push(currentUser);
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  });
}
