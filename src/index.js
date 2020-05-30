(function() {
  'use strict';
  
  // process( [28,30,30,30,30], false )
  function process(non31array, isLeapYear) {
    const totalDaysNeeded = (isLeapYear) ? 366 : 365;
    let m28 = 0, m29 = 0, m30 = 0, totalDays=0;
    for (let i=0; i<non31array.length; i++) {
      let aMonth = non31array[i];
      if (aMonth === 28) {
        m28++;
      } else if (aMonth === 29) {
        m29++;
      } else if (aMonth === 30) {
        m30++;
      }
      totalDays += aMonth;
    }
    let excessDays = totalDays - 30*non31array.length;
    if (excessDays !== totalDaysNeeded - 360) {
      console.log('oops, error: excess days= ' + excessDays + ' should be ' + (totalDaysNeeded - 360));
    }

    let m31 = 12 - non31array.length;
    let categories = {m30:m30, m31:m31};
    if (m28) categories.m28 = m28;
    if (m29) categories.m29 = m29;
    
    let possibles = generatePossibles(categories);
    
    const scoreMap = {};
    let bestScore = 13;
    let bestScoreExample;
    for (let i=0; i<possibles.length; i++) {
      const aPossible = possibles[i];
      const aScore = quarterCount_92(aPossible);
      if (aScore < bestScore) {
        bestScore = aScore;
        bestScoreExample = aPossible;
      }
    }
    
  }
  
  function generatePossibles(categories) {
    let possibles = [];
    
    return possibles;
  }
  
  function quarterCount_92(mArray) {
    let count_92 = 0;
    for (let i=0; i<mArray.length; i++) {
      let j = (i+1);
      if (j >= 12) j -= 12;
      let k = (i+2);
      if (k >= 12) k -= 12;
      const tot = mArray[i] + mArray[j] + mArray[k];
      if (tot === 92) count_92++;
    }
    return count_92;
  }
  
}());