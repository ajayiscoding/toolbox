/* Create a function named divisors/Divisors that takes an integer and returns an array with all of the integer's divisors(except for 1 and the number itself). If the number is prime return the string  */
function divisors(integer) {
  const divisors = [];
  let i = 2;

  while(i < integer) {
    if(integer % i === 0) {
      divisors.push(i);
    }
    i += 1;
  }

  return divisors.length ? divisors : integer + ' is prime';
}
