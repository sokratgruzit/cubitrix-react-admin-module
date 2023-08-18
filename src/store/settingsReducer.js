const SET_DEVELOPERS_API = 'SET_DEVELOPERS_API';

export const setDevelopersApi = (value) => {
  return {
    type: SET_DEVELOPERS_API,
    payload: value
  };
};

const initialState = {
  developersApi: true
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVELOPERS_API:
      return {
        ...state,
        developersApi: action.payload
      };
    default:
      return state;
  }
};

export default settingsReducer;
