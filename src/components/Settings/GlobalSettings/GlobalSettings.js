import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Switches,
  Input,
  Button
} from "@cubitrix/cubitrix-react-ui-module";

import { ToastContainer, toast } from "react-toastify";

import { setDevelopersApi } from '../../../store/settingsReducer';

import styles from "./GlobalSettings.module.css";

const GlobalSettings = () => {
  const dispatch = useDispatch();
  const developersApi = useSelector(state => state.settings.developersApi);

  const [devApi, setDevApi] = useState(developersApi);
  const [fixedPrice, setFixedPrice] = useState(null);

  const notify = (msg) => {
    toast(msg);
  };

  const handleSwitchChange = (e) => {
    const value = e.target.checked;
    setDevApi(value);
    dispatch(setDevelopersApi(value));
    if (devApi) {
      notify("Developers Api Disabled");
    } else {
      notify("Developers Api Enabled");
    }
  };

  const handleFixedPrice = () => {
    if(fixedPrice) {
      console.log(fixedPrice);
      notify("Fixed Price Set");
    } else {
      notify("Fixed Price Not Set");
    }
  };

  useEffect(() => {
    setDevApi(developersApi);
    setFixedPrice(null);
  }, [developersApi]);

  // cheterebo tashi tashi igrokeba shegcat trakshi :D :D :D

  return (
    <div className={styles.container}>
      <h1>Global Settings</h1>
      <div className={styles.inner}>
        <div className={styles.item}>
          <p>Developers API Controller</p>
          <Switches
            type={"bg-switches"}
            value={devApi}
            onChange={handleSwitchChange}
          />
        </div>
        <div className={`${styles.item} ${styles.column}`}>
          <p>Atar Fixed Price Controller</p>
          <Input
            type={"default"}
            emptyFieldErr={false}
            placeholder={"set fixed price"}
            editable={true}
            value={fixedPrice}
            onChange={(i) => {setFixedPrice(i.target.value)}}
            statusCard={""}
          />
          <Button
            label={"Submit"}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            onClick={handleFixedPrice}
            // customStyles={{ width: '100%' }}
          />
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default GlobalSettings;
