import React from "react";
import { useState, useEffect } from "react";
import {
    AdminPanel
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import axios from "../../api/axios";

const Accounts = () => {
    const {
        tableFilterData,
        th,
        mobile,
        mobileExpandFunc,
        mobileExpand
    } = useTableParameters('Accounts');

    let defaultOutcomingData = {};
    const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState(defaultOutcomingData);
    let [td, setTd] = useState([]);
    let [pageNow, setPageNow] = useState(1);
    let [pageAll, setPageAll] = useState(1);
    const [tableExpand, setTableExpand] = useState(null);

    let tableExpandFunc = (id) => {
        if(id !== tableExpand) {
            setTableExpand(id);
        } else {
            setTableExpand(null);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await axios.post("/accounts/filter", {
                type: "account",
                filter: tableFilterOutcomingData,
                page: pageNow
                /*address: "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5",
                account_type_id: "user_current",
                search: "user"*/
                // status: "Approved"
            })
                .then(res => {
                    console.log(res);
                    setPageAll(res.data.success.pages);
                    setTd(res.data.success.data)
                });
        }
        fetchData();
    }, [tableFilterOutcomingData, pageNow]);

    let tableData;
    tableData = td.map((item) => {
        return(
            <>
                <div className={`table-parent ${mobileExpand === item.id ? 'active' : ''}`} onClick={() => {
                    mobileExpandFunc(item.id)
                }}>
                    <div className="table" key={item.id}>
                        <div className={`td ${th[0].mobileWidth ? true : false }`} style={{width: `${mobile ? th[0].mobileWidth : th[0].width}%`}}>
                            <span>{item.account_type_id.name}</span>
                        </div>
                        <div onClick={() => {tableExpandFunc(item.address)}} className={`td expand ${tableExpand === item.address && item.inner_accounts.length !== 0 ? 'active' : ''} ${th[1].mobileWidth ? true : false }`} style={{width: `${mobile ? th[1].mobileWidth : th[1].width}%`}}>
                            <div>
                            <span>
                                {item.address}
                            </span>
                                {item.inner_accounts.length > 0 ? <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.70095 5.6665L5.52859 1.83887C5.98063 1.38683 6.72032 1.38683 7.17236 1.83887L11 5.6665" stroke="#9C9DA3" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg> : ''}

                            </div>
                            <div className={`td-expand`}>
                                {item.inner_accounts.map((subItem) => {
                                    return (
                                        <span><i>{subItem.account_category}: </i>{subItem.address}</span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={`td ${th[2].mobileWidth ? true : false }`} style={{width: `${mobile ? th[2].mobileWidth : th[2].width}%`}}>
                            <span>{item.account_owner}</span>
                        </div>
                        <div className={`td ${th[3].mobileWidth ? true : false }`} style={{width: `${mobile ? th[3].mobileWidth : th[3].width}%`}}>
                            <span>{item.balance}</span>
                        </div>
                        <div className={`td ${th[4].mobileWidth ? true : false }`} style={{width: `${mobile ? th[4].mobileWidth : th[4].width}%`}}>
                            <span>{item.createdAt}</span>
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
                                <div className="mobile-ttl">{th[3].name}</div>
                                <span>{item.balance}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[4].name}</div>
                                <span>{item.createdAt}</span>
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
            pageLabel={'Accounts'}
            tableFilter={true}
            tableFilterData={tableFilterData}
            setTableFilterOutcomingData={setTableFilterOutcomingData}
            paginationCurrent={pageNow}
            paginationTotal={pageAll}
            paginationEvent={page => setPageNow(page)}
        />
    );
};

export default Accounts;
