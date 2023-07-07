import React, { useState, useEffect } from "react";
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
    const [button, setButton] = useState(false);
    const [rows, setRows] = useState([]);
    const [step, setStep] = useState(1);

    let data = [
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
            value: "hi",
        },
        {
            name: "Hash",
            value: "hi2",
        },
    ];

    const changeHandler = (i, e) => {
        console.log(i.target.value);
    };

    const selectHandler = (value) => {
        console.log("selecthandler");
        console.log(value);
    };

    const activeTabHandler = (index) => {
        setActiveTab(index)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const addRow = () => {
        setRows((prevRows) => [...prevRows, inputs]);
    };


    const deleteRow = () => {
        if (rows.length > 1) {
            setRows((prevRows) => prevRows.slice(0, -1));
        }
    };

    const saveHandler = () => {
        console.log('save');
    }

    const [inputs, setInputs] = useState({
        input: {
            type: "default",
            emptyFieldErr: false,
            inputType: "text",
            placeholder: "5000",
            label: `Level ${rows.length + 1} maximum commission`,
            subLabel: "",
            onChange: changeHandler,
            statusCard: '',
        },
        input2: {
            type: "default",
            emptyFieldErr: false,
            inputType: "text",
            placeholder: "5000",
            label: `Level ${rows.length + 1} maximum commission`,
            subLabel: "",
            onChange: changeHandler,
            statusCard: '',
            customStyles: { style: `width: 'calc(50% - 10px)'` }
        },
    });

    useEffect(() => {
        setRows([inputs]);
    }, []);

    console.log(rows, 'rows?')
    return (
        <div className={styles.table}>
            <div style={{ borderBottom: 'none' }} className={styles.block}>
                <h1 className={styles.title}>Referral Management</h1>
                <Tabs
                    type={'simple'}
                    tabsData={data}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onTabClick={activeTabHandler}
                    customStyles={{ width: '100%' }}
                />
            </div>
            <div className={`${styles.steps} ${step === 1 ? styles.actived : ""}`}>
                <div className={styles.block}>
                    <div className={styles.row}>
                        <p>Uni</p>
                        <Switches type={"sm-switches"} />
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
                </div>
                <div className={styles.block}>
                    {rows && rows.map((item, index) => {
                        return (
                            <div className={styles.row} key={index}>
                                <Input
                                    type={item.input.type}
                                    emptyFieldErr={item.input.emptyFieldErr}
                                    inputType={item.input.inputType}
                                    placeholder={item.input.placeholder}
                                    label={`Level ${index + 1} maximum commission`}
                                    subLabel={item.input.subLabel}
                                    onChange={item.input.onChange}
                                    statusCard={item.input.statusCard}
                                />
                                <Input
                                    type={item.input2.type}
                                    emptyFieldErr={item.input2.emptyFieldErr}
                                    inputType={item.input2.inputType}
                                    placeholder={item.input2.placeholder}
                                    label={`Level ${index + 1} maximum commission`}
                                    subLabel={item.input2.subLabel}
                                    onChange={item.input2.onChange}
                                    statusCard={item.input2.statusCard}
                                />
                            </div>
                        )
                    })}
                    <div className={styles.row}>
                        <Button
                            label={"Add Level"}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            element={"button"}
                            onClick={addRow}
                        />
                        {rows.length > 1 ? (
                            <Button
                                label={"Delete Last Level"}
                                size={"btn-lg"}
                                type={"btn-primary"}
                                element={"button"}
                                onClick={deleteRow}
                            />
                        ) : (
                            <div className={styles.disabledBtn}>
                                <Button
                                    label={"Delete Last Level"}
                                    size={"btn-lg"}
                                    type={"btn-primary"}
                                    element={"button"}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`${styles.steps} ${step === 2 ? styles.actived : ""}`}>
                <div className={styles.block}>
                    <div className={styles.row}>
                        <p>Binary BV</p>
                        <Switches type={"sm-switches"} />
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
                </div>
                <div className={styles.block}>
                    {rows && rows.map((item, index) => {
                        return (
                            <div className={styles.row} key={index}>
                                <Input
                                    type={item.input.type}
                                    emptyFieldErr={item.input.emptyFieldErr}
                                    inputType={item.input.inputType}
                                    placeholder={item.input.placeholder}
                                    label={`Level ${index + 1} maximum commission`}
                                    subLabel={item.input.subLabel}
                                    onChange={item.input.onChange}
                                    statusCard={item.input.statusCard}
                                />
                                <Input
                                    type={item.input2.type}
                                    emptyFieldErr={item.input2.emptyFieldErr}
                                    inputType={item.input2.inputType}
                                    placeholder={item.input2.placeholder}
                                    label={`Level ${index + 1} maximum commission`}
                                    subLabel={item.input2.subLabel}
                                    onChange={item.input2.onChange}
                                    statusCard={item.input2.statusCard}
                                />
                            </div>
                        )
                    })}
                    <div className={styles.row}>
                        <Button
                            label={"Add Level"}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            element={"button"}
                            onClick={addRow}
                        />
                        {rows.length > 1 ? (
                            <Button
                                label={"Delete Last Level"}
                                size={"btn-lg"}
                                type={"btn-primary"}
                                element={"button"}
                                onClick={deleteRow}
                            />
                        ) : (
                            <div className={styles.disabledBtn}>
                                <Button
                                    label={"Delete Last Level"}
                                    size={"btn-lg"}
                                    type={"btn-primary"}
                                    element={"button"}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.row}>
                        <Button
                            label={'Save'}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            element={"button"}
                            onClick={saveHandler}
                            customStyles={{ width: '30%' }}
                        />

                    </div>
                </div>
            </div>
            <div className={`${styles.steps} ${styles.underWorking} ${step === 3 ? styles.actived : ""}`}>
                <svg width="104" height="75" viewBox="0 0 104 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.05" d="M96.6042 56.7063C103.822 49.5708 107.82 22.1331 98.7751 13.4263C85.0262 0.191923 62.2753 8.0439 44.8649 1.26497C27.4545 -5.51395 -2.49661e-06 16.2878 -4.12265e-06 34.8875C-6.00351e-06 56.4021 33.2381 76.1446 52.8247 74.9483C72.4114 73.752 88.2825 64.9331 96.6042 56.7063Z" fill="#796AD4" />
                    <circle cx="95" cy="6" r="2" fill="#796AD4" fillOpacity="0.6" />
                    <circle cx="88" cy="67" r="2" fill="#796AD4" fillOpacity="0.4" />
                    <circle cx="10.5" cy="62.5" r="2.5" fill="#796AD4" fillOpacity="0.4" />
                    <circle cx="13.5" cy="18.5" r="1.5" fill="#796AD4" fillOpacity="0.8" />
                    <circle cx="15" cy="57" r="1" fill="#796AD4" fillOpacity="0.6" />
                    <path d="M66 36.25C66 39.3651 65.0763 42.4102 63.3457 45.0002C61.615 47.5903 59.1552 49.609 56.2773 50.8011C53.3993 51.9932 50.2325 52.3051 47.1773 51.6974C44.1221 51.0897 41.3158 49.5896 39.1131 47.3869C36.9104 45.1843 35.4104 42.3779 34.8026 39.3227C34.1949 36.2675 34.5068 33.1007 35.6989 30.2227C36.891 27.3448 38.9097 24.885 41.4998 23.1544C44.0899 21.4237 47.135 20.5 50.25 20.5" stroke="#796AD5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M64.1268 53.2075C65.0543 56.0075 67.1718 56.2875 68.7993 53.8375C70.2868 51.5975 69.3068 49.76 66.6118 49.76C64.6168 49.7425 63.4968 51.3 64.1268 53.2075V53.2075Z" stroke="#796AD5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M55.5 25.75H66" stroke="#796AD5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M55.5 31H60.75" stroke="#796AD5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2>Under Development</h2>
            </div>

        </div>
    );
};

export default ReferralManagment;
