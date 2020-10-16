export const FETCH_RATES = 'FETCH_RATES';

export const fetchRates = async () => {
  const response = await fetch('http://localhost:3500/api/rates');
  const rates = await response.json();
  return {
    type: FETCH_RATES,
    payload: rates
  };
};
