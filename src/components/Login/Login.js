import { useDispatch, useSelector } from "react-redux";

import axios from "../../api/axios";

import { Signin } from "@cubitrix/cubitrix-react-ui-module";

const Login = () => {
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();

  const handleSubmit = async (currentUser) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const { data } = await axios.post("/api/auth/login ", currentUser);    
      const { userId } = data;
      dispatch({
        type: "LOGIN",
        payload: { userId }
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorMessage: err.response.data.message }
      });
    };
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ): (
        <Signin handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Login;