export const FETCH_GLOBALS = 'FETCH_GLOBALS';

export const fetchGlobals = async () => {
  const response = await fetch('http://localhost:3500/api/globals');
  const globals = await response.json();
  return {
    type: FETCH_GLOBALS,
    payload: { globals }
  };
};
