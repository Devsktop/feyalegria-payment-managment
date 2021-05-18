import Swal from 'sweetalert2';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch('http://localhost:3500/api/products');
    console.log(response);
    const products = await response.json();
    console.log(products);
    dispatch(fetchProductsActions(products));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchProductsActions = products => ({
  type: FETCH_PRODUCTS,
  payload: { products }
});

export const IS_FETCHING = 'IS_FETCHING';

// fetching: boolean
const isFetching = fetching => ({
  type: IS_FETCHING,
  payload: fetching
});

export const IS_FETCHED = 'IS_FETCHED';

// fetched: boolean
const isFetched = () => ({
  type: IS_FETCHED
});

// Action To Delete Product
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function deleteProduct(id) {
  return dispatch => {
    Swal.fire({
      title: '¿Seguro que desea eliminar este Producto?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      customClass: {
        icon: 'icon-class',
        title: 'title-class',
        content: 'content-class'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        Swal.getCancelButton().style.display = 'none';
        const url = 'http://localhost:3500/api/product';
        const config = {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config).then(res => res.json());
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        dispatch(deleteProductAction(id));
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado satisfactoriamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            icon: 'icon-class',
            title: 'title-class',
            content: 'content-class'
          }
        });
      }
    });
  };
}

const deleteProductAction = id => ({
  type: DELETE_PRODUCT,
  payload: { id }
});

export const CREATE_PRODUCT = 'CREATE_PRODUCT';

const createProductAction = product => ({
  type: CREATE_PRODUCT,
  payload: { product }
});

export const createProduct = (product, history) => {
  return dispatch => {
    Swal.fire({
      title: 'Creando producto',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();

        const { productName, price, mandatory } = product;
        const url = 'http://localhost:3500/api/product';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            productName,
            price,
            mandatory
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              dispatch(createProductAction(res.product));
              Swal.hideLoading();
              Swal.fire({
                title: 'El producto se ha registrado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                },
                preConfirm: () => {
                  history.goBack();
                }
              });
            } else if (res.errAddProduct === 1062) {
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
          })
          .catch(err => {
            console.log(err);
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const EDIT_PRODUCT = 'EDIT_PRODUCT';

const editProductAction = product => ({
  type: EDIT_PRODUCT,
  payload: { product }
});

export const editProduct = (product, history) => {
  return dispatch => {
    Swal.fire({
      title: 'Modificando producto',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const { idProduct, productName, price, mandatory } = product;
        const url = 'http://localhost:3500/api/updProduct';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            idProduct,
            productName,
            price,
            mandatory
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              dispatch(editProductAction(product));
              Swal.hideLoading();
              Swal.fire({
                title: 'El producto se ha modificado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                },
                preConfirm: () => {
                  history.goBack();
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
          })
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};
