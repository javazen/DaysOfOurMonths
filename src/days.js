// process( [28,30,30,30,30], false )
export function process(non31array, isLeapYear) {
  const totalDaysNeeded = isLeapYear ? 366 : 365;
  let m31 = 12 - non31array.length,
    totalDays = 0;
  for (let i = 0; i < non31array.length; i++) {
    let aMonth = non31array[i];
    totalDays += aMonth;
  }
  totalDays += 31 * m31;
  if (totalDays !== totalDaysNeeded) {
    console.log(
      "oops, error: total days= " + totalDays + " should be " + totalDaysNeeded
    );
  }

  let allMonthsArray = non31array.slice(0);
  for (let i = 0; i < 12 - non31array.length; i++) allMonthsArray.push(31);

  // let t0 = performance.now();
  let possibles = generatePossibles(allMonthsArray);
  // let t1 = performance.now();
  // console.log('n= ' + allMonthsArray.length + ' ms= ' + (t1-t0) + ' Ngen= ' + possibles.length);

  const obj = {};
  const scoreCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  obj.lowScore = 13;
  obj.highScore = -1;
  for (let i = 0; i < possibles.length; i++) {
    const aPossible = possibles[i];
    const aScore = quarterCount_92(aPossible);
    scoreCounts[aScore]++;
    if (aScore < obj.lowScore) {
      obj.lowScore = aScore;
      obj.lowScoreExample = aPossible;
    }
    if (aScore > obj.highScore) {
      obj.highScore = aScore;
      obj.highScoreExample = aPossible;
    }
  }

  obj.scoreCounts = scoreCounts;
  return obj;
}

export function getUniqueMonths(allMonthsArray) {
  let uniqueMonthsArray = [];
  for (let i = 0; i < allMonthsArray.length; i++) {
    const m = allMonthsArray[i];
    if (uniqueMonthsArray.indexOf(m) === -1) uniqueMonthsArray.push(m);
  }
  return uniqueMonthsArray;
}

// return an array of possible arrangement arrays
export function generatePossibles(allMonthsArray) {
  let possibles = [];
  const uniqueMonthsArray = getUniqueMonths(allMonthsArray);
  const ulen = uniqueMonthsArray.length;

  if (ulen === 1) {
    possibles = [allMonthsArray.slice(0)];
  } else if (ulen > 1) {
    for (let i = 0; i < ulen; i++) {
      let m0 = uniqueMonthsArray[i];
      let prefix = [m0];

      // make copy, take out the prefix element
      let adjArray = allMonthsArray.slice(0);
      const pos = adjArray.indexOf(m0);
      adjArray.splice(pos, 1);

      let suffixes = generatePossibles(adjArray);
      for (let j = 0; j < suffixes.length; j++) {
        let suffix = suffixes[j];
        let aPossible = prefix.concat(suffix);
        possibles.push(aPossible);
      }
    }
  }
  // if ulen === 0 return empty set

  return possibles;
}

function quarterCount_92(mArray) {
  let len = mArray.length;
  let count_92 = 0;
  for (let i = 0; i < mArray.length; i++) {
    let j = i + 1;
    if (j >= len) j -= len;
    let k = i + 2;
    if (k >= len) k -= len;
    const tot = mArray[i] + mArray[j] + mArray[k];
    if (tot === 92) count_92++;
  }
  return count_92;
}
