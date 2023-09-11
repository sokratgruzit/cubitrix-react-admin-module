import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../../hooks/useAxios";

import { Switches, Input, Button } from "@cubitrix/cubitrix-react-ui-module";

import { ToastContainer, toast } from "react-toastify";

import { setDevelopersApi } from "../../../store/settingsReducer";

import styles from "./GlobalSettings.module.css";

const GlobalSettings = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const developersApi = useSelector((state) => state.settings.developersApi);

  const [devApi, setDevApi] = useState(developersApi);
  const [fixedPrice, setFixedPrice] = useState(null);
  const [fixedPriceLoading, setFixedPriceLoading] = useState(false);

  const [rates, setRates] = useState(null);

  useEffect(() => {
    if (rates?.atr) {
      setFixedPrice(rates.atr.usd);
    }
  }, [rates]);

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

  async function handleFixedPrice() {
    setFixedPriceLoading(true);
    await axios
      .post("/api/data/edit-atar-price", {
        price: Number(fixedPrice),
      })
      .then((res) => {
        setFixedPriceLoading(false);
        notify("Atar fixed price Updated");
      })
      .catch((error) => {
        setFixedPriceLoading(false);
        notify(error?.response?.data?.message ?? "Something went wrong");
      });
  }

  useEffect(() => {
    setDevApi(developersApi);
  }, [developersApi]);

  useEffect(() => {
    const fecthRates = async () => {
      axios
        .get("/api/accounts/get_rates")
        .then((res) => {
          setRates(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fecthRates();
  }, []);

  // cheterebo tashi tashi igrokeba shegcat trakshi :D :D :D

  return (
    <div className={styles.container}>
      <h1>Global Settings</h1>
      <div className={styles.inner}>
        <div className={styles.item}>
          <p>Developers API Controller</p>
          <Switches type={"bg-switches"} value={devApi} onChange={handleSwitchChange} />
        </div>
        <div className={`${styles.item} ${styles.column}`}>
          <p>Atar Fixed Price Controller</p>
          <Input
            type={"default"}
            emptyFieldErr={false}
            placeholder={"set fixed price"}
            editable={true}
            value={fixedPrice}
            onChange={(i) => {
              setFixedPrice(i.target.value);
            }}
            statusCard={""}
          />
          <Button
            label={fixedPriceLoading ? "Loading..." : "Submit"}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            onClick={handleFixedPrice}
            disabled={fixedPriceLoading}
          />
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default GlobalSettings;
