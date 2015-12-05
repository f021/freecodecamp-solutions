function factorialize(num) {
  return num > 0 ? num * factorialize(num - 1) : 1;
}

factorialize(5);