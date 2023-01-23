const INIT_STATE = {
  transactions: 100
};

const transactionsReducer = (state = INIT_STATE, action) => {
  if (action.type === "SET_TRX") {
    return { ...state, ...action.payload };
  }

  return state;
};

export default transactionsReducer;
