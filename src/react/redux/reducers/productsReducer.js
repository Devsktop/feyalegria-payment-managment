import {
  FETCH_PRODUCTS,
  IS_FETCHING,
  IS_FETCHED,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT
} from '../actions/productsActions';

const initialState = {
  products: {},
  isFetched: false,
  isFetching: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        ...payload
      };

    case IS_FETCHING:
      return {
        ...state,
        isFetching: payload
      };

    case IS_FETCHED:
      return {
        ...state,
        isFetched: true
      };

    case DELETE_PRODUCT: {
      const products = { ...state.products };
      delete products[payload.id];
      return {
        ...state,
        products
      };
    }

    case CREATE_PRODUCT: {
      const { idProduct } = payload.product;
      const product = { ...payload.product, idProduct };
      const products = { ...state.products, [idProduct]: product };
      return {
        ...state,
        products
      };
    }

    case EDIT_PRODUCT: {
      const { product } = payload;
      const products = { ...state.products, [product.idProduct]: product };

      return {
        ...state,
        products
      };
    }

    default:
      return state;
  }
}
