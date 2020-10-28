import { cleanDeleted } from 'react/redux/actions/conceptsActions';
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

const updateRatesAction = () => ({
  type: UPDATE_RATES
});

export const updateRate = type => {
  return (dispatch, getState) => {
    const { concepts } = getState();
    let rate = {};

    Object.keys(concepts).forEach(concept => {
      if (concepts[concept].type === type)
        rate = { ...concept, deleted: concepts.deleted };
    });

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
          body: JSON.stringify({ rate }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // const fetch = await fetch(url, config);
        // const res = await fetch.json();

        const res = await new Promise(resolve => {
          setTimeout(() => {
            resolve({ status: 'ok' });
            console.log('promise');
          }, 3000);
        });

        console.log('afuera');

        if (res.status === 'ok') {
          dispatch(updateRatesAction());
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
        } else if (res.err.errno === 1062) {
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
