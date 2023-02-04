import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
    AdminPanel,
    Popup,
    Button, MoreButton
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../../hooks/useTableParameters";
import useAxios from "../../../hooks/useAxios";

const AdminManagement = () => {
    const axios = useAxios();
    const [popUpActive, setPopUpActive] = useState(false);
    const [addAdminError, setAddAdminError] = useState('');
    const [popUpData, setPopUpData] = useState({
        roles: '',
        email: '',
        password: ''
    });
    const [edit, setEdit] = useState(false);

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

    let dynamicDropDown = (email,password,roles) => {
        const deleteUser = async (email) => {
            try {
                await axios.post("/api/data/delete-user", {
                    email: email
                });
            } catch (err) {
                console.log(err);
            };
        };

        const editUser = async (email, password, roles) => {
            setPopUpData({
                email,
                password,
                roles
            });
            setPopUpActive(true);
            setEdit(true);
        };

        let dropdownData = [
            {
                id: 0,
                list: [
                    {
                        title: "Edit",
                        onClick: () => editUser(email, password, roles),
                        svg: (
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0495 2.00002L3.2078 9.24168C2.94947 9.51668 2.69947 10.0584 2.64947 10.4334L2.34114 13.1333C2.2328 14.1083 2.9328 14.775 3.89947 14.6084L6.5828 14.15C6.9578 14.0834 7.4828 13.8084 7.74114 13.525L14.5828 6.28335C15.7661 5.03335 16.2995 3.60835 14.4578 1.86668C12.6245 0.141685 11.2328 0.750018 10.0495 2.00002Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.9082 3.2085C9.08291 4.32587 9.62371 5.35361 10.4457 6.13037C11.2677 6.90713 12.3244 7.38894 13.4499 7.50016" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.5 17.3335H16.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        ),
                    },
                    {
                        title: "Delete",
                        onClick: () => deleteUser(email),
                        svg: (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.13815 3.19472C4.80861 3.02602 6.47927 2.94165 8.15005 2.94165C10.9545 2.94165 13.7668 3.08439 16.5617 3.36136C16.9052 3.3954 17.156 3.70146 17.122 4.04495C17.088 4.38845 16.7819 4.63931 16.4384 4.60527C13.6833 4.33224 10.9122 4.19165 8.15005 4.19165C6.52113 4.19165 4.89209 4.27392 3.26286 4.43849L3.26103 4.43867L1.56103 4.60533C1.2175 4.63901 0.911707 4.38783 0.878027 4.0443C0.844348 3.70077 1.09553 3.39498 1.43906 3.3613L3.13815 3.19472Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.883 2.15388L6.69972 3.24526C6.64255 3.58567 6.32025 3.81528 5.97984 3.75812C5.63943 3.70095 5.40981 3.37865 5.46698 3.03824L5.65032 1.94657C5.65352 1.92755 5.65682 1.90764 5.66015 1.88748C5.71753 1.54091 5.80172 1.03247 6.14063 0.648157C6.53568 0.200179 7.13843 0.041748 7.90835 0.041748H10.0917C10.871 0.041748 11.4731 0.212914 11.8658 0.665453C12.2052 1.05654 12.2873 1.5668 12.3421 1.9075C12.3447 1.92408 12.3473 1.94026 12.3499 1.956L12.5329 3.03746C12.5905 3.3778 12.3613 3.70039 12.021 3.75799C11.6806 3.81558 11.358 3.58637 11.3004 3.24603L11.1165 2.15899C11.0468 1.73147 11.0027 1.57801 10.9217 1.48471C10.8769 1.43308 10.7207 1.29175 10.0917 1.29175H7.90835C7.26994 1.29175 7.11852 1.42915 7.07816 1.47492C7.00139 1.56197 6.95807 1.70822 6.883 2.15388Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.7487 5.99302C15.0932 6.01525 15.3544 6.31252 15.3321 6.65698L14.7903 15.0521L14.7891 15.0679C14.7672 15.3814 14.743 15.7262 14.6784 16.047C14.6114 16.3797 14.4934 16.7307 14.2541 17.0422C13.7531 17.6945 12.9006 17.9584 11.6751 17.9584H6.3251C5.09963 17.9584 4.24708 17.6945 3.7461 17.0422C3.50685 16.7307 3.38878 16.3797 3.32178 16.047C3.25717 15.7262 3.23303 15.3814 3.21107 15.0679L3.20973 15.0486L2.66807 6.65698C2.64583 6.31252 2.90705 6.01525 3.25151 5.99302C3.59597 5.97079 3.89324 6.232 3.91547 6.57646L4.45691 14.9647C4.45695 14.9653 4.45699 14.9658 4.45703 14.9664C4.48055 15.302 4.50045 15.5682 4.54718 15.8002C4.59268 16.0262 4.65586 16.1746 4.73744 16.2808C4.87813 16.464 5.22557 16.7084 6.3251 16.7084H11.6751C12.7746 16.7084 13.1221 16.464 13.2628 16.2808C13.3444 16.1746 13.4075 16.0262 13.453 15.8002C13.4998 15.5682 13.5197 15.302 13.5432 14.9664C13.5432 14.9658 13.5433 14.9653 13.5433 14.9647L14.0847 6.57646C14.107 6.232 14.4042 5.97079 14.7487 5.99302Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.9834 12.75C6.9834 12.4048 7.26322 12.125 7.6084 12.125H10.3834C10.7286 12.125 11.0084 12.4048 11.0084 12.75C11.0084 13.0952 10.7286 13.375 10.3834 13.375H7.6084C7.26322 13.375 6.9834 13.0952 6.9834 12.75Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29175 9.41675C6.29175 9.07157 6.57157 8.79175 6.91675 8.79175H11.0834C11.4286 8.79175 11.7084 9.07157 11.7084 9.41675C11.7084 9.76193 11.4286 10.0417 11.0834 10.0417H6.91675C6.57157 10.0417 6.29175 9.76193 6.29175 9.41675Z"
                                    fill="white"
                                />
                            </svg>
                        ),
                    },
                ],
            },
        ];
        return dropdownData;
    }

    useEffect(() => {
        async function fetchData() {
            await axios.post("/api/data/filter", {
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
                <div  key={item.id + index + item.email } className={`table-parent ${mobileExpand === item.id ? 'active' : ''}`} onClick={() => {
                    mobileExpandFunc(item.id)
                }}>
                    <div className="table">
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
                    <div className="table-more">
                        <MoreButton dropdownData={dynamicDropDown(item.email, item.password, item.roles)} />
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
        name: 'Roles',
        value: 'roles',
        options: [
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
            await axios.post(`/api${!edit ? '/auth/register' : '/data/edit-user'}`, addAdminData);
            setEdit(false);
            setPopUpActive(false);
        } catch (err) {
            setAddAdminError('Account already exists');
        };
    };

    const handlePopUpClose = () => {
        setPopUpActive(false);
        setAddAdminError('');
    };

    console.log(popUpData)

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
                    popUpData={popUpData}
                    setPopUpData={setPopUpData}
                />
            )}
        </>
    );
};

export default AdminManagement;
