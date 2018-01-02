function isOpenBracket(char) {
  return /[\{\[\(]/.test(char);
}

function isClosedBracket(char) {
  return /[\]\)\}]/.test(char)
}

function getOppositeBracket(k) {
  var brackets = {
    '{': '}',
    '[': ']',
    '(': ')',
    ']': '[',
    '}': '{',
    ')': '('
  };

  return brackets[k];
}

/* {{{{} */
function parseBrackets(str) {
  var openBracketsPosition = [];
  var l = str.length;
  var i = 0;
  var openedCount = 0;
  var closedCount = 0;

  while (i < l) {
    var char = str[i];

    if (isOpenBracket(char)) {
      openBracketsPosition.push(i);
      openedCount++;
    }
    else if (isClosedBracket(char)) {
      var lastPosition  = openBracketsPosition.pop();
      closedCount++;

      /* нет элемента */
      if (lastPosition === undefined) {
        throw new Error('No open brackets for ' + char);
      }
      /* [, {, ( */
      var lastOpenBracket = str[lastPosition];

      if (getOppositeBracket(lastOpenBracket) !== char) {
        throw new Error('Wrong bracket ' + char + ' for ' + lastOpenBracket + ' position: ' + lastPosition);
      }
    }

    i += 1;
  }

  if (openedCount !== closedCount) {
    throw new Error('Not equal opened and closed brackets: ' + ' opened: ' + openedCount + ' closed: ' + closedCount);
  }

  console.log('Valid brackets string');
}
