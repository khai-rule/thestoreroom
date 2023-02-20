import { Action } from "../utilities/interface";

const initialState = {
    loading: true,
    data: {},
    error: null,
  };

const contentfulReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'FETCH_CONTENTFUL_DATA':
          return {
            ...state,
            data: {
              ...state.data,
              [action.payload.api]: action.payload.data.items,
            },
            loading: false,
            error: null,
          };
        case 'SET_CONTENTFUL_DATA_LOADING':
          return {
            ...state,
            loading: true,
          };
        case 'SET_CONTENTFUL_DATA_ERROR':
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        default:
          return state;
      }
  };
  
  export default contentfulReducer;
  