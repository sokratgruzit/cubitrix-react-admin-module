import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  Switches,
  Input,
  HelpText,
  Button,
} from "@cubitrix/cubitrix-react-ui-module";

import styles from "./ReferralManagment.module.css";

const ReferralManagment = ({ animate }) => {
  const [defaultUniData, setDefaultUniData] = useState();
  const [defaultBinaryData, setDefaultBinaryData] = useState();
  const [active, setActive] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(1);
  const [binaryLevel, setBinaryLevel] = useState(1);
  const [uniData, setUniData] = useState({
    name: "Uni",
    active: false,
    level: "",
    calculated: "",
    lvlOptions: {
      maxCommision: [],
      maxCommPercentage: [],
    },
  });
  const [binaryData, setBinaryData] = useState({
    name: "Binary Bv",
    active: false,
    level: "",
    calculated: "",
    maxUsers: "",
    bv: "",
    flush_out: 0,
    options: [],
  });

  let stepper = [
    {
      title: "Uni",
      onClick: () => setStep(1),
    },
    {
      title: "Binary BV",
      onClick: () => setStep(2),
    },
    {
      title: "Binary Level System",
      onClick: () => setStep(3),
    },
  ];

  let defaultData = [
    {
      name: "Daily",
      value: "daily",
    },
    {
      name: "Weekly",
      value: "weekly",
    },
    {
      name: "Monthly",
      value: "monthly",
    },
  ];

  const selectHandlerUni = (value) => {
    setUniData((prevUniData) => ({
      ...prevUniData,
      calculated: value,
    }));
  };

  const selectHandlerBinary = (value) => {
    setBinaryData((prevBinaryData) => ({
      ...prevBinaryData,
      calculated: value,
    }));
  };

  const uniMaxCommissionChangeHandler = (index, value) => {
    setUniData((prevUniData) => {
      const updatedUniData = { ...prevUniData };
      updatedUniData.lvlOptions.maxCommision[index] =
        value === "" ? null : value;

      return updatedUniData;
    });
  };

  const uniMaxCommissionPercentageChangeHandler = (index, value) => {
    setUniData((prevUniData) => {
      const updatedUniData = { ...prevUniData };
      updatedUniData.lvlOptions.maxCommPercentage[index] =
        value === "" ? null : value;

      return updatedUniData;
    });
  };

  const saveUniDataHandler = async (req, res) => {
    let name = uniData.name;
    await axios
      .post("/api/data/edit_referral_setting", {
        name,
        uniData,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const saveBinaryDataHandler = async (req, res) => {
    let name = binaryData.name;
    await axios
      .post("/api/data/edit_referral_setting", {
        name,
        binaryData,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    const getData = async (name) => {
      axios
        .post("/api/data/get_referral_setting", { name })
        .then((response) => {
          if (response.data.key === "referral_uni_options") {
            setUniData(response.data.object_value.uniData);
          }
          if (response.data.key === "referral_binary_bv_options") {
            setBinaryData(response.data.object_value.binaryData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getData(uniData.name);
    getData(binaryData.name);
  }, []);

  const rowsHandler = (level) => {
    const newLevel = parseInt(level); // Convert level to an integer

    if (!isNaN(newLevel)) {
      setUniData((prevUniData) => {
        let { maxCommPercentage, maxCommision } = prevUniData.lvlOptions;

        maxCommPercentage = [...maxCommPercentage.slice(0, newLevel)];
        maxCommision = [...maxCommision.slice(0, newLevel)];

        // If newLevel is greater than current array length, fill the extra items with null
        while (maxCommPercentage.length < newLevel)
          maxCommPercentage.push(null);
        while (maxCommision.length < newLevel) maxCommision.push(null);

        return {
          ...prevUniData,
          lvlOptions: {
            maxCommPercentage: maxCommPercentage,
            maxCommision: maxCommision,
          },
        };
      });
    }
  };

  const binaryRowsHandler = (level) => {
    const newLevel = parseInt(level); // Convert level to an integer

    if (!isNaN(newLevel)) {
      setBinaryData((prevBinaryData) => {
        let { options } = prevBinaryData;

        // If newLevel is smaller, slice the array
        if (options.length > newLevel) {
          options = options.slice(0, newLevel);
        }
        // If newLevel is larger, fill the array with empty objects
        else {
          while (options.length < newLevel) {
            options.push(null);
          }
        }

        return {
          ...prevBinaryData,
          options: options,
        };
      });
    }
  };

  const binaryOptionChangeHandler = (index, value, field) => {
    setBinaryData((prevBinaryData) => {
      const updatedBinaryData = { ...prevBinaryData };
      const updatedOptions = [...updatedBinaryData.options];

      if (!updatedOptions[index]) {
        updatedOptions[index] = { from: null, to: null, price: null };
      }

      updatedOptions[index][field] = value === "" ? null : value;
      updatedBinaryData.options = updatedOptions;

      return updatedBinaryData;
    });
  };

  return (
    <div className={styles.table}>
      <div style={{ borderBottom: "none" }} className={styles.block}>
        <h1 className={styles.title}>Referral Management</h1>
        <Tabs
          type={"simple"}
          tabsData={stepper}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          customStyles={{ width: "100%" }}
        />
      </div>
      <div className={`${styles.steps} ${step === 1 ? styles.actived : ""}`}>
        <div className={styles.block}>
          <div className={styles.row}>
            <p>Uni</p>
            <Switches
              value={uniData?.active === undefined ? false : true}
              onChange={(e) =>
                setUniData((prevUniData) => ({
                  ...prevUniData,
                  active: e.target.checked,
                }))
              }
              type={"sm-switches"}
            />
          </div>
          <Input
            type={"lable-input-select"}
            icon={false}
            emptyFieldErr={false}
            value={uniData.calculated}
            defaultData={defaultData}
            label={"Calculated"}
            selectHandler={selectHandlerUni}
            selectLabel={"select"}
            active={active}
            status={""}
            statusCard={""}
          />
          <Input
            type={"default"}
            emptyFieldErr={false}
            inputType={"text"}
            placeholder={"1"}
            label={"uni level"}
            value={uniData.level}
            onChange={(i) => {
              setUniData((prevUniData) => ({
                ...prevUniData,
                level: i.target.value,
              }));
              rowsHandler(i.target.value);
            }}
            statusCard={""}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.col}>
            {Array.from({ length: uniData?.level ?? 0 }, (_, index) => (
              <div key={index} className={styles.row}>
                <Input
                  type={"default"}
                  emptyFieldErr={false}
                  inputType={"text"}
                  placeholder={"1"}
                  value={uniData.lvlOptions.maxCommision[index]}
                  label={`Level ${index + 1} maximum comission`}
                  onChange={(i) =>
                    uniMaxCommissionChangeHandler(index, i.target.value)
                  }
                  statusCard={""}
                />
                <Input
                  type={"default"}
                  emptyFieldErr={false}
                  inputType={"text"}
                  placeholder={"1"}
                  value={uniData.lvlOptions.maxCommPercentage[index]}
                  label={`Level ${index + 1} max comission percentage`}
                  onChange={(i) =>
                    uniMaxCommissionPercentageChangeHandler(
                      index,
                      i.target.value
                    )
                  }
                  statusCard={""}
                />
              </div>
            ))}
            <Button
              label={"save"}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              onClick={saveUniDataHandler}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.steps} ${step === 2 ? styles.actived : ""}`}>
        <div className={styles.block}>
          <div className={styles.row}>
            <p>Binary</p>
            <Switches
              value={binaryData?.active === undefined ? false : true}
              onChange={(i) =>
                setBinaryData((prevSendData) => ({
                  ...prevSendData,
                  active: i.target.checked,
                }))
              }
              type={"sm-switches"}
            />
          </div>
          <Input
            type={"lable-input-select"}
            icon={false}
            emptyFieldErr={false}
            defaultData={defaultData}
            value={binaryData.calculated}
            label={"Calculated"}
            selectHandler={selectHandlerBinary}
            selectLabel={"select"}
            active={active}
            status={""}
            statusCard={""}
          />
          <Input
            type={"default"}
            emptyFieldErr={false}
            inputType={"text"}
            value={binaryData.bv}
            placeholder={"1"}
            label={`BV`}
            onChange={(i) =>
              setBinaryData((prevSendData) => ({
                ...prevSendData,
                bv: i.target.value,
              }))
            }
            statusCard={""}
          />
          <Input
            type={"default"}
            emptyFieldErr={false}
            inputType={"text"}
            placeholder={"1"}
            value={binaryData.maxUsers}
            label={`Binary Max users`}
            onChange={(i) =>
              setBinaryData((prevSendData) => ({
                ...prevSendData,
                maxUsers: i.target.value,
              }))
            }
            statusCard={""}
          />
          <Input
            type={"default"}
            emptyFieldErr={false}
            inputType={"number"}
            placeholder={"0"}
            value={binaryData.flushed_out}
            label={`Flushed out in months`}
            onChange={(i) =>
              setBinaryData((prevSendData) => ({
                ...prevSendData,
                flushed_out: i.target.value,
              }))
            }
            statusCard={""}
          />
          <Input
            type={"default"}
            emptyFieldErr={false}
            inputType={"text"}
            placeholder={"1"}
            label={"binary level"}
            value={binaryData.level}
            onChange={(i) => {
              setBinaryData((prevBinaryData) => ({
                ...prevBinaryData,
                level: i.target.value,
              }));
              binaryRowsHandler(i.target.value);
            }}
            statusCard={""}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.col}>
            {Array.from({ length: binaryData?.level ?? 0 }, (_, index) => (
              <div key={index} className={styles.row}>
                <Input
                  type={"default"}
                  emptyFieldErr={false}
                  inputType={"text"}
                  placeholder={"1"}
                  value={binaryData.options?.[index]?.from}
                  label={`Level ${index + 1} Bv From`}
                  onChange={(i) =>
                    binaryOptionChangeHandler(index, i.target.value, "from")
                  }
                  statusCard={""}
                />
                <Input
                  type={"default"}
                  emptyFieldErr={false}
                  inputType={"text"}
                  placeholder={"1"}
                  value={binaryData.options[index]?.to}
                  label={`Level ${index + 1} Bv To`}
                  onChange={(i) =>
                    binaryOptionChangeHandler(index, i.target.value, "to")
                  }
                  statusCard={""}
                />
                <Input
                  type={"default"}
                  emptyFieldErr={false}
                  inputType={"text"}
                  placeholder={"1"}
                  value={binaryData.options[index]?.price}
                  label={`Level ${index + 1} Bvc Price`}
                  onChange={(i) =>
                    binaryOptionChangeHandler(index, i.target.value, "price")
                  }
                  statusCard={""}
                />
              </div>
            ))}
            <Button
              label={"save"}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              onClick={saveBinaryDataHandler}
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.steps} ${styles.underWorking} ${
          step === 3 ? styles.actived : ""
        }`}
      >
        <svg
          width="104"
          height="75"
          viewBox="0 0 104 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.05"
            d="M96.6042 56.7063C103.822 49.5708 107.82 22.1331 98.7751 13.4263C85.0262 0.191923 62.2753 8.0439 44.8649 1.26497C27.4545 -5.51395 -2.49661e-06 16.2878 -4.12265e-06 34.8875C-6.00351e-06 56.4021 33.2381 76.1446 52.8247 74.9483C72.4114 73.752 88.2825 64.9331 96.6042 56.7063Z"
            fill="#796AD4"
          />
          <circle cx="95" cy="6" r="2" fill="#796AD4" fillOpacity="0.6" />
          <circle cx="88" cy="67" r="2" fill="#796AD4" fillOpacity="0.4" />
          <circle
            cx="10.5"
            cy="62.5"
            r="2.5"
            fill="#796AD4"
            fillOpacity="0.4"
          />
          <circle
            cx="13.5"
            cy="18.5"
            r="1.5"
            fill="#796AD4"
            fillOpacity="0.8"
          />
          <circle cx="15" cy="57" r="1" fill="#796AD4" fillOpacity="0.6" />
          <path
            d="M66 36.25C66 39.3651 65.0763 42.4102 63.3457 45.0002C61.615 47.5903 59.1552 49.609 56.2773 50.8011C53.3993 51.9932 50.2325 52.3051 47.1773 51.6974C44.1221 51.0897 41.3158 49.5896 39.1131 47.3869C36.9104 45.1843 35.4104 42.3779 34.8026 39.3227C34.1949 36.2675 34.5068 33.1007 35.6989 30.2227C36.891 27.3448 38.9097 24.885 41.4998 23.1544C44.0899 21.4237 47.135 20.5 50.25 20.5"
            stroke="#796AD5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M64.1268 53.2075C65.0543 56.0075 67.1718 56.2875 68.7993 53.8375C70.2868 51.5975 69.3068 49.76 66.6118 49.76C64.6168 49.7425 63.4968 51.3 64.1268 53.2075V53.2075Z"
            stroke="#796AD5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55.5 25.75H66"
            stroke="#796AD5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55.5 31H60.75"
            stroke="#796AD5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Under Developent</span>
      </div>
    </div>
  );
};

export default ReferralManagment;
