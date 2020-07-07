import * as days from '../../src/days.js';
let getUniqueMonths = days.getUniqueMonths;

let expect = chai.expect;

suite('Testing test_days.js', function() {
  
  suite('Testing getUniqueMonthsArray', function() {
    var getUniqueMonthsArray = [
      {arr:[30, 30, 29], result: [30, 29]},
    ];
    getUniqueMonthsArray.forEach(function(aTest) {
      aTest.testName = aTest.arr + ' -> ' + aTest.result;
    });
    getUniqueMonthsArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        var uniqueMonthsArray = getUniqueMonths(aTest.arr);
        expect(uniqueMonthsArray).to.deep.equal(aTest.result);
      });
    });
  });
  
});

// suite('Testing generatePossibles', function() {
//   var areSomePeriodVarsMissingArray = [
//     {arr:[30], len: 1, result: false},
//   ];
//   areSomePeriodVarsMissingArray.forEach(function(aTest) {
//     aTest.testName = aTest.vars + ' -> ' + aTest.result;
//   });
//   areSomePeriodVarsMissingArray.forEach(function(aTest) {
//     test(aTest.testName, function() {
//       var someAreMissing = page.areSomePeriodVarsMissing(aTest.multi, aTest.vars);
//       expect(someAreMissing).to.equal(aTest.result);
//     });
//   });
// });
