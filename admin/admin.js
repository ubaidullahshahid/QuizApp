const quizData = JSON.parse(localStorage.getItem("quizData")) || [];
let isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;

if (!isAdmin) {
  window.location.pathname = "/login/login.html";
}

function addQuestion() {
  const newQuestion = document.getElementById("new-question").value;
  const options = [
    document.getElementById("option1").value,
    document.getElementById("option2").value,
    document.getElementById("option3").value,
    document.getElementById("option4").value,
  ];
  const correctOption =
    parseInt(document.getElementById("correct-option").value) - 1;

  if (newQuestion && options.every((option) => option) && correctOption < 4) {
    quizData.push({ question: newQuestion, options, correct: correctOption });
    localStorage.setItem("quizData", JSON.stringify(quizData));
    alert("Question added successfully");
  } else {
    alert("Please fill in all fields correctly");
  }
}

let logOutBtn = document.querySelector(".log-out-btn");
logOutBtn.addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  window.location.pathname = "/login/login.html";
});
