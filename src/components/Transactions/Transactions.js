import React from "react";
import { useState,useEffect } from "react";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import axios from "../../api/axios";

const Transactions = () => {
    const {
        tableFilterData,
        th,
        mobile,
        mobileExpand,
        mobileExpandFunc
    } = useTableParameters('Transactions');

    const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});

    let [td, setTd] = useState([]);
    let [pageNow, setPageNow] = useState(1);
    let [pageAll, setPageAll] = useState(1);

    useEffect(() => {
        async function fetchData() {
            await axios.post("/admin_data/filter", {
                type: "transactions",
                filter: tableFilterOutcomingData,
                page: pageNow
            })
                .then(res => {
                    setPageAll(res.data.success.pages);
                    setTd(res.data.success.data)
                });
        }
        fetchData();
    }, [tableFilterOutcomingData,pageNow]);
    let tableData;
    tableData = td.map((item,index) => {
        return(
            <>
                <div className={`table-parent ${mobileExpand === index ? 'active' : ''}`} onClick={() => {
                    mobileExpandFunc(index)
                }}>
                    <div className="table" key={item.id}>
                        <div className={`td ${th[0].mobileWidth ? true : false }`} style={{width: `${mobile ? th[0].mobileWidth : th[0].width}%`}}>
                            <span>{item.tx_hash}</span>
                        </div>
                        <div className={`td ${th[1].mobileWidth ? true : false }`} style={{width: `${mobile ? th[1].mobileWidth : th[1].width}%`}}>
                            <span>{item.from}</span>
                        </div>
                        <div className={`td ${th[2].mobileWidth ? true : false }`} style={{width: `${mobile ? th[2].mobileWidth : th[2].width}%`}}>
                            <span>{item.to}</span>
                        </div>
                        <div className={`td ${th[3].mobileWidth ? true : false }`} style={{width: `${mobile ? th[3].mobileWidth : th[3].width}%`}}>
                            <span>23</span>
                            <span className={`table-currency`}>{item.tx_currency}</span>
                        </div>
                        <div className={`td ${th[4].mobileWidth ? true : false }`} style={{width: `${mobile ? th[4].mobileWidth : th[4].width}%`}}>
                            <span>{item.tx_fee}</span>
                            <span className={`table-currency`}>{item.tx_fee_currency}</span>
                        </div>
                        <div className={`td ${th[5].mobileWidth ? true : false }`} style={{width: `${mobile ? th[5].mobileWidth : th[5].width}%`}}>
                            <span>{item.domination}</span>
                        </div>
                        <div className={`td ${th[6].mobileWidth ? true : false }`} style={{width: `${mobile ? th[6].mobileWidth : th[6].width}%`}}>
                            <span>{item.createdAt}</span>
                        </div>
                        <div className={`td ${th[7].mobileWidth ? true : false }`} style={{width: `${mobile ? th[7].mobileWidth : th[7].width}%`}}>
                            <span>{item.tx_status}</span>
                        </div>
                        <div className={`td ${th[8].mobileWidth ? true : false }`} style={{width: `${mobile ? th[8].mobileWidth : th[8].width}%`}}>
                            <span>{item.tx_type}</span>
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
                                <div className="mobile-ttl">{th[4].name}</div>
                                <div>
                                    <span>{item.tx_fee}</span>
                                    <span className={`table-currency`}>{item.tx_fee_currency}</span>
                                </div>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[5].name}</div>
                                <span>{item.domination}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[6].name}</div>
                                <span>{item.createdAt}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[7].name}</div>
                                <span>{item.tx_status}</span>
                            </div>
                            <div className="td">
                                <div className="mobile-ttl">{th[8].name}</div>
                                <span>{item.tx_type}</span>
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
            pageLabel={'Transactions'}
            tableHead={th}
            mobile={mobile}
            tableHeader={1}
            tableFilter={true}
            tableFilterData={tableFilterData}
            setTableFilterOutcomingData={setTableFilterOutcomingData}
            paginationCurrent={pageNow}
            paginationTotal={pageAll}
            paginationEvent={page => setPageNow(page)}
        />
    );
};

export default Transactions;
