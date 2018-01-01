function factorial(number) {
  var total = 1;
  var len = number;

  while (1 <= len) {
    total *= len;

    len--;
  }

  return total;
}
