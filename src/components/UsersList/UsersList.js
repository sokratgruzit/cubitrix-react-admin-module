import React from "react";
import { useState, useEffect } from "react";
import {
  AdminPanel,
  Button,
  Input,
  MoreButton,
  Popup,
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import useAxios from "../../hooks/useAxios";
import moment from "moment";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersList = (props) => {
  const axios = useAxios();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("Users");

  let defaultOutcomingData = {};
  const [tableFilterOutcomingData, setTableFilterOutcomingData] =
    useState(defaultOutcomingData);
  let [td, setTd] = useState([]);
  let [pageNow, setPageNow] = useState(1);
  let [pageAll, setPageAll] = useState(1);
  const [tableExpand, setTableExpand] = useState(null);
  const [accountType, setAccountType] = useState(null);

  const [activeItem, setActiveItem] = useState(null);

  let tableExpandFunc = (id) => {
    if (id !== tableExpand) {
      setTableExpand(id);
    } else {
      setTableExpand(null);
    }
  };

  let dynamicDropDown = (item) => {
    const id = item?._id;

    let dropdownData = [
      {
        id: 0,
        list: [
          {
            title: "Edit",
            onClick: () => {
              item.newAddress = item.address;
              setActiveItem(item);
            },
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4 5L15 5"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M4 8H15"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M4 11H11"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M18.4563 13.5423L13.9268 18.0719C13.6476 18.3511 13.292 18.5414 12.9048 18.6188L10.8153 19.0367L11.2332 16.9472C11.3106 16.5601 11.5009 16.2045 11.7801 15.9253L16.3096 11.3957M18.4563 13.5423L19.585 12.4135C19.9755 12.023 19.9755 11.3898 19.585 10.9993L18.8526 10.2669C18.4621 9.8764 17.8289 9.8764 17.4384 10.2669L16.3096 11.3957M18.4563 13.5423L16.3096 11.3957"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            ),
          },
        ],
      },
    ];
    return dropdownData;
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .post("/api/data/filter", {
          type: "users",
          filter: tableFilterOutcomingData,
          page: pageNow,
        })
        .then((res) => {
          setPageAll(res.data.success.pages);
          setTd(res.data.success.data);
        });
    }
    fetchData();

    if (tableFilterOutcomingData.selects) {
      if (tableFilterOutcomingData.selects.account_type_id !== "all") {
        setAccountType(tableFilterOutcomingData.selects.account_type_id);
      } else {
        setAccountType(null);
      }
    } else {
      setAccountType(null);
    }
  }, [tableFilterOutcomingData, pageNow]);

  let tableData;
  tableData = td.map((item, index) => {
    return (
      <div
        key={index + item.address}
        className={`table-parent ${mobileExpand === index ? "active" : ""}`}
        onClick={() => {
          mobileExpandFunc(index);
        }}>
        <div className="table">
          <div
            className={`td ${th[0].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}>
            <span>{item.name}</span>
          </div>
          <div
            onClick={() => {
              tableExpandFunc(item.address);
            }}
            className={`td expand ${accountType !== null ||
              (tableExpand === item.address && item.inner_accounts.length !== 0)
              ? "active"
              : ""
              } ${th[1].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[1].mobileWidth : th[1].width}%` }}>
            <div>
              <span>{item.address}</span>
              {item.inner_accounts.length > 0 ? (
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.70095 5.6665L5.52859 1.83887C5.98063 1.38683 6.72032 1.38683 7.17236 1.83887L11 5.6665"
                    stroke="#9C9DA3"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                ""
              )}
            </div>
            <div className={`td-expand`}>
              {item.inner_accounts.map((subItem, index) => {
                return accountType !== subItem.account_category &&
                  accountType !== null &&
                  accountType !== "all" ? (
                  ""
                ) : (
                  <div key={index}>
                    <i>{subItem.account_category}: </i>
                    {subItem.address} <span>{subItem.balance}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`td ${th[2].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[2].mobileWidth : th[2].width}%` }}>
            <span>{item.email}</span>
          </div>
          <div
            className={`td ${th[3].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}>
            <span>
              {item.mobile?.code} {item.mobile?.number}{" "}
            </span>
          </div>
          <div
            className={`td ${th[4].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}>
            <span>{item.nationality}</span>
          </div>
          <div
            className={`td ${th[5].mobileWidth ? true : false}`}
            style={{
              width: `${mobile ? th[5].mobileWidth : th[5].width}%`,
              display: "flex",
              justifyContent: "space-between",
            }}>
            <span>{moment(item.date_of_birth).format("LL")}</span>
            <div style={{ display: "flex" }} className="table-more">
              <MoreButton dropdownData={dynamicDropDown(item)} />
            </div>
          </div>
        </div>
        <div className="icon-place">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.299 1.33325L6.47141 5.16089C6.01937 5.61293 5.27968 5.61293 4.82764 5.16089L1 1.33325"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="table-mobile">
          <div className="table-mobile-content">
            <div className="td">
              <div className="mobile-ttl">{th[3].name}</div>
              <span>
                {item.mobile?.code} {item.mobile?.number}{" "}
              </span>
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[4].name}</div>
              <span>{item.nationality}</span>
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[5].name}</div>
              <span>{moment(item.date_of_birth).format("LL")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const [popUpData, setPopUpData] = useState({
    address: "",
    name: "",
    email: "",
    newAddress: ""
  });

  const inputs = [
    {
      title: "Name",
      name: "name",
      type: "default",
      placeholder: "Name",
      value: popUpData.name,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Email",
      name: "email",
      type: "default",
      placeholder: "Email",
      value: popUpData.email,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Address",
      name: "newAddress",
      type: "default",
      placeholder: "New Address",
      value: popUpData.newAddress,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
  ];

  useEffect(() => {
    if (activeItem) {
      setPopUpData({
        address: activeItem.address,
        name: activeItem.name,
        email: activeItem.email,
        newAddress: activeItem.newAddress,
      });
    }
  }, [activeItem]);

  const handleInputChange = (e, params) => {
    const { name, onChange } = params;

    let data;
    if (!e.target) {
      data = {
        target: {
          value: e,
          name,
        },
      };
      return onChange(data);
    }

    onChange(e);
  };

  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  function handleUserEdit() {
    setUserUpdateLoading(true);

    axios
      .post("/api/data/edit-user-meta", popUpData)
      .then((res) => {
        setUserUpdateLoading(false);
        setTd((prev) =>
          prev.map((item) =>
            item.address === res.data.address ? { ...item, ...res.data } : item,
          ),
        );
        setActiveItem(null);
        notify(res.statusText);
      })
      .catch((err) => {
        setUserUpdateLoading(false);
        notify(err);
      });
  }

  const notify = (msg) => {
    toast(msg);
  };

  return (
    <>
      {activeItem && (
        <Popup
          label={`Edit User`}
          inputs={inputs}
          handlePopUpClose={() => {
            setActiveItem(null);
            setPopUpData({
              address: "",
              name: "",
              email: "",
            });
          }}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          popUpElement={
            <div className="transactions_popup_container">
              <div className="transactions-inputs">
                {inputs?.map((params, index) => {
                  let selectedOption;
                  if (params.type === "lable-input-select") {
                    selectedOption = params?.options.find(
                      (option) => option.value === popUpData[params?.name],
                    );
                  }
                  return (
                    <div className="exchange-input-wrapper" key={index}>
                      <Input
                        key={index}
                        type={params?.type}
                        label={params.title}
                        name={params.name}
                        value={
                          params?.type === "lable-input-select"
                            ? selectedOption?.name ||
                            params?.defaultAny ||
                            params?.options[0]?.value
                            : popUpData[params?.name] === undefined
                              ? params?.defaultAny
                              : popUpData[params?.name]
                        }
                        customStyles={{ width: "100%" }}
                        selectHandler={(opt) => {
                          handleInputChange(opt, params);
                        }}
                        placeholder={params?.placeholder}
                        onChange={(e) => handleInputChange(e, params)}
                        defaultData={params?.options}
                        customInputStyles={{
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        svg={
                          params?.type === "lable-input-select"
                            ? selectedOption?.svg
                            : params?.svg
                        }
                        editable={true}
                        selectType={"country"}
                      />
                      {params?.rightText && (
                        <span className="font-14 exchange-input-right">
                          {params?.rightText}
                        </span>
                      )}
                    </div>
                  );
                })}
                <Button
                  label={userUpdateLoading ? "Loading..." : "Save"}
                  size={"btn-lg"}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={handleUserEdit}
                  customStyles={{ width: "100%" }}
                  disabled={userUpdateLoading}
                />
              </div>
            </div>
          }
        />
      )}
      <AdminPanel
        adminPage={"table"}
        animate={props.animate}
        tableData={tableData}
        tableHead={th}
        tableSearchSelect={false}
        mobile={mobile}
        pageLabel={"Users List"}
        tableFilter={true}
        tableFilterData={tableFilterData}
        setTableFilterOutcomingData={setTableFilterOutcomingData}
        paginationCurrent={pageNow}
        paginationTotal={pageAll}
        paginationEvent={(page) => setPageNow(page)}
      />
      <ToastContainer theme="dark" />
    </>
  );
};

export default UsersList;
