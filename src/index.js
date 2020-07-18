import {process} from './days.js';

let leapCB, totalDaysInput, analyze;
let mTotal, mTotalNeeded, correctTotal;
const monthsInputs = {};
const monthsObj = {m31:6, m30:5, m29:0, m28:1, leapValue:false};

document.addEventListener("DOMContentLoaded", function() {
  
  ['m31', 'm30', 'm29', 'm28'].forEach( (item) => {
    monthsInputs[item] = document.getElementById(item);
    monthsInputs[item].value = monthsObj[item];
    addListeners(monthsInputs[item]);
  });
  
  totalDaysInput = document.getElementById("totalDays");
  leapCB = document.getElementById("leap");
  leapCB.checked = monthsObj.leapValue;
  leapCB.addEventListener('change', clickLeapCB);
  correctTotal = updateTotal(monthsObj);
  analyze = document.getElementById("analyze");
  analyze.addEventListener('click', handleAnalyze);
  
  if (correctTotal) handleAnalyze();
});

function clickInput() {
  this.select();
}
function handleAnalyze() {
  let non31array = [];
  for (let i=0; i<monthsObj.m30; i++) non31array.push(30);
  for (let i=0; i<monthsObj.m29; i++) non31array.push(29);
  for (let i=0; i<monthsObj.m28; i++) non31array.push(28);
  const obj = process(non31array, leapCB.checked); // [28,30,30,30,30]
  updateOutput(obj);
}
function updateValue(e) {
  monthsObj[this.getAttribute("id")] = +e.target.value;
  correctTotal = updateTotal(monthsObj);
}
function addListeners(elem) {
  elem.addEventListener('click', clickInput);
  elem.addEventListener('input', updateValue);
}
function clickLeapCB() {
  monthsObj.leapValue = (this.checked);
  correctTotal = updateTotal(monthsObj);
}

function updateTotal(monthsObj) {
  mTotalNeeded = (monthsObj.leapValue) ? 366 : 365;
  mTotal = monthsObj.m31*31 + monthsObj.m30*30 + monthsObj.m29*29 + monthsObj.m28*28;
  totalDaysInput.innerText = "" + mTotal;
  const correctTotal = (mTotal === mTotalNeeded);
  if (correctTotal)
    totalDaysInput.classList.remove("wrongTotalColoring");
  else
    totalDaysInput.classList.add("wrongTotalColoring");
  return correctTotal;
}

function updateOutput(outputObj) {
  const lowScoreInput = document.getElementById("lowScore");
  lowScoreInput.value = outputObj.lowScore;
  const lowScoreExample = document.getElementById("lowScoreExample");
  let lowExStr = outputObj.lowScoreExample.join(", ");
  lowScoreExample.value = lowExStr;
  
  const highScoreInput = document.getElementById("highScore");
  highScoreInput.value = outputObj.highScore;
  const highScoreExample = document.getElementById("highScoreExample");
  let highExStr = outputObj.highScoreExample.join(", ");
  highScoreExample.value = highExStr;
  
  const scoreCounts = document.getElementById("scoreCounts");
  let scoreCountsStr = outputObj.scoreCounts.join(", ");
  scoreCounts.value = scoreCountsStr;
}

