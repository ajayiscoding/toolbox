/*
*
* Given the triangle of consecutive odd numbers:
*
*            1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29
...

Calculate the row sums of this triangle from the row index (starting at index 1) e.g.:

rowSumOddNumbers(1); // 1
rowSumOddNumbers(2); // 3 + 5 = 8
*
* */

function rowSumOddNumbers(n) {
  var rowCurrent = 1;
  var rowTarget = n;
  var rowOddNumbers = [];
  var i = 1;

  function isOdd(n) {
    return n % 2 !== 0;
  }

  while(rowCurrent <= rowTarget) {
    if (isOdd(i)) {
      rowOddNumbers.push(i);
    }

    i += 1;

    if (rowOddNumbers.length === rowCurrent) {
      if (rowCurrent < rowTarget) {
        rowOddNumbers.length = 0;
        rowCurrent += 1;
      }
      else {
        return rowOddNumbers.reduce(function (acc, n) {
          return acc + n;
        }, 0);
      }
    }
  }
}
