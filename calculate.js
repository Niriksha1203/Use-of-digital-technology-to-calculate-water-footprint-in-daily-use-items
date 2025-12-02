// ------------------------
// 25 QUESTIONS
// ------------------------
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
  { label: "How often do you eat meat per week?", name: "meatFrequency", type: "select", options: [
    {value: 0, text: "Never"},
    {value: 1, text: "1-2 times"},
    {value: 3, text: "3-5 times"},
    {value: 7, text: "Daily"}
  ]},

  // --- Extra 15 Questions ---
  { label: "How many soft drinks do you consume per week?", name: "softDrinks", type: "number", value: 2 },
  { label: "How many fruits do you eat per day?", name: "fruits", type: "number", value: 2 },
  { label: "How many cups of vegetables do you eat per day?", name: "vegetables", type: "number", value: 2 },
  { label: "How many eggs do you eat per week?", name: "eggs", type: "number", value: 4 },
  { label: "How many kilometers do you travel by car per day?", name: "carTravel", type: "number", value: 5 },
  { label: "How many kilometers do you travel by bike per day?", name: "bikeTravel", type: "number", value: 3 },
  { label: "How many packaged snacks do you eat per week?", name: "packagedFood", type: "number", value: 3 },
  { label: "How many new clothes do you buy per month?", name: "clothes", type: "number", value: 2 },
  { label: "How many jeans do you buy per year?", name: "jeans", type: "number", value: 1 },
  { label: "How many meals of rice do you eat per week?", name: "rice", type: "number", value: 7 },
  { label: "How many bread meals do you eat per week?", name: "bread", type: "number", value: 5 },
  { label: "How many liters of bottled water do you buy per week?", name: "bottledWater", type: "number", value: 1 },
  { label: "How many minutes do you keep tap running while brushing teeth daily?", name: "brushingTap", type: "number", value: 2 },
  { label: "How many minutes you use tap water while cooking daily?", name: "cookingWater", type: "number", value: 5 },
  { label: "How many showers per week are hot-water showers?", name: "hotShower", type: "number", value: 3 }
];

let currentQuestion = 0;
let answers = {};

const questionContainer = document.getElementById("questionContainer");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// ------------------------
// DISPLAY QUESTION
// ------------------------
function showQuestion(index){
  const q = questions[index];
  progressFill.style.width = `${((index+1)/questions.length)*100}%`;

  let inputHtml = '';
  if (q.type === 'select') {
    inputHtml = `<select id="qinput" style="padding:8px;width:100%;">` +
      q.options.map(o => `<option value="${o.value}" ${answers[q.name]==o.value?'selected':''}>${o.text}</option>`).join('') +
      `</select>`;
  } else {
    inputHtml = `<input id="qinput" type="${q.type}" value="${answers[q.name] ?? q.value}" style="padding:8px;width:100%;">`;
  }

  questionContainer.innerHTML = `
    <label style="font-weight:600">${index+1}/${questions.length} - ${q.label}</label>
    <div style="margin-top:8px">${inputHtml}</div>
  `;

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? 'Finish ✅' : 'Next ➡';
}

nextBtn.addEventListener('click', () => {
  const inp = document.getElementById('qinput');
  const val = Number(inp.value) || 0;
  answers[questions[currentQuestion].name] = val;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    calculateResult();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

// ------------------------
// MAIN CALCULATION
// ------------------------
function calculateResult(){
  let t = 0;

  t += (answers.drinkingWater||0) * 0.25;
  t += (answers.showerMinutes||0) * 9;
  t += (answers.toiletFlushes||0) * 6;
  t += ((answers.laundryLoads||0)/7) * 50;
  t += (answers.dishWashing||0) * 5;
  t += (answers.coffee||0) * 140;
  t += (answers.tea||0) * 30;
  t += ((answers.milk||0)/7) * 255;
  t += ((answers.gardenWatering||0)/7) * 100;
  t += (answers.meatFrequency||0) * 500;

  // NEW ADDITIONS
  t += ((answers.softDrinks||0)/7) * 70;
  t += (answers.fruits||0) * 50;
  t += (answers.vegetables||0) * 30;
  t += ((answers.eggs||0)/7) * 200;
  t += (answers.carTravel||0) * 10;
  t += (answers.bikeTravel||0) * 4;
  t += ((answers.packagedFood||0)/7) * 180;
  t += ((answers.clothes||0)/30) * 2700;
  t += ((answers.jeans||0)/365) * 7600;
  t += ((answers.rice||0)/7) * 300;
  t += ((answers.bread||0)/7) * 160;
  t += ((answers.bottledWater||0)/7) * 10;
  t += (answers.brushingTap||0) * 6;
  t += (answers.cookingWater||0) * 4;
  t += ((answers.hotShower||0)/7) * 12;

  const total = Math.round(t);

  const resultCard = document.getElementById('resultCard');
  resultCard.style.display = 'block';
  document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });

  animateResult(total);
}

// ------------------------
// RESULT ANIMATION + PIE CHART
// ------------------------
function animateResult(total){
  const circle = document.getElementById('waterCircle');
  const message = document.getElementById('resultMessage');

  let cur = 0;
  const step = Math.max(1, Math.round(total/60));
  const t = setInterval(()=>{
    cur += step;
    if (cur >= total) { cur = total; clearInterval(t); }
    circle.textContent = `${cur} L`;
  },25);

  if (total < 2000) { circle.style.borderColor = '#28a745'; circle.style.color='#28a745'; message.textContent = '🌱 Low footprint — great job!'; }
  else if (total < 4000) { circle.style.borderColor = '#ffc107'; circle.style.color='#ffc107'; message.textContent = '🚿 Moderate footprint — can improve.'; }
  else { circle.style.borderColor = '#dc3545'; circle.style.color='#dc3545'; message.textContent = '🌊 High footprint — consider reducing it.'; }

  const data = [
    { label: 'Shower', value: (answers.showerMinutes||0)*9 },
    { label: 'Coffee', value: (answers.coffee||0)*140 },
    { label: 'Meat', value: (answers.meatFrequency||0)*500 },
    { label: 'Laundry', value: ((answers.laundryLoads||0)/7)*50 },
    { label: 'Garden', value: ((answers.gardenWatering||0)/7)*100 }
  ].filter(x => x.value > 0);

  const ctx = document.getElementById('pieChart').getContext('2d');
  if (window._pie) window._pie.destroy();
  window._pie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: ['#0077b6','#00b4d8','#ffc107','#28a745','#dc3545']
      }]
    },
    options:{ responsive:true, plugins:{ legend:{ position:'bottom' }}}
  });
}

// start
showQuestion(currentQuestion);
