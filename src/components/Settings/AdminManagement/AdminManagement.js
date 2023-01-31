import React from "react";
import { useState, useEffect } from "react";
import {AdminPanel} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../../hooks/useTableParameters";
import axios from "../../../api/axios";

const AdminManagement = () => {
    const {
        th,
        mobile,
        mobileExpandFunc,
        mobileExpand
    } = useTableParameters('AdminManagement');

    let defaultOutcomingData = {};
    const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState(defaultOutcomingData);
    let [td, setTd] = useState([]);
    let [pageNow, setPageNow] = useState(1);
    let [pageAll, setPageAll] = useState(1);

    td = [
        {
            id: 'CL00001',
            name: 'Harry Potter',
            email: 'harrypotter@gmail.com',
            lastLogin: '01.02.2023',
            level: 'Super Admin'
        },
        {
            id: 'CL00001',
            name: 'Harry Potter',
            email: 'harrypotter@gmail.com',
            lastLogin: '01.02.2023',
            level: 'Super Admin'
        }
    ]
    useEffect(() => {
        async function fetchData() {
            await axios.post("/accounts/filter", {
                type: "admins",
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
                            <span>{item.id}</span>
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
                                <div className="mobile-ttl">{th[0].name}</div>
                                <span>{item.name}</span>
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
            tableFilter={false}
            setTableFilterOutcomingData={setTableFilterOutcomingData}
            paginationCurrent={pageNow}
            paginationTotal={pageAll}
            paginationEvent={page => setPageNow(page)}
        />
    );
};

export default AdminManagement;
