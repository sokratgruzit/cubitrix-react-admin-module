const INIT_STATE = {
    loading: false,
    userId: null,
    errorMessage: null
};
  
const userReducer = (state = INIT_STATE, { type, payload }) => {
    if (type === 'LOGIN_START') {
        return { ...state, loading: true, errorMessage: null }
    }

    if (type === "LOGIN") {
        return { ...state, userId: payload.userId, loading: false };
    }

    if (type === "LOGIN_ERROR") {
        return { ...state, ...INIT_STATE, errorMessage: payload.errorMessage };
    }

    return state;
};

export default userReducer;
  