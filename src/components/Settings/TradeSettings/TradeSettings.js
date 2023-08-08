import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Switches, Input, HelpText, Button } from "@cubitrix/cubitrix-react-ui-module";

import { ToastContainer, toast } from "react-toastify";

// import { setDevelopersApi } from "../../../store/settingsReducer";

import styles from "./TradeSettings.module.css";

const TradeSettings = () => {
  // const dispatch = useDispatch();
  const developersApi = useSelector((state) => state.settings.developersApi);

  // const [devApi, setDevApi] = useState(developersApi);

  const notify = (msg) => {
    toast(msg);
  };

  const handleSwitchChange = (e) => {
    // const value = e.target.checked;
    // setDevApi(value);
    // dispatch(setDevelopersApi(value));
    // if (devApi) {
    // notify("Developers Api Disabled");
    // } else {
    // notify("Developers Api Enabled");
    // }
  };

  return (
    <div className={styles.container}>
      <h1>Trade Settings</h1>
      <div className={styles.inner}>
        <div className={styles.item}>
          <p>Cross margin x</p>
          {/* <Switches type={"bg-switches"} value={devApi} onChange={handleSwitchChange} /> */}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};
export default TradeSettings;
