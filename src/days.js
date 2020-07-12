// process( [28,30,30,30,30], false )
export function process(non31array, isLeapYear) {
  const totalDaysNeeded = (isLeapYear) ? 366 : 365;
  let m31=12-non31array.length, totalDays=0;
  for (let i=0; i<non31array.length; i++) {
    let aMonth = non31array[i];
    totalDays += aMonth;
  }
  totalDays += 31*m31;
  if (totalDays !== totalDaysNeeded) {
    console.log('oops, error: total days= ' + totalDays + ' should be ' + totalDaysNeeded);
  }

  let allMonthsArray = non31array.slice(0);
  // for (let i=0; i<monthsObj.m31; i++) allMonthsArray.push(31);
  for (let i=0; i<4; i++) allMonthsArray.push(31);
  
  let t0 = performance.now();
  let possibles = generatePossibles(allMonthsArray);
  let t1 = performance.now();
  console.log('n= ' + allMonthsArray.length + ' ms= ' + (t1-t0) + ' Ngen= ' + possibles.length);

  const obj = {};
  const scoreCounts = [0,0,0, 0,0,0, 0,0,0, 0,0,0];
  obj.bestScore = 13;
  obj.worstScore = -1;
  for (let i=0; i<possibles.length; i++) {
    const aPossible = possibles[i];
    const aScore = quarterCount_92(aPossible);
    scoreCounts[aScore]++;
    if (aScore < obj.bestScore) {
      obj.bestScore = aScore;
      obj.bestScoreExample = aPossible;
    }
    if (aScore > obj.worstScore) {
      obj.worstScore = aScore;
      obj.worstScoreExample = aPossible;
    }
  }
  
  obj.scoreCounts = scoreCounts;
  return obj;
}

export function getUniqueMonths(allMonthsArray) {
  let uniqueMonthsArray = [];
  for (let i=0; i<allMonthsArray.length; i++) {
    const m = allMonthsArray[i];
    if (uniqueMonthsArray.indexOf(m) === -1) uniqueMonthsArray.push(m);
  }
  return uniqueMonthsArray;
}

// when finally reach end of recursion, should return an array of arrays
// after first recursive return, we have allMonthsArray=[30,28] and i points to 28, which we just did
export function generatePossibles(allMonthsArray) {
  // const uniq = getUniqueMonths(allMonthsArray);
  // const ulen = uniq.length;
  let possibles = [];
  let len = allMonthsArray.length;
  if (len === 1) { // ulen
    possibles = [allMonthsArray.slice(0)];
  } else {
    for (let i=0; i<allMonthsArray.length; i++) {
      let m0 = allMonthsArray[i];
      let prefix = [m0];
      
      // make copy, take out the prefix element
      let adjArray = allMonthsArray.slice(0);
      adjArray.splice(i, 1);
      
      let suffixes = generatePossibles(adjArray);
      for (let j=0; j<suffixes.length; j++) {
        let suffix = suffixes[j];
        let aPossible = prefix.concat(suffix);
        if (!contains(possibles, aPossible)) 
          possibles.push(aPossible);
      }
    }
  }
  
  return possibles;
}

function contains(arr, elem) {
  const elemStr = JSON.stringify(elem);
  for (let i=0; i<arr.length; i++) {
    let existing = arr[i];
    if (JSON.stringify(existing)==elemStr)
      return true;
  }
  return false;
}

function quarterCount_92(mArray) {
  let len = mArray.length;
  let count_92 = 0;
  for (let i=0; i<mArray.length; i++) {
    let j = (i+1);
    if (j >= len) j -= len;
    let k = (i+2);
    if (k >= len) k -= len;
    const tot = mArray[i] + mArray[j] + mArray[k];
    if (tot === 92) count_92++;
  }
  return count_92;
}

