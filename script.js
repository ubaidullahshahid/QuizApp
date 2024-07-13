const quizData = JSON.parse(localStorage.getItem("quizData")) || [
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    correct: 2,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "Which programming language is known as the language of the web?",
    options: ["A. Python", "C++", "JavaScript", "Java"],
    correct: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2", "CO2", "H2O"],
    correct: 3,
  },
  {
    question: "What is the boiling point of water?",
    options: ["50°C", "75°C", "100°C", "150°C"],
    correct: 2,
  },
  {
    question: "What is the square root of 16?",
    options: ["2", "4", "6", "8"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Michelangelo",
      "Leonardo da Vinci",
    ],
    correct: 4,
  },
];
localStorage.setItem("quizData", JSON.stringify(quizData));

let userData = JSON.parse(localStorage.getItem("userData")) || [];
let currentIndex = JSON.parse(localStorage.getItem("currentIndex")) || 0;

let isLoggedIn = localStorage.getItem("login");
isLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : false;

if (!isLoggedIn) {
  window.location.pathname = "../login/login.html";
}

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

if (userData[currentIndex].result === false) {
  function loadQuestion() {
    selectedAnswer = null;
    document.getElementById("next-button").style.display = "none";

    if (currentQuestionIndex >= quizData.length) {
      document.getElementById(
        "quiz-container"
      ).innerHTML = `<h2>Your score: ${score} / ${quizData.length}</h2>`;
      userData[currentIndex].result = true;
      localStorage.setItem("userData", JSON.stringify(userData));
      return;
    }

    const questionData = quizData[currentQuestionIndex];
    document.getElementById("quiz").innerHTML = `
          <h4>${questionData.question}</h4>
          ${questionData.options
            .map(
              (option, index) =>
                `<button onclick="selectAnswer(${index})">${option}</button>`
            )
            .join("")}
            `;
  }
  function selectAnswer(selectedIndex) {
    selectedAnswer = selectedIndex;
    document.getElementById("next-button").style.display = "block";
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;
    const questionData = quizData[currentQuestionIndex];
    if (selectedAnswer === questionData.correct) {
      score++;
      alert("Correct answer!");
    } else {
      alert("Wrong answer!");
    }

    currentQuestionIndex++;
    loadQuestion();
  }
} else {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("next-button").style.display = "none";
  document.querySelector(".result-text").style.display = "block";
  let resultBtn = document.getElementById("result-button");
  resultBtn.style.display = "flex";
  console.log(resultBtn);
  // let quizContainer = document.getElementById("quiz-container");
  // quizContainer.innerHTML = ``;

}

let logoutBtn = document.querySelector(".log-out-btn");
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("login");
  window.location.pathname = "../login/login.html";
});

document.addEventListener("DOMContentLoaded", loadQuestion);
