import { GET_BY_NAME, GET_DOGS, SET_SORT_ORDER } from "../actions";

let initialState = {
  allDogs: [],
  filteredDogs: [],
  sortOrder: 'asc', // Puedes establecer el orden inicial aquí
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        filteredDogs: action.payload,
      };
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
