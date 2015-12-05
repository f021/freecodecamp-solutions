function truncate(str, num) {
  // Clear out that junk in your trunk
  return
    str.length > num
      ? str.slice(0, num > 3 ? num - 3 : num) + '...'
      : str;
}

truncate("A-tisket a-tasket A green and yellow basket", 11);
