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
    const [inputLevel, setInputLevel] = useState(1);
    const [rows, setRows] = useState([]);

    let data = [
        {
            title: 'your text',
            onClick: () => console.log('hi ')
        },
        {
            title: 'your tex2t',
            onClick: () => console.log('hi2')
        },
        {
            title: 'your tex3t',
            onClick: () => console.log('hi3')
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

    const deleteLastRow = () => {
        setRows((prevRows) => prevRows.slice(0, -1));
    };

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
            <div className={styles.steps}>
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
                        console.log(item, 'item')
                        console.log(index, 'index')
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
                            // arrow={"arrow-right"}
                            element={"button"}
                            onClick={addRow}
                        />
                        <Button
                            label={"Delete Last Level"}
                            size={"btn-lg"}
                            type={"btn-primary"}
                            // arrow={"arrow-right"}
                            element={"button"}
                            onClick={deleteLastRow}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralManagment;
