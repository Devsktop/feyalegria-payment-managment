export const FETCH_PAYMENTS = 'FETCH_PAYMENTS';

export const fetchPayments = async () => {
  const response = await fetch('http://localhost:3500/api/payments');
  const payments = await response.json();

  return {
    type: FETCH_PAYMENTS,
    payload: payments
  };
};
