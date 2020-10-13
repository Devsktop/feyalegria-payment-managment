/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
export const shortNumber = value => {
  if (value < 100000) return value;

  const suffixes = ['M', 'K'];
  let suffixNum = 0;
  let shortValue = 0;
  const number = parseInt(value, 10);

  // Millon prefix
  if (number.toString().length > 6) {
    shortValue = number / 1000000;
    suffixNum = 0;

    // Thousand prefix starting at 100k
  } else if (number.toString().length > 5) {
    shortValue = number / 1000;
    suffixNum = 1;
  }
  return parseInt(shortValue, 10) + suffixes[suffixNum];
};
