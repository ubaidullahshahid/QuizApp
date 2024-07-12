const quizData = JSON.parse(localStorage.getItem("quizData")) || [
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
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    correct: 2,
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

let isLoggedIn = localStorage.getItem("login");
isLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : false;

if (isLoggedIn) {
  window.location.pathname = "/";
} else {
  window.location.pathname = "../login/login.html";
}

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
  selectedAnswer = null;
  document.getElementById("next-button").disabled = true;

  if (currentQuestionIndex >= quizData.length) {
    document.getElementById(
      "quiz-container"
    ).innerHTML = `<h2>Your score: ${score} / ${quizData.length}</h2>`;
    return;
  }

  const questionData = quizData[currentQuestionIndex];
  document.getElementById("quiz").innerHTML = `
        <h2>${questionData.question}</h2>
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
  document.getElementById("next-button").disabled = false;
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

const backButton = document.getElementById("back-button");
const logInBtn = document.getElementById("admin-login");
const quizContainer = document.getElementById("quiz-container");
const adminPannel = document.getElementById("admin-panel");
function showAdminLogin() {
  logInBtn.style.display = "block";
  quizContainer.style.display = "none";
  backButton.style.display = "block";
}

backButton.addEventListener("click", function () {
  quizContainer.style.display = "flex";
  logInBtn.style.display = "none";
  adminPannel.style.display = "none";
  backButton.style.display = "none";
});

function adminLogin() {
  const password = document.getElementById("admin-password").value;
  if (password === "admin123") {
    adminPannel.style.display = "block";
    logInBtn.style.display = "none";
  } else {
    alert("Password is incorrect");
  }
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

document.addEventListener("DOMContentLoaded", loadQuestion);
