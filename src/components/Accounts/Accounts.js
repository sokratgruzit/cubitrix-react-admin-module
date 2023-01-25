import React from "react";
import { useState, useEffect } from "react";
import {AdminPanel} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import axios from "../../api/axios";

const Accounts = () => {
    const {
        tableFilterData,
        th
    } = useTableParameters('Accounts');
    let mobile;
    useEffect(() => {
        console.log('niinaosjdn')
          async function fetchData() {
            await axios.post("/accounts/filter", {
              type: "account",
              /*address: "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5",
              account_type_id: "user_current",
              search: "user"*/
              // status: "Approved"
            })
            .then(res => {
              console.log(res);
            });
          }
          fetchData();
        }, []);
    let defaultOutcomingData = [];
    const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState(defaultOutcomingData);

    let td = [
        {
            id:12123,
            hash: "0xae0cf2498c23422340xae0cf2498c2342234",
            from: "0xae0cf2498c0xae0cf2498c0xae0cf2498c2342234",
            to: "0xae0cf2498c0xae0cf2498c0xae0cf2498c2342234",
            amount: "$123, 241, 241, 423.8",
            domination: "1,132,000.1",
            date: "01.02.2023",
            time: '08:15 PM',
            type: 'All Deposit',

        },
        {
            id:121223323,
            hash: "0xae0cf2498c2342234",
            from: "0xae0cf2498c0xae0cf2498c",
            to: "0xae0cf2498c0xae0cf2498c",
            amount: "$123, 241, 241, 423.8",
            domination: "1,132,000.1",
            date: "01.02.2023",
            time: '08:15 PM',
            type: 'All Deposit',

        },
        {
            id:1212323,
            hash: "0xae0cf2498c2342234",
            from: "0xae0cf2498c0xae0cf2498c",
            to: "0xae0cf2498c0xae0cf2498c",
            amount: "$123, 241, 241, 423.8",
            domination: "1,132,000.1",
            date: "01.02.2023",
            time: '08:15 PM',
            type: 'All Deposit',

        },
    ];

    let tableData;
    tableData = td.map((item) => {
        return(
            <>
                <div className="table-parent">
                    <div className="table" key={item.id}>
                        <div className={`td col ${th[0].mobileWidth ? true : false }`} style={{width: `${mobile ? th[0].mobileWidth : th[0].width}%`}}>
                            <span>{item.id}</span>
                            <span>{item.hash}</span>
                        </div>
                        <div className={`td ${th[1].mobileWidth ? true : false }`} style={{width: `${mobile ? th[1].mobileWidth : th[1].width}%`}}>
                            <span>{item.from}</span>
                        </div>
                        <div className={`td ${th[2].mobileWidth ? true : false }`} style={{width: `${mobile ? th[2].mobileWidth : th[3].width}%`}}>
                            <span>{item.to}</span>
                        </div>
                        <div className={`td ${th[3].mobileWidth ? true : false }`} style={{width: `${mobile ? th[3].mobileWidth : th[3].width}%`}}>
                            <span>{item.amount}</span>
                        </div>
                        <div className={`td ${th[4].mobileWidth ? true : false }`} style={{width: `${mobile ? th[4].mobileWidth : th[4].width}%`}}>
                            <span>{item.domination}</span>
                        </div>
                        <div className={`td col ${th[5].mobileWidth ? true : false }`} style={{width: `${mobile ? th[5].mobileWidth : th[5].width}%`}}>
                            <span>{item.date}</span>
                            <span>{item.time}</span>
                        </div>
                        <div className={`td ${th[6].mobileWidth ? true : false }`} style={{width: `${mobile ? th[6].mobileWidth : th[6].width}%`}}>
                            <span>{item.type}</span>
                        </div>
                    </div>
                    <div className="icon-place">
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.299 1.33325L6.47141 5.16089C6.01937 5.61293 5.27968 5.61293 4.82764 5.16089L1 1.33325" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="table-mobile">
                        <div className="table-mobile-content">
                            <div className="td">
                                <div className="mobile-ttl">{th[2].name}</div>
                                <span>{item.to}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[3].name}</div>
                                <span>{item.amount}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[4].name}</div>
                                <span>{item.domination}</span>
                            </div>
                            <div className="td col">
                                <div className="mobile-ttl">{th[5].name}</div>
                                <span>{item.date}</span>
                                <span>{item.time}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[6].name}</div>
                                <span>{item.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    })
    return (
        <AdminPanel
            tableData={tableData}
            tableHead={th}
            mobile={mobile}
            tableFilterData={tableFilterData}
            tableFilterOutcomingData={tableFilterOutcomingData}
            setTableFilterOutcomingData={setTableFilterOutcomingData}
        />
    );
};

export default Accounts;
