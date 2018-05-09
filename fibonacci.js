// fibonacci(5) => [0 1 1 2 5]
const fibonacci = (n) => {
  const r = [];
  let i = 0;
  const nextN = (i, ta) => {
    if (i === 0) {
      return 0;
    }
    else if (i === 1) {
      return 1
    }
    else {
      return ta[i - 1] + ta[i - 2];
    }
  };

  while(i < n) {
    r.push(nextN(i++, r));
  }

  return r;
};
