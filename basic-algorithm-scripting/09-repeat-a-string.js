function repeat(str, num) {
  // repeat after me
  return num > 0 ? str + repeat(str, num - 1) : "";
}

repeat("abc", 3);