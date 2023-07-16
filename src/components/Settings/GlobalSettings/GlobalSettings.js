import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  Switches,
  Input,
  HelpText,
  Button,
} from "@cubitrix/cubitrix-react-ui-module";

import styles from "./GlobalSettings.module.css";

const GlobalSettings = ({ animate }) => {
  const [active, setActive] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(1);
  const [developersApiData, setDevelopersApiData] = useState({
    name: "",
    active: false,
    level: "",
    calculated: "",
    lvlOptions: {
      maxCommision: [],
      maxCommPercentage: [],
    },
  });

  let stepper = [
    {
      title: "Developers API",
      onClick: () => setStep(1),
    },
    {
      title: ".2.",
      onClick: () => setStep(2),
    },
    {
      title: ".3.",
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
    setDevelopersApiData((prevDevData) => ({
      ...prevDevData,
      calculated: value,
    }));
  };

  const uniMaxCommissionChangeHandler = (index, value) => {
    setDevelopersApiData((prevDevData) => {
      const updatedDevApiData = { ...prevDevData };
      updatedDevApiData.lvlOptions.maxCommision[index] =
        value === "" ? null : value;

      return updatedDevApiData;
    });
  };

  const uniMaxCommissionPercentageChangeHandler = (index, value) => {
    setDevelopersApiData((prevDevData) => {
      const updatedDevApiData = { ...prevDevData };
      updatedDevApiData.lvlOptions.maxCommPercentage[index] =
        value === "" ? null : value;

      return updatedDevApiData;
    });
  };

  const saveDevDataHandler = async (req, res) => {
    console.log(developersApiData)

  };

  const rowsHandler = (level) => {
    const newLevel = parseInt(level); // Convert level to an integer

    if (!isNaN(newLevel)) {
      setDevelopersApiData((prevDevData) => {
        let { maxCommPercentage, maxCommision } = prevDevData.lvlOptions;

        maxCommPercentage = [...maxCommPercentage.slice(0, newLevel)];
        maxCommision = [...maxCommision.slice(0, newLevel)];

        // If newLevel is greater than current array length, fill the extra items with null
        while (maxCommPercentage.length < newLevel)
          maxCommPercentage.push(null);
        while (maxCommision.length < newLevel) maxCommision.push(null);

        return {
          ...prevDevData,
          lvlOptions: {
            maxCommPercentage: maxCommPercentage,
            maxCommision: maxCommision,
          },
        };
      });
    }
  };

  return (
    <div className={styles.table}>
      <div style={{ borderBottom: "none" }} className={styles.block}>
        <h1 className={styles.title}>Global Settings</h1>
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
            <p>Developers API</p>
            <Switches
              value={developersApiData?.active === undefined ? false : true}
              onChange={(e) =>
                setDevelopersApiData((prevDevData) => ({
                  ...prevDevData,
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
            value={developersApiData.calculated}
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
            label={"level"}
            value={developersApiData.level}
            onChange={(i) => {
              setDevelopersApiData((prevDevData) => ({
                ...prevDevData,
                level: i.target.value,
              }));
              rowsHandler(i.target.value);
            }}
            statusCard={""}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.col}>
            {Array.from({ length: developersApiData?.level ?? 0 }, (_, index) => (
              <div key={index} className={styles.row}>
                <Input
                  type={"default"}
                  emptyFieldErr={false}
                  inputType={"text"}
                  placeholder={"1"}
                  value={developersApiData.lvlOptions.maxCommision[index]}
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
                  value={developersApiData.lvlOptions.maxCommPercentage[index]}
                  label={`Level ${index + 1} max comission percentage`}
                  onChange={(i) =>
                    uniMaxCommissionPercentageChangeHandler(index, i.target.value)
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
              onClick={saveDevDataHandler}
            />
          </div>  
        </div>
      </div>
      <div className={`${styles.steps} ${step === 2 ? styles.actived : ""}`}>
        2
      </div>
      <div className={`${styles.steps} ${styles.underWorking} ${step === 3 ? styles.actived : ""}`} >
        3
      </div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <div>
                                        <div>
                                          <div>
                                            <div>
                                              <div>
                                                <div>
                                                  <div>
                                                    <hr />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;