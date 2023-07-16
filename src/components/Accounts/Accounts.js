import React from "react";
import { useState, useEffect } from "react";
import { AdminPanel, MoreButton, Switches, Popup, Input, Button } from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import useAxios from "../../hooks/useAxios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const Accounts = (props) => {
  const axios = useAxios();
  const { tableFilterData, th, mobile, mobileExpandFunc, mobileExpand } =
    useTableParameters("Accounts");

  let defaultOutcomingData = {};
  const [tableFilterOutcomingData, setTableFilterOutcomingData] =
    useState(defaultOutcomingData);
  let [td, setTd] = useState([]);
  let [pageNow, setPageNow] = useState(1);
  let [pageAll, setPageAll] = useState(1);
  const [tableExpand, setTableExpand] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [accountData, setAccountData] = useState({
    externalAddress: "",
    mainAddress: "",
    systemAddress: "",
    email: "",
    dateOfBirth: "",
    _id: ""
  });
  const [accountUpdateLoading, setAccountUpdateLoading] = useState(false);


  const [updatedStatus, setUpdatedStatus] = useState({
    active: "",
    _id: ""
  });

  let tableExpandFunc = (id) => {
    if (id !== tableExpand) {
      setTableExpand(id);
    } else {
      setTableExpand(null);
    }
  };

  const updatedStatusHandler = async () => {
    // await axios
    // .post('/api/data/edit_user', {
    //   active: updatedStatus.active,
    //   _id: updatedStatus._id
    // })
    // .then((res) => {
    //   console.log(res);
    // })
    console.log(updatedStatus, 'updated status in handelr');
  };

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

  function accountEditHandler() {
    setAccountUpdateLoading(true);
    console.log(accountData, 'data');

    // axios
    //   .post("/api/data/edit-account", accountData)
    //   .then((res) => {
    //     setAccountUpdateLoading(false);
    //     // setTd((prev) =>
    //     //   prev.map((item) =>
    //     //     item.address === res.data.address ? { ...item, ...res.data } : item,
    //     //   ),
    //     // );
    //     // setActiveItem(null);
    //     // notify(res.statusText);
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     setAccountUpdateLoading(false);
    //     notify(err);
    //   });
  }

  const notify = (msg) => {
    toast(msg);
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
              setActiveItem(item);
            },
          }
        ],
      },
    ];
    return dropdownData;
  };

  const inputs = [
    {
      title: "External",
      name: "externalAddress",
      type: "default",
      placeholder: "External",
      value: accountData?.externalAddress, // ??
      onChange: (e) =>
        setAccountData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Main",
      name: "mainAddress",
      type: "default",
      placeholder: "Main",
      value: accountData?.mainAddress,
      onChange: (e) =>
        setAccountData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "System",
      name: "systemAddress",
      type: "default",
      placeholder: "System",
      value: accountData?.systemAddress,
      onChange: (e) =>
        setAccountData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Email",
      name: "email",
      type: "default",
      placeholder: "Email",
      value: accountData?.email,
      onChange: (e) =>
        setAccountData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Date of birth",
      name: "dateOfBirth",
      type: "default",
      placeholder: "Date",
      value: accountData?.dateOfBirth,
      onChange: (e) =>
        setAccountData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
  ];

  let tableData;
  tableData = td.map((item, index) => {
    return (
      <div
        key={item.id + item.address}
        className={`table-parent ${mobileExpand === item.address ? "active" : ""
          }`}
        onClick={() => {
          mobileExpandFunc(item.address);
        }}
      >
        <div className="table">
          <div
            className={`td ${th[0].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}
          >
            <span>{item.account_category}</span>
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
            style={{ width: `${mobile ? th[1].mobileWidth : th[1].width}%` }}
          >
            <div>
              <span>{item.address}</span>
              {item.inner_accounts.length > 0 ? (
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  accountType !== null ? (
                  ""
                ) : (
                  <div key={index}>
                    <i>{subItem.account_category}: </i>
                    {subItem.address} <span>{subItem.balance}</span>
                  </div>
                );
              })}
              <div>
                <i>email: </i> {item?.account_metas?.email}
              </div>
              {/* <div>
                <i>mobile: </i> {item?.account_metas?.mobile?.code}{" "}
                {item?.account_metas?.mobile?.number}
              </div>
              <div>
                <i>nationality: </i> {item?.account_metas?.nationality}
              </div> */}
              <div>
                <i>date of birth: </i>{" "}
                {moment(item?.account_metas?.date_of_birth).format("LL")}
              </div>

            </div>
          </div>
          <div
            className={`td ${th[2].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[2].mobileWidth : th[2].width}%` }}
          >
            <span>{item.balance ? item.balance : '-'}</span>
          </div>
          <div
            className={`td ${th[3].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}
          >
            <span>{moment(item.createdAt).format("LL")}</span>
          </div>
        </div>
        <div style={{ display: 'flex' }} className="table-more">
          <Switches
            type={"sm-switches"}
            value={item.active}
            onChange={(e) => {
              const newActiveStatus = e.target.checked;
              const updatedItem = { ...item, active: newActiveStatus };
              setTd(prev => prev.map(prevItem => (prevItem.address === item.address ? updatedItem : prevItem)));
              setUpdatedStatus({ status: newActiveStatus, _id: item._id });
            }}
          />
          <MoreButton dropdownData={dynamicDropDown(item)} />
        </div>
        {/* <div className="icon-place">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.299 1.33325L6.47141 5.16089C6.01937 5.61293 5.27968 5.61293 4.82764 5.16089L1 1.33325"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div> */}
        <div className="table-mobile">
          <div className="table-mobile-content">
            <div className="td">
              <div className="mobile-ttl">{th[3].name}</div>
              <span>{moment(item.createdAt).format("LL")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (updatedStatus.id !== "" && updatedStatus._id !== "") {
      updatedStatusHandler();
    }
  }, [updatedStatus]);

  useEffect(() => {
    if (activeItem) {
      console.log(activeItem);
      setAccountData({
        externalAddress: activeItem?.address,
        mainAddress: activeItem?.inner_accounts[0]?.address,
        systemAddress: activeItem?.inner_accounts[1]?.address,
        email: activeItem?.account_metas?.email,
        dateOfBirth: activeItem?.account_metas?.date_of_birth,
        _id: activeItem?._id
      });
      console.log(accountData, 'acc')
    }
  }, [activeItem]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .post("/api/data/filter", {
          type: "account",
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

  return (
    <>
      {activeItem && (
        <Popup
          label={`Edit Account`}
          inputs={inputs}
          handlePopUpClose={() => {
            setActiveItem(null);
            setAccountData({
              externalAddress: "",
              mainAddress: "",
              systemAddress: "",
              email: "",
              dateOfBirth: "",
              _id: ""
            });
          }}
          popUpData={accountData}
          setPopUpData={setAccountData}
          popUpElement={
            <div className="transactions_popup_container">
              <div className="transactions-inputs">
                {inputs?.map((params, index) => {
                  let selectedOption;
                  if (params.type === "lable-input-select") {
                    selectedOption = params?.options.find(
                      (option) => option.value === accountData[params?.name],
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
                            : accountData[params?.name] === undefined
                              ? params?.defaultAny
                              : accountData[params?.name]
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
                  label={accountUpdateLoading ? "Loading..." : "Save"}
                  size={"btn-lg"}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={accountEditHandler}
                  customStyles={{ width: "100%" }}
                  disabled={accountUpdateLoading}
                />
              </div>
            </div>
          }
        />
      )}
      <AdminPanel
        tableData={tableData}
        animate={props.animate}
        adminPage={"table"}
        tableHead={th}
        mobile={mobile}
        pageLabel={"Accounts"}
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

export default Accounts;
