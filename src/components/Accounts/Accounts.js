import React from "react";
import { useState, useEffect } from "react";
import {
    AdminPanel,
    Popup,
    Button
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import axios from "../../api/axios";

const Accounts = () => {
    const [popUpActive, setPopUpActive] = useState(false);
    const [addAdminError, setAddAdminError] = useState('');

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
                        <div className={`td ${th[1].mobileWidth ? true : false }`} style={{width: `${mobile ? th[1].mobileWidth : th[1].width}%`}}>
                            <span>{item.address}</span>
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

    const addAdminSelect = {
        name: 'Role',
        value: 'role',
        options: [
            {
                name: 'Super Admin',
                value: 'SUPER_ADMIN'
            },
            {
                name: 'Admin',
                value: 'ADMIN',
            },
            {
                name: 'Moderator',
                value: 'MODERATOR',
            }
        ]
    };

    const handleAddAdminBtnClick = async (addAdminData) => {
        setAddAdminError('');
        try {
            await axios.post("/api/auth/register", addAdminData);    
            setPopUpActive(false);
        } catch (err) {
            setAddAdminError('Account already exists');
        };
    };

    const handlePopUpClose = () => {
        setPopUpActive(false);
        setAddAdminError('');
    };

    return (
        <>
            <AdminPanel
                tableData={tableData}
                tableHead={th}
                mobile={mobile}
                pageLabel={'Accounts'}
                tableFilter={true}
                tableHeaderButtons={
                    <Button 
                        label={'Registration'}
                        size={'btn-lg'}
                        type={'btn-primary'}
                        arrow={'arrow-none'}
                        element={'button'}
                        onClick={() => setPopUpActive(true)}
                    />
                }
                tableFilterData={tableFilterData}
                setTableFilterOutcomingData={setTableFilterOutcomingData}
                paginationCurrent={pageNow}
                paginationTotal={pageAll}
                paginationEvent={page => setPageNow(page)}
            />
            {popUpActive && (
                <Popup 
                    type={'addAdmin'}
                    label={'Add Admin'}
                    addAdminSelect={addAdminSelect}
                    handleAddAdminBtnClick={handleAddAdminBtnClick}
                    addAdminError={addAdminError}
                    handlePopUpClose={handlePopUpClose}
                />
            )}
        </>
    );
};

export default Accounts;
