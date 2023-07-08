import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Tabs,
    Switches,
    Input,
    HelpText,
    Button
} from "@cubitrix/cubitrix-react-ui-module";

import styles from "./ReferralManagment.module.css";

const ReferralManagment = ({
    animate,
}) => {
    const [active, setActive] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [step, setStep] = useState(1);
    const [uniLevel, setuniLevel] = useState(1);
    const [binaryLevel, setBinaryLevel] = useState(1);
    const [uniData, setUniData] = useState({
        active: false,
        level: uniLevel,
        calculated: "",
        maxCommision: [],
        maxCommPercentage: [],
    });
    const [binaryData, setBinaryData] = useState({
        active: false,
        level: binaryLevel,
        calculated: "",
        maxCommision: [],
        maxCommPercentage: [],
    });

    let stepper = [
        {
            title: 'Uni',
            onClick: () => setStep(1)
        },
        {
            title: 'Binary BV',
            onClick: () => setStep(2)
        },
        {
            title: 'Binary Level System',
            onClick: () => setStep(3)
        },
    ];

    let defaultData = [
        {
            name: "Transaction",
            value: "1",
        },
        {
            name: "Hash",
            value: "2",
        },
    ];

    const changeHandler = (i, e) => {
        console.log(i.target.value);
    };

    const stepperHandler = (e) => {
        // setStep(step + 1);
        // console.log(e, 'stepper index');
        // console.log(step, 'step')

    }

    const selectHandlerUni = (value) => {
        setUniData((prevUniData) => ({
            ...prevUniData,
            calculated: value
        }));
    };

    const selectHandlerBinary = (value) => {
        setBinaryData((prevBinaryData) => ({
            ...prevBinaryData,
            calculated: value
        }));

    };

    useEffect(() => {
        setUniData((prevUniData) => ({
            ...prevUniData,
            level: uniLevel
        }));
    }, [uniLevel]);

    useEffect(() => {
        setBinaryData((prevBinaryData) => ({
            ...prevBinaryData,
            level: binaryLevel
        }));
    }, [binaryLevel]);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/api/data/get_referral_settings');
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [])



    const uniMaxCommissionChangeHandler = (index, value) => {
        setUniData((prevUniData) => {
            const updatedUniData = { ...prevUniData };
            updatedUniData.maxCommision[index] = value;

            return updatedUniData;
        });
    };

    const uniMaxCommissionPercentageChangeHandler = (index, value) => {
        setUniData((prevUniData) => {
            const updatedUniData = { ...prevUniData };
            updatedUniData.maxCommPercentage[index] = value;

            return updatedUniData;
        });
    };

    const binaryMaxCommissionChangeHandler = (index, value) => {
        setBinaryData((prevBinaryData) => {
            const updatedBinaryData = { ...prevBinaryData }
            updatedBinaryData.maxCommision[index] = value;

            return updatedBinaryData;
        });
    };

    const binaryMaxCommissionPercentChangeHandler = (index, value) => {
        setBinaryData((prevBinaryData) => {
            const updatedBinaryData = { ...prevBinaryData }
            updatedBinaryData.maxCommPercentage[index] = value;

            return updatedBinaryData;
        });
    };


    const saveUniDataHandler = () => {
        console.log(uniData, 'uni')
    }

    const saveBinaryDataHandler = () => {
        console.log(binaryData, 'binary')
    }

    return (
        <div className={styles.table}>
            <div style={{ borderBottom: 'none' }} className={styles.block}>
                <h1 className={styles.title}>Referral Management</h1>
                <Tabs
                    type={'simple'}
                    tabsData={stepper}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onTabClick={(index) => stepperHandler(index)}
                    customStyles={{ width: '100%' }}
                />
            </div>
            <div className={`${styles.steps} ${step === 1 ? styles.actived : ""}`}>
                <div className={styles.block}>
                    <div className={styles.row}>
                        <p>Uni</p>
                        <Switches
                            onChange={(e) =>
                                setUniData((prevUniData) => ({
                                    ...prevUniData,
                                    active: e.target.checked
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
                        label={"Calculated"}
                        selectHandler={selectHandlerUni}
                        selectLabel={"select"}
                        active={active}
                        status={""}
                        statusCard={''}
                    />
                    <Input
                        type={"default"}
                        emptyFieldErr={false}
                        inputType={"text"}
                        placeholder={"1"}
                        label={'uni level'}
                        value={uniLevel}
                        onChange={(i) => setuniLevel(i.target.value)}
                        statusCard={''}
                    />
                </div>
                <div className={styles.block}>
                    <div className={styles.col}>
                        {Array.from({ length: uniLevel }, (_, index) => (
                            <div key={index} className={styles.row}>
                                <Input
                                    type={"default"}
                                    emptyFieldErr={false}
                                    inputType={"text"}
                                    placeholder={"1"}
                                    label={`max commission level ${index + 1}`}
                                    onChange={(i) => uniMaxCommissionChangeHandler(index, i.target.value)}
                                    statusCard={''}
                                />
                                <Input
                                    type={"default"}
                                    emptyFieldErr={false}
                                    inputType={"text"}
                                    placeholder={"1"}
                                    label={`max commission perc ${index + 1}`}
                                    onChange={(i) => uniMaxCommissionPercentageChangeHandler(index, i.target.value)}
                                    statusCard={''}
                                />
                            </div>
                        ))}
                        <Button
                            label={'save'}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            element={"button"}
                            onClick={saveUniDataHandler}
                        // customStyles={{ width: '30%' }}
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles.steps} ${step === 2 ? styles.actived : ""}`}>
                <div className={styles.block}>
                    <div className={styles.row}>
                        <p>Binary</p>
                        <Switches
                            onChange={(e) =>
                                setBinaryData((prevSendData) => ({
                                    ...prevSendData,
                                    active: e.target.checked
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
                        label={"Calculated"}
                        selectHandler={selectHandlerBinary}
                        selectLabel={"select"}
                        active={active}
                        status={""}
                        statusCard={''}
                    />
                    <Input
                        type={"default"}
                        emptyFieldErr={false}
                        inputType={"text"}
                        placeholder={"1"}
                        label={'binary level'}
                        value={binaryLevel}
                        onChange={(i) => setBinaryLevel(i.target.value)}
                        statusCard={''}
                    />
                </div>
                <div className={styles.block}>
                    <div className={styles.col}>
                        {Array.from({ length: binaryLevel }, (_, index) => (
                            <div key={index} className={styles.row}>
                                <Input
                                    type={"default"}
                                    emptyFieldErr={false}
                                    inputType={"text"}
                                    placeholder={"1"}
                                    label={`max commission level ${index + 1}`}
                                    onChange={(i) => binaryMaxCommissionChangeHandler(index, i.target.value)}
                                    statusCard={''}
                                />
                                <Input
                                    type={"default"}
                                    emptyFieldErr={false}
                                    inputType={"text"}
                                    placeholder={"1"}
                                    label={`max commission perc ${index + 1}`}
                                    onChange={(i) => binaryMaxCommissionPercentChangeHandler(index, i.target.value)}
                                    statusCard={''}
                                />
                            </div>
                        ))}
                        <Button
                            label={'save'}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            element={"button"}
                            onClick={saveBinaryDataHandler}
                        // customStyles={{ width: '30%' }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ReferralManagment;
{/* <div className={`${styles.steps} ${styles.underWorking} ${step === 3 ? styles.actived : ""}`}>
                <svg width="104" height="75" viewBox="0 0 104 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.05" d="M96.6042 56.7063C103.822 49.5708 107.82 22.1331 98.7751 13.4263C85.0262 0.191923 62.2753 8.0439 44.8649 1.26497C27.4545 -5.51395 -2.49661e-06 16.2878 -4.12265e-06 34.8875C-6.00351e-06 56.4021 33.2381 76.1446 52.8247 */}
