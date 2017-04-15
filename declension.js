// Склонение русских слов, в зависимости от числа
// * @param number <Number>
// * @param variants <String> 'именительный падеж|родительный падеж|множ число'
// * @return <String>
// * @example
// * declension(2, 'балл|балла|баллов')
// * returns 'балла'
function declension(number, variants) {
  variants = variants.split('|');
  var n = Math.abs(number);
  var i = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);

  return variants[i];
};