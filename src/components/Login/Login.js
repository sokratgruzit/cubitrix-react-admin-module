import { useDispatch, useSelector } from "react-redux";

import axios from "../../api/axios";

import { Signin } from "@cubitrix/cubitrix-react-ui-module";
import { useState } from "react";

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (currentUser) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    try {
      const { data } = await axios.post("/api/auth/login ", currentUser);    
      const { userId } = data;
      dispatch({
        type: "LOGIN",
        payload: { userId }
      });
    } catch (err) {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
      setLoginError(err.response.data.message);
      setTimeout(() => setLoginError(''), 1500);
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