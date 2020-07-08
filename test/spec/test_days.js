import * as days from '../../src/days.js';
// let getUniqueMonths = days.getUniqueMonths;

let expect = chai.expect;

suite('Testing test_days.js', function() {
  
  suite('Testing getUniqueMonthsArray', function() {
    var getUniqueMonthsArray = [
      {arr:[], result: []},
      {arr:['a'], result: ['a']},
      {arr:[30, 30, 29], result: [30, 29]},
      {arr:[29, 30, 30, 29], result: [29, 30]},
    ];
    getUniqueMonthsArray.forEach(function(aTest) {
      aTest.testName = aTest.arr + ' -> ' + aTest.result;
    });
    getUniqueMonthsArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        var uniqueMonthsArray = days.getUniqueMonths(aTest.arr);
        expect(uniqueMonthsArray).to.deep.equal(aTest.result);
      });
    });
  });

  suite('Testing generatePossibles', function() {
    var areSomePeriodVarsMissingArray = [
      {arr:[], len: 0, result: []},
      {arr:['a'], len: 1, result: [ ['a'] ]},
      {arr:['a','b'], len: 2, result: [ ['a','b'],['b','a'] ]},
      {arr:['a','b','c'], len: 6, result: [ ['a','b','c'],['a','c','b'],['b','a','c'],['b','c','a'],['c','a','b'],['c','b','a'] ]},
      {arr:['a','b','c','d'], len: 24, result: [
        ['a','b','c','d'],['a','b','d','c'],['a','c','b','d'],['a','c','d','b'],['a','d','b','c'],['a','d','c','b'],
        ['b','a','c','d'],['b','a','d','c'],['b','c','a','d'],['b','c','d','a'],['b','d','a','c'],['b','d','c','a'],
        ['c','a','b','d'],['c','a','d','b'],['c','b','a','d'],['c','b','d','a'],['c','d','a','b'],['c','d','b','a'],
        ['d','a','b','c'],['d','a','c','b'],['d','b','a','c'],['d','b','c','a'],['d','c','a','b'],['d','c','b','a'],
      ]},
      
      {arr:['a','a'], len: 1, result: [ ['a','a'] ]},
      {arr:['a','a','b'], len: 3, result: [ ['a','a','b'],['a','b','a'],['b','a','a'] ]},
      {arr:['a','a','a','b'], len: 4, result: [ ['a','a','a','b'],['a','a','b','a'],['a','b','a','a'],['b','a','a','a'] ]},

      {arr:['a','b','c','a'], len: 12, result: [
        ['a','b','c','a'],['a','b','a','c'],['a','c','b','a'],['a','c','a','b'],['a','a','b','c'],['a','a','c','b'],
        ['b','a','c','a'],['b','a','a','c'],['b','c','a','a'],
        ['c','a','b','a'],['c','a','a','b'],['c','b','a','a'],
      ]},
      {arr:['a','a','b','b'], len: 6, result: [
        ['a','a','b','b'],['a','b','a','b'],['a','b','b','a'],
        ['b','a','a','b'],['b','a','b','a'],['b','b','a','a'],
      ]},
    ];
    areSomePeriodVarsMissingArray.forEach(function(aTest) {
      const str = '[...] of length ' + aTest.len;
      aTest.testName = aTest.arr + ' -> ' + str;
    });
    areSomePeriodVarsMissingArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        var result = days.generatePossibles(aTest.arr);
        expect(result.length).to.equal(aTest.len);
        if (aTest.result) {
          const l = Math.min(aTest.result.length, result.length);
          for (let i=0; i<l; i++) {
            const actual = result[i];
            const expected = aTest.result[i];
            expect(actual).to.deep.equal(expected);
          }
        }
      });
    });
  });
  
});

