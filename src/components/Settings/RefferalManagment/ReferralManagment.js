import React from "react";
import { useState, useEffect } from "react";
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

    return (
        <div className={styles.table}>
            <div style={{borderBottom: 'none'}} className={styles.block}>
                <h1 className={styles.title}>Referral Managament</h1>
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
                    <div className={styles.inputRow}>
                        <Input
                            type={"default"}
                            // value={value}
                            icon={false}
                            emptyFieldErr={false}
                            inputType={"text"}
                            placeholder={"5000"}
                            label={`Level ${inputLevel} maximum comission`}
                            subLabel={""}
                            onChange={changeHandler}
                            statusCard={''}
                            customStyles={{ width: 'calc(50% - 10px)' }}
                        />
                        <Input
                            type={"default"}
                            // value={value}
                            icon={false}
                            emptyFieldErr={false}
                            inputType={"text"}
                            placeholder={"11%"}
                            label={`Level ${inputLevel} max comission percentage`}
                            subLabel={""}
                            onChange={changeHandler}
                            statusCard={''}
                            customStyles={{ width: 'calc(50% - 10px)' }}
                        />
                    </div>
                    <Button
                        label={"Add Level"}
                        size={"btn-lg"}
                        type={"btn-primary"}
                        arrow={"arrow-right"}
                        element={"button"}
                        onClick={() => setButton((prevState) => !prevState)}
                    />
                </div>
            </div>
        </div>

    );
};

export default ReferralManagment;