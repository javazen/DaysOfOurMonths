//import {process} from './days.js';

'use strict';

let leapCB, totalDaysInput;
let mTotal, mTotalNeeded;
const monthsInputs = {};
const monthsObj = {m31:7, m30:4, m29:0, m28:1, leapValue:false};

document.addEventListener("DOMContentLoaded", function() {
  
  ['m31', 'm30', 'm29', 'm28'].forEach( (item) => {
    monthsInputs[item] = document.getElementById(item);
    monthsInputs[item].setAttribute("value", monthsObj[item]);
    addListeners(monthsInputs[item]);
  });
  
  totalDaysInput = document.getElementById("totalDays");
  leapCB = document.getElementById("leap");
  leapCB.checked = monthsObj.leapValue;
  leapCB.addEventListener('change', clickLeapCB);
  updateTotal(monthsObj);
  
  let non31array = [];
  for (let i=0; i<monthsObj.m30; i++) non31array.push(30);
  for (let i=0; i<monthsObj.m29; i++) non31array.push(29);
  for (let i=0; i<monthsObj.m28; i++) non31array.push(28);
  const obj = process(non31array, leapCB.checked); // [28,30,30,30,30]
});

function clickInput() {
  this.select();
}
function updateValue(e) {
  monthsObj[this.getAttribute("id")] = +e.target.value;
  updateTotal(monthsObj);
}
function addListeners(elem) {
  elem.addEventListener('click', clickInput);
  elem.addEventListener('input', updateValue);
}
function clickLeapCB() {
  monthsObj.leapValue = (this.checked);
  updateTotal(monthsObj);
}

function updateTotal(monthsObj) {
  mTotalNeeded = (monthsObj.leapValue) ? 366 : 365;
  mTotal = monthsObj.m31*31 + monthsObj.m30*30 + monthsObj.m29*29 + monthsObj.m28*28;
  totalDaysInput.innerText = "" + mTotal;
  const wrongTotal = (mTotal !==  mTotalNeeded);
  if (wrongTotal)
    totalDaysInput.classList.add("wrongTotalColoring");
  else
    totalDaysInput.classList.remove("wrongTotalColoring");
}

