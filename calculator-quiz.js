const questions = [
  { label: "How many glasses of water do you drink per day?", name: "drinkingWater", type: "number", value: 5 },
  { label: "How many minutes do you shower per day?", name: "showerMinutes", type: "number", value: 10 },
  { label: "How many times do you flush the toilet per day?", name: "toiletFlushes", type: "number", value: 5 },
  { label: "How many washing machine loads per week?", name: "laundryLoads", type: "number", value: 3 },
  { label: "How many times do you wash dishes per day?", name: "dishWashing", type: "number", value: 2 },
  { label: "How many cups of coffee do you drink per day?", name: "coffee", type: "number", value: 1 },
  { label: "How many cups of tea do you drink per day?", name: "tea", type: "number", value: 1 },
  { label: "How many liters of milk do you consume per week?", name: "milk", type: "number", value: 1 },
  { label: "How many times do you water your garden per week?", name: "gardenWatering", type: "number", value: 3 },
  {
    label: "How often do you eat meat per week?", name: "meatFrequency", type: "select", options: [
      { value: 0, text: "Never" },
      { value: 1, text: "1-2 times" },
      { value: 3, text: "3-5 times" },
      { value: 7, text: "Daily" }
    ]
  },
];

let currentQuestion = 0;
let answers = {};

const questionContainer = document.getElementById("questionContainer");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resultContainer = document.getElementById("result-container");
const resultValue = document.getElementById("result-value");
const resultMessage = document.getElementById("result-message");
const waterCircle = document.querySelector(".water-circle");

function showQuestion(index) {
  const q = questions[index];
  progress.style.width = `${((index + 1) / questions.length) * 100}%`;

  let inputField;
  if (q.type === "select") {
    inputField = `<select name="${q.name}">` +
      q.options.map(o => `<option value="${o.value}">${o.text}</option>`).join('') +
      `</select>`;
  } else {
    inputField = `<input type="${q.type}" name="${q.name}" value="${answers[q.name] ?? q.value}">`;
  }

  questionContainer.innerHTML = `
    <label>${index + 1}/${questions.length} - ${q.label}</label>
    ${inputField}
  `;

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? "Finish ✅" : "Next ➡";
}

nextBtn.addEventListener("click", () => {
  const input = questionContainer.querySelector("input, select");
  answers[questions[currentQuestion].name] = Number(input.value);

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    calculateResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

function calculateResult() {
  let total = 0;
  total += answers.drinkingWater * 0.25;
  total += answers.showerMinutes * 9;
  total += answers.toiletFlushes * 6;
  total += (answers.laundryLoads / 7) * 50;
  total += answers.dishWashing * 5;
  total += answers.coffee * 140;
  total += answers.tea * 30;
  total += (answers.milk / 7) * 255;
  total += (answers.gardenWatering / 7) * 100;
  total += answers.meatFrequency * 500;

  // Hide quiz and show result
  document.querySelector(".quiz-container").style.display = "none";
  resultContainer.classList.add("show");

  showResult(Math.round(total));
}

function showResult(totalWater) {
  // Remove old classes first
  waterCircle.classList.remove("low", "medium", "high");

  // Animate counter
  let current = 0;
  const step = Math.ceil(totalWater / 50);
  const counter = setInterval(() => {
    current += step;
    if (current >= totalWater) {
      current = totalWater;
      clearInterval(counter);
    }
    resultValue.textContent = `${current} L`;
  }, 30);

  // Set color and message dynamically
  if (totalWater < 2000) {
    waterCircle.classList.add("low");
    resultMessage.textContent = "🌱 Excellent! You're using less water than average!";
  } else if (totalWater < 4000) {
    waterCircle.classList.add("medium");
    resultMessage.textContent = "🚿 Moderate usage. Try saving more water daily!";
  } else {
    waterCircle.classList.add("high");
    resultMessage.textContent = "🌊 High usage! Take steps to conserve water!";
  }
}

showQuestion(currentQuestion);
