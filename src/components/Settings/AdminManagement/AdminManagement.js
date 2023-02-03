import React from "react";
import { useState, useEffect } from "react";
import {
    AdminPanel,
    Popup,
    Button
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../../hooks/useTableParameters";
import axios from "../../../api/axios";

const AdminManagement = () => {
    const [popUpActive, setPopUpActive] = useState(false);
    const [addAdminError, setAddAdminError] = useState('');

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
    useEffect(() => {
        async function fetchData() {
            await axios.post("/admin_data/filter", {
                type: "admins",
                filter: tableFilterOutcomingData,
                page: pageNow
            })
                .then(res => {
                    setPageAll(res.data.success.pages);
                    setTd(res.data.success.data)
                });
        }
        fetchData();
    }, [tableFilterOutcomingData, pageNow]);

    let tableData;
    tableData = td.map((item, index) => {
        return(
            <>
                <div className={`table-parent ${mobileExpand === item.id ? 'active' : ''}`} onClick={() => {
                    mobileExpandFunc(item.id)
                }}>
                    <div className="table" key={item.id + index + item.email }>
                        <div className={`td ${th[0].mobileWidth ? true : false }`} style={{width: `${mobile ? th[0].mobileWidth : th[0].width}%`}}>
                            <span>{item.email}</span>
                        </div>
                        <div className={`td ${th[1].mobileWidth ? true : false }`} style={{width: `${mobile ? th[1].mobileWidth : th[1].width}%`}}>
                            <span>-</span>
                        </div>
                        <div className={`td ${th[2].mobileWidth ? true : false }`} style={{width: `${mobile ? th[2].mobileWidth : th[2].width}%`}}>
                            <span>{item.roles}</span>
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
                tableFilter={false}
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

export default AdminManagement;
