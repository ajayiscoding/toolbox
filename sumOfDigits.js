/* sumOfDigits(50, 51) => 11 */
function sumOfDigits(from,to) {
  //coding here...
  const fillRange = (from, to) => {
    const rangeArray = [];

    for (let i = from; i <= to; i += 1) {
      rangeArray.push(i);
    }
    return rangeArray;
  };

  const rangeArray = fillRange(from, to);

  return rangeArray.reduce((previousValue, currentValue) => {
    if (currentValue > 9) {
    return previousValue + currentValue.toString().split('').reduce((last, current) => {
      return parseInt(last, 10) + parseInt(current, 10);
  }, 0);
  }
else {
    return previousValue + currentValue;
  }
},0);
}
