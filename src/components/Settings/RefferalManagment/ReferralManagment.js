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
    const [sendData, setSendData] = useState({
        uni: {
            active: false,
            level: uniLevel,
            calculated: "",
            maxCommision: [],
            maxCommPercentage: [],
        },

        binaryBv: {
            active: false,
            level: binaryLevel,
            calculated: "",
            maxCommision: [],
            maxCommPercentage: [],
        }
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

    const selectHandler = (value) => {
        if (uniLevel && activeTab === 0) {
            setSendData((prevSendData) => ({
                ...prevSendData,
                uni: {
                    ...prevSendData.uni,
                    calculated: value,
                },

            }));
        }
        if (binaryLevel && activeTab === 1) {
            setSendData((prevSendData) => ({
                ...prevSendData,
                binaryBv: {
                    ...prevSendData.uni,
                    calculated: value,
                },

            }));
        }

    };

    // binaryBv: {
    //     ...prevSendData.binaryBv,
    //     calculated: value,
    // },



    const saveHandler = async () => {
        try {
            const response = await axios.post('/api/data/create_referral_settings', sendData);
            console.log(response.data); 
        } catch (error) {
            console.error(error); 
        }
    };

    useEffect(() => {
        setSendData((prevSendData) => ({
            ...prevSendData,
            uni: {
                ...prevSendData.uni,
                level: uniLevel,
            },
        }));
    }, [uniLevel]);

    useEffect(() => {
        setSendData((prevSendData) => ({
            ...prevSendData,
            binaryBv: {
                ...prevSendData.binaryBv,
                level: binaryLevel,
            },
        }));
    }, [binaryLevel]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/data/get_referral_settings');
            console.log(response.data); 
        } catch (error) {
            console.error(error); 
        }
    };

    useEffect(() => {
        fetchData();
    }, [])


    const handleMaxCommissionChange = (index, value) => {
        setSendData((prevSendData) => {
            const updatedSendData = { ...prevSendData };

            if (uniLevel && activeTab === 0) {
                const uniMaxCommission = [...prevSendData.uni.maxCommision];
                uniMaxCommission[index] = value;
                updatedSendData.uni = {
                    ...prevSendData.uni,
                    maxCommision: uniMaxCommission,
                };
            }

            if (binaryLevel && activeTab === 1) {
                const binaryMaxCommission = [...prevSendData.binaryBv.maxCommision];
                binaryMaxCommission[index] = value;
                updatedSendData.binaryBv = {
                    ...prevSendData.binaryBv,
                    maxCommision: binaryMaxCommission,
                };
            }

            return updatedSendData;
        });
    };

    const handleMaxCommissionPercentageChange = (index, value) => {
        setSendData((prevSendData) => {
            const updatedSendData = { ...prevSendData };

            if (uniLevel && activeTab === 0) {
                const uniMaxCommPercentage = [...prevSendData.uni.maxCommPercentage];
                uniMaxCommPercentage[index] = value;
                updatedSendData.uni = {
                    ...prevSendData.uni,
                    maxCommPercentage: uniMaxCommPercentage,
                };
            }

            if (binaryLevel && activeTab === 1) {
                const binaryMaxCommPercentage = [...prevSendData.binaryBv.maxCommPercentage];
                binaryMaxCommPercentage[index] = value;
                updatedSendData.binaryBv = {
                    ...prevSendData.binaryBv,
                    maxCommPercentage: binaryMaxCommPercentage,
                };
            }

            return updatedSendData;
        });
    };



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
                                setSendData((prevSendData) => ({
                                    ...prevSendData,
                                    uni: {
                                        ...prevSendData.uni,
                                        active: e.target.checked,
                                    },
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
                        selectHandler={selectHandler}
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
                                    onChange={(i) => handleMaxCommissionChange(index, i.target.value)}
                                    statusCard={''}
                                />
                                <Input
                                    type={"default"}
                                    emptyFieldErr={false}
                                    inputType={"text"}
                                    placeholder={"1"}
                                    label={`max commission perc ${index + 1}`}
                                    onChange={(i) => handleMaxCommissionPercentageChange(index, i.target.value)}
                                    statusCard={''}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${styles.steps} ${step === 2 ? styles.actived : ""}`}>
                <div className={styles.block}>
                    <div className={styles.row}>
                        <p>Binary</p>
                        <Switches
                            onChange={(e) =>
                                setSendData((prevSendData) => ({
                                    ...prevSendData,
                                    binaryBv: {
                                        ...prevSendData.uni,
                                        active: e.target.checked,
                                    },
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
                        selectHandler={selectHandler}
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
                                    onChange={(i) => handleMaxCommissionChange(index, i.target.value)}
                                    statusCard={''}
                                />
                                <Input
                                    type={"default"}
                                    emptyFieldErr={false}
                                    inputType={"text"}
                                    placeholder={"1"}
                                    label={`max commission perc ${index + 1}`}
                                    onChange={(i) => handleMaxCommissionPercentageChange(index, i.target.value)}
                                    statusCard={''}
                                />
                            </div>
                        ))}
                        <Button
                            label={'save'}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            element={"button"}
                            onClick={saveHandler}
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
