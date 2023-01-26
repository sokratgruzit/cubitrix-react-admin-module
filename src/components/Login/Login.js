import { useState } from "react";
import axios from "../../api/axios";

import { Signin } from "@cubitrix/cubitrix-react-ui-module";

const Login = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true)
    await axios.post("/accounts/filter", {
      type: "account",
      email: "admin@admin.com",
      password: "AdminAdmin123"
    })
    .then(res => {
      console.log(res);
      setLoading(false)
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })
  }

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ): (
        <Signin handleSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default Login