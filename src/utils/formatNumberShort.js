function formatNumberShort(num) {
  const absNum = Math.abs(Number(num));
  let sign = '';
  if (num < 0) {
    sign = '-';
  }

  if (absNum >= 1000000000) {
    return sign + (absNum / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (absNum >= 1000000) {
    return sign + (absNum / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (absNum >= 1000) {
    return sign + (absNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return num.toString();
}

export default formatNumberShort;
