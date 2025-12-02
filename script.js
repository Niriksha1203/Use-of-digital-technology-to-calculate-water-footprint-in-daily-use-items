const questions = [
  { text: "How many liters of water do you drink per day?", icon: "🥤", multiplier: 1 },
  { text: "How many times do you take a shower per day?", icon: "🚿", multiplier: 50 },
  { text: "How many times do you flush the toilet per day?", icon: "🚽", multiplier: 6 },
  { text: "How many times do you wash your hands per day?", icon: "🧼", multiplier: 2 },
  { text: "How many clothes washes (machine) per week?", icon: "👕", multiplier: 70/7 },
  { text: "How many plates/cups do you wash per day?", icon: "🍽️", multiplier: 15 },
  { text: "How many times do you cook rice/pasta per day?", icon: "🍚", multiplier: 3 },
  { text: "How many times do you brush your teeth per day?", icon: "🪥", multiplier: 2 },
  { text: "How many minutes do you water plants per day?", icon: "🌱", multiplier: 15 },
  { text: "How many kilometers do you drive per day?", icon: "🚗", multiplier: 100 },
  { text: "How many cups of tea/coffee per day?", icon: "☕", multiplier: 140 },
  { text: "How many eggs do you eat per day?", icon: "🥚", multiplier: 200 },
  { text: "How many glasses of milk per day?", icon: "🥛", multiplier: 255 },
  { text: "Showers by other family members (total per day)?", icon: "👨‍👩‍👧", multiplier: 50 },
  { text: "How many kg of fruits/vegetables do you eat per day?", icon: "🥦", multiplier: 300 }
];

let currentQuestion = 0;
let answers = [];
let totalWater = 0;

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const resultBox = document.getElementById("result");
const questionIcon = document.getElementById("questionIcon");
const progressBar = document.getElementById("progressBar");

function showQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    questionElement.textContent = q.text;
    questionIcon.textContent = q.icon;
    answerInput.value = "";
    answerInput.focus();
    updateProgressBar();
  } else {
    calculateResult();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function nextQuestion() {
  const value = parseFloat(answerInput.value) || 0;
  answers.push(value);
  totalWater += value * questions[currentQuestion].multiplier;
  currentQuestion++;

  document.querySelector(".question-card").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".question-card").classList.remove("fade-out");
    document.querySelector(".question-card").classList.add("fade-in");
    showQuestion();
    setTimeout(() => document.querySelector(".question-card").classList.remove("fade-in"), 300);
  }, 300);
}

function calculateResult() {
  document.querySelector(".question-card").style.display = "none";
  progressBar.style.width = "100%";

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h2>✅ Your Daily Water Footprint</h2>
    <p>💧 Total estimated water used today: <strong>${Math.round(totalWater)} L</strong></p>
    <p>That's approximately ${(totalWater/1000).toFixed(2)} m³ of water per day!</p>
    <button onclick="location.reload()">🔄 Recalculate</button>
  `;
}

showQuestion();
