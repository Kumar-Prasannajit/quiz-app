// script.js

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Syntax"
    ],
    answer: "Cascading Style Sheets"
  }
];

// DOM selectors
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// You can now write your logic to render questions, handle answers, and show results
let currentQuestionIndex = 0;
let score = 0;

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    renderQuestion(currentQuestionIndex);
    currentQuestionIndex++;
  } else {
    showResult();
  }
});

function renderQuestion(index) {
  questionText.textContent = questions[index].question;
  answerList.innerHTML = `
      ${questions[index].answers.map((answer, i) => `
        <li>
          <button class="answer-btn" data-answer="${answer}">${answer}</button>
        </li>
      `).join('')}
    `;
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach(button => {
    button.addEventListener("click", () => {
      console.log(`Selected answer: ${button.dataset.answer}`);
      if (button.dataset.answer === questions[index].answer) {
        score++;
        button.style.backgroundColor = "green"; // Correct answer
      }
      nextBtn.style.display = "block";
      answerButtons.forEach(btn => btn.disabled = true); // Disable all buttons after an answer is selected
    });
  });
  nextBtn.style.display = "none"; // Hide next button until an answer is selected
  updateProgressBar(index);
}

function showResult() {
  resultBox.style.display = "block";
  scoreText.textContent = `Your score: ${score} out of ${questions.length}`;
  nextBtn.style.display = "none";
}

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.style.display = "none";
  nextBtn.style.display = "block";
  renderQuestion(currentQuestionIndex);
});

function updateProgressBar(index) {
  const progressBar = document.getElementById("progressbar");
  const totalQuestions = questions.length;
  const progressPercentage = ((index + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}