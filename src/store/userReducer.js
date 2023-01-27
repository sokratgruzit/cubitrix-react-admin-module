const INIT_STATE = {
    loading: false,
    userId: null,
    errorMessage: null
};
  
const userReducer = (state = INIT_STATE, { type, payload }) => {
    if (type === 'SET_LOADING') {
        return { ...state, loading: true, errorMessage: null }
    }

    if (type === "LOGIN") {
        return { ...state, userId: payload.userId, loading: false };
    }

    if (type === "LOGIN_ERROR") {
        return { ...state, ...INIT_STATE, errorMessage: payload.errorMessage };
    }

    if (type === "LOGOUT") {
        return { ...INIT_STATE };
    }

    return state;
};

export default userReducer;
  