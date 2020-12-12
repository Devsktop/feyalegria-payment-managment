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

export const decimalValidator = (
  e,
  value,
  maxNumber = 999999999999999999,
  minNumber = 0
) => {
  const parsedValue = value.toString();

  if (e.target.value.length > 18 && e.keyCode !== 8) return e.target.value;
  const reg = /\d/;
  if (reg.test(e.key)) {
    if (
      // 10 is second paramater for radix rule
      parseFloat(e.target.value + e.key, 10) <= maxNumber &&
      parseFloat(e.target.value + e.key, 10) >= minNumber
    )
      return e.target.value + e.key;

    if (e.target.value.endsWith('.')) return e.target.value + e.key;
  } else if (e.keyCode === 8) {
    // KeyCode 8 = Delete button

    return parsedValue.substr(0, parsedValue.length - 1);
  } else if (e.keyCode === 190) {
    if (e.target.value.length === 0) return '0' + e.key;
    if (!e.target.value.includes('.')) return e.target.value + e.key;
  }
  return e.target.value;
};

export const intValidator = (
  e,
  value,
  maxNumber = 999999999999999999,
  minNumber = 0
) => {
  const parsedValue = value.toString();
  if (e.target.value.length > 18 && e.keyCode !== 8) return e.target.value;
  const reg = /\d/;
  if (reg.test(e.key)) {
    if (
      // 10 is second paramater for radix rule
      parseInt(e.target.value + e.key, 10) <= maxNumber &&
      parseInt(e.target.value + e.key, 10) >= minNumber
    )
      return e.target.value + e.key;
  } else if (e.keyCode === 8) {
    // KeyCode 8 = Delete button
    return parsedValue.substr(0, parsedValue.length - 1);
  }

  return e.target.value;
};

export const intStringValidator = (e, value) => {
  const parsedValue = value.toString();
  const reg = /\d/;
  if (reg.test(e.key)) {
    return e.target.value + e.key;
  }
  if (e.keyCode === 8) {
    // KeyCode 8 = Delete button
    return parsedValue.substr(0, parsedValue.length - 1);
  }

  return e.target.value;
};
