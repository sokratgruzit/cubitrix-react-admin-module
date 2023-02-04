import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";

import { Signin } from "@cubitrix/cubitrix-react-ui-module";
import { useState } from "react";

const Login = () => {
  const axios = useAxios();
  const [loginError, setLoginError] = useState('');
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (currentUser) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    try {
      const { data } = await axios.post("/api/auth/login ", currentUser);    
      const { userId, token } = data;
      dispatch({
        type: "LOGIN",
        payload: { userId, token }
      });
    } catch (err) {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
      setLoginError(err.response.data.message);
      setTimeout(() => setLoginError(''), 5000);
    };
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ): (
        <Signin handleSubmit={handleSubmit} loginError={loginError} />
      )}
    </>
  );
};

export default Login;