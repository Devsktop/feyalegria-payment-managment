import {
  cleanDeleted,
  updateConcepts
} from 'react/redux/actions/conceptsActions';
import Swal from 'sweetalert2';

export const FETCH_RATES = 'FETCH_RATES';

export const fetchRates = async () => {
  const response = await fetch('http://localhost:3500/api/rates');
  const rates = await response.json();
  return {
    type: FETCH_RATES,
    payload: rates
  };
};

// Save concepts in db and change original concepts.
export const UPDATE_RATES = 'UPDATE_RATES';

const updateRateAction = rate => ({
  type: UPDATE_RATES,
  payload: { rate }
});

export const updateRate = type => {
  return (dispatch, getState) => {
    const { concepts } = getState();
    let rawRate = {};

    Object.keys(concepts).forEach(concept => {
      if (concepts[concept].type === type) rawRate = { ...concepts[concept] };
    });

    const { deleted } = concepts;
    const rate = parseRate(rawRate);

    Swal.fire({
      title: 'Estableciendo conceptos de pago',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: async () => {
        Swal.showLoading();

        const url = 'http://localhost:3500/api/updateRate';
        const config = {
          method: 'POST',
          body: JSON.stringify({ rate, deleted }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const fetchRes = await fetch(url, config);
        const res = await fetchRes.json();

        console.log(res);
        if (res.status === 200) {
          console.log(res);
          dispatch(updateRateAction(res.rate));
          dispatch(updateConcepts(res.rate));
          dispatch(cleanDeleted());
          Swal.hideLoading();
          Swal.fire({
            title: 'El producto se ha modificado con éxito',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
              icon: 'icon-class',
              title: 'title-class'
            }
          });
        } else if (res.status === 1062) {
          // if product's  name is already used
          Swal.hideLoading();
          Swal.fire({
            title: 'Ya existe un producto con ese nombre',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
              icon: 'icon-class',
              title: 'title-class'
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

const parseRate = rate => {
  const parsedPrice = parseFloat(rate.price);

  const concepts = { ...rate.paymentConcepts };

  Object.keys(concepts).forEach(concept => {
    concepts[concept].conceptPrice = parseFloat(concepts[concept].conceptPrice);
  });

  const parsedRate = {
    ...rate,
    price: parsedPrice,
    paymentConcepts: { ...concepts }
  };
  console.log(parsedRate);
  return parsedRate;
};
