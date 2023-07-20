const INIT_STATE = {
  loading: false,
  userId: null,
  sideBarActive: false
};

const userReducer = (state = INIT_STATE, { type, payload }) => {
  if (type === "SET_LOADING") {
    return { ...state, userId: null, loading: payload.loading };
  }

  if (type === "LOGIN") {
    return { ...state, userId: payload.userId, loading: false, token: payload.token };
  }

  if (type === "LOGOUT") {
    return { ...INIT_STATE };
  }

  if (type === "SIDEBAR") {
    return {...state, sideBarActive: true}
  }

  return state;
};

export default userReducer;
