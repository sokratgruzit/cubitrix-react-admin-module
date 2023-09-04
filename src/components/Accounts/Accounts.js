import React from "react";
import { useState, useEffect } from "react";
import {
  AdminPanel,
  MoreButton,
  Switches,
  Popup,
  Input,
  Button,
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import useAxios from "../../hooks/useAxios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import styles from "./Accounts.module.css";

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
    active: "",
    _id: "",
    loan: false,
    loanAdmin: true,
    trade: false,
    tradeAdmin: true,
    staking: false,
    stakingAdmin: true,
    referral: false,
    referralAdmin: true,
    notify: false,
    notifyAdmin: true,
  });
  const [accountUpdateLoading, setAccountUpdateLoading] = useState(false);

  let tableExpandFunc = (id) => {
    if (id !== tableExpand) {
      setTableExpand(id);
    } else {
      setTableExpand(null);
    }
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

    // Convert boolean values to strings in accountData object
    const stringifiedAccountData = {
      ...accountData,
      loan: accountData.loan.toString(),
      loanAdmin: accountData.loanAdmin.toString(),
      notify: accountData.notify.toString(),
      notifyAdmin: accountData.notifyAdmin.toString(),
      referral: accountData.referral.toString(),
      referralAdmin: accountData.referralAdmin.toString(),
      staking: accountData.staking.toString(),
      stakingAdmin: accountData.stakingAdmin.toString(),
      trade: accountData.trade.toString(),
      tradeAdmin: accountData.tradeAdmin.toString(),
    };

    axios
      .post("/api/data/edit-account", { accountData: stringifiedAccountData })
      .then((res) => {
        setAccountUpdateLoading(false);
        fetchData();

        // setTd((prev) =>
        //   prev.map((item) =>
        //     item.address === res.data.address ? { ...item, ...res.data } : item,
        //   ),
        // );
        setActiveItem(null);
        notify("Account Edited");
      })
      .catch((err) => {
        setAccountUpdateLoading(false);
        notify("Something went wrong please try again");
      });
  }

  const notify = (msg) => {
    toast(msg);
  };

  let dynamicDropDown = (item) => {
    let dropdownData = [
      {
        id: 0,
        list: [
          {
            title: "Edit",
            onClick: () => {
              setActiveItem(item);
            },
          },
        ],
      },
    ];
    return dropdownData;
  };

  const switches = [
    {
      title: "Active",
      type: "sm-switches",
      value: accountData.active,
      onChange: (e) =>
        setAccountData((prevState) => ({ ...prevState, active: e.target.checked })),
    },
    {
      title: "Staking",
      type: "sm-switches",
      value: accountData.staking,
      onChange: (e) => {
        setAccountData((prevState) => ({ ...prevState, staking: e.target.checked }));
        if (accountData.staking) {
          setAccountData((prevState) => ({ ...prevState, stakingAdmin: false }));
        } else {
          setAccountData((prevState) => ({ ...prevState, stakingAdmin: true }));
        }
      },
    },
    {
      title: "Trade",
      type: "sm-switches",
      value: accountData.trade,
      onChange: (e) => {
        setAccountData((prevState) => ({ ...prevState, trade: e.target.checked }));
        if (accountData.trade) {
          setAccountData((prevState) => ({ ...prevState, tradeAdmin: false }));
        } else {
          setAccountData((prevState) => ({ ...prevState, tradeAdmin: true }));
        }
      },
    },
    {
      title: "Loan",
      type: "sm-switches",
      value: accountData.loan,
      onChange: (e) => {
        setAccountData((prevState) => ({ ...prevState, loan: e.target.checked }));
        if (accountData.loan) {
          setAccountData((prevState) => ({ ...prevState, loanAdmin: false }));
        } else {
          setAccountData((prevState) => ({ ...prevState, loanAdmin: true }));
        }
      },
    },
    {
      title: "Referral",
      type: "sm-switches",
      value: accountData.referral,
      onChange: (e) => {
        setAccountData((prevState) => ({ ...prevState, referral: e.target.checked }));
        if (accountData.referral) {
          setAccountData((prevState) => ({ ...prevState, referralAdmin: false }));
        } else {
          setAccountData((prevState) => ({ ...prevState, referralAdmin: true }));
        }
      },
    },
    {
      title: "Notifications",
      type: "sm-switches",
      value: accountData.notify,
      onChange: (e) => {
        setAccountData((prevState) => ({ ...prevState, notify: e.target.checked }));
        if (accountData.notify) {
          setAccountData((prevState) => ({ ...prevState, notifyAdmin: false }));
        } else {
          setAccountData((prevState) => ({ ...prevState, notifyAdmin: true }));
        }
      },
    },
  ];

  const switchesWithBooleanToString = switches.map((item) => {
    const valueAsString = item.value ? "true" : "false";
    return { ...item, value: valueAsString };
  });

  const inputs = [
    // {
    //   title: "External",
    //   name: "externalAddress",
    //   type: "default",
    //   placeholder: "External",
    //   value: accountData?.externalAddress, // ??
    //   onChange: (e) =>
    //     setAccountData((prev) => ({
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     })),
    // },
    // {
    //   title: "Main",
    //   name: "mainAddress",
    //   type: "default",
    //   placeholder: "Main",
    //   value: accountData?.mainAddress,
    //   onChange: (e) =>
    //     setAccountData((prev) => ({
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     })),
    // },
    // {
    //   title: "System",
    //   name: "systemAddress",
    //   type: "default",
    //   placeholder: "System",
    //   value: accountData?.systemAddress,
    //   onChange: (e) =>
    //     setAccountData((prev) => ({
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     })),
    // },
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
    // {
    //   title: "Date of birth",
    //   name: "dateOfBirth",
    //   type: "default",
    //   placeholder: "Date",
    //   value: accountData?.dateOfBirth,
    //   onChange: (e) =>
    //     setAccountData((prev) => ({
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     })),
    // },
  ];

  let tableData;
  tableData = td.map((item) => {
    return (
      <div
        key={item.id + item.address}
        className={`table-parent ${mobileExpand === item.address ? "active" : ""}`}
        onClick={() => {
          mobileExpandFunc(item.address);
        }}>
        <div className="table">
          <div
            className={`td ${th[0].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}>
            <span>{item.account_category}</span>
          </div>
          <div
            onClick={() => {
              tableExpandFunc(item.address);
            }}
            className={`td expand ${
              accountType !== null ||
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
            style={{ width: `${mobile ? th[2].mobileWidth : th[2].width}%` }}>
            <svg
              className={styles.balanceCurrency}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C28.0115 27.066 27.2694 24.3097 25.8636 21.8804C24.4577 19.4511 22.4375 17.4344 20.0058 16.0328C17.5759 17.4357 15.5582 19.4538 14.1556 21.8839C12.753 24.3141 12.0151 27.0708 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z"
                fill="#C38C5C"
              />
              <path
                d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C29.3536 23.7849 29.6278 9.68772 20.0175 2.0018C20.0099 1.9994 20.0018 1.9994 19.9942 2.0018C10.3745 9.68772 10.6672 23.7875 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z"
                fill="white"
              />
            </svg>
            <span>
              {item?.inner_accounts[0]?.balance?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            className={`td ${th[3].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}>
            <svg
              className={styles.balanceCurrency}
              viewBox="0.004 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z"
                  fill="#f7931a"></path>
                <path
                  d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z"
                  fill="#ffffff"></path>
              </g>
            </svg>
            <span>
              {item?.inner_accounts[0]?.assets?.btc?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            className={`td ${th[4].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}>
            <svg
              className={styles.balanceCurrency}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32">
              <g fill="none" fillRule="evenodd">
                <circle cx="16" cy="16" r="16" fill="#627EEA"></circle>
                <g fill="#FFF" fillRule="nonzero">
                  <path fillOpacity="0.602" d="M16.498 4v8.87l7.497 3.35z"></path>
                  <path d="M16.498 4L9 16.22l7.498-3.35z"></path>
                  <path fillOpacity="0.602" d="M16.498 21.968v6.027L24 17.616z"></path>
                  <path d="M16.498 27.995v-6.028L9 17.616z"></path>
                  <path
                    fillOpacity="0.2"
                    d="M16.498 20.573l7.497-4.353-7.497-3.348z"></path>
                  <path fillOpacity="0.602" d="M9 16.22l7.498 4.353v-7.701z"></path>
                </g>
              </g>
            </svg>
            <span>
              {item?.inner_accounts[0]?.assets?.eth?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            className={`td ${th[5].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}>
            <svg
              className={styles.balanceCurrency}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32">
              <g fill="none">
                <circle cx="16" cy="16" r="16" fill="#3E73C4"></circle>
                <g fill="#FFF">
                  <path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z"></path>
                  <path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z"></path>
                </g>
              </g>
            </svg>
            <span>{item?.inner_accounts[0]?.assets?.usdc}</span>
          </div>
          <div
            className={`td ${th[6].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[6].mobileWidth : th[6].width}%` }}>
            <svg
              className={styles.balanceCurrency}
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              fill="#000"
              stroke="#000"
              version="1.1"
              viewBox="0 0 512 512"
              xmlSpace="preserve">
              <g>
                <g fill="#FED159">
                  <path d="M223.419 256.1L43.122 256.1 9.565 393.549 256.975 393.549z"></path>
                  <path d="M470.828 256.1L290.531 256.1 256.975 393.549 504.384 393.549z"></path>
                  <path d="M347.124 118.65L166.826 118.65 133.27 256.1 380.68 256.1z"></path>
                </g>
                <g fill="#F6C454">
                  <path d="M166.826 118.65L133.27 256.1 171.069 256.1 204.625 118.65z"></path>
                  <path d="M43.122 256.1L9.565 393.549 47.364 393.549 80.92 256.1z"></path>
                  <path d="M290.531 256.1L256.975 393.549 294.774 393.549 328.33 256.1z"></path>
                </g>
                <g fill="#FFE4A9">
                  <path d="M347.124 118.65L380.68 256.1 342.881 256.1 309.325 118.65z"></path>
                  <path d="M470.828 256.1L504.384 393.549 466.586 393.549 433.03 256.1z"></path>
                  <path d="M223.419 256.1L256.975 393.549 219.176 393.549 185.62 256.1z"></path>
                </g>
                <path d="M511.755 391.412L478.2 253.962a8.591 8.591 0 00-8.345-6.553h-83.403l-31.956-130.897a8.591 8.591 0 00-8.345-6.553h-180.3a8.59 8.59 0 00-8.345 6.553l-9.168 37.556a8.59 8.59 0 006.308 10.383 8.587 8.587 0 0010.383-6.308l7.568-31.003h166.807l29.36 120.268H143.235l14.48-59.313a8.59 8.59 0 00-16.691-4.075l-15.474 63.39H42.147a8.59 8.59 0 00-8.345 6.553L.245 391.412a8.59 8.59 0 008.346 10.628h392.88a8.591 8.591 0 000-17.182H266.94l29.362-120.268h166.807l29.36 120.268h-60.071a8.591 8.591 0 000 17.182h71.012a8.592 8.592 0 008.345-10.628zm-492.224-6.553l29.362-120.268H215.7l29.36 120.268H19.531zM256 357.227l-22.615-92.637h45.231L256 357.227z"></path>
              </g>
            </svg>
            <span>
              {item?.inner_accounts[0]?.assets?.gold?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            className={`td ${th[7].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[7].mobileWidth : th[7].width}%` }}>
            <svg
              className={styles.balanceCurrency}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64">
              <g>
                <g>
                  <path
                    fill="#e5c9f3"
                    d="M5.04 25.35c.01.27.12.53.3.73L31.3 52.85c.15.15.35.24.56.26h.3c.21-.03.4-.12.55-.26l25.96-26.77c.19-.2.31-.45.34-.73l-26.74-5.09-27.23 5.09z"></path>
                  <path
                    fill="#d6b1ed"
                    d="M41.46 25.35H23.04l8.8 27.76c.1.02.2.02.3 0l9.31-27.76z"></path>
                  <path
                    fill="#d6b1ed"
                    d="M15.47 11.07c-.28.14-.53.35-.72.6L5.24 24.53c-.16.24-.23.53-.2.81h53.95c.03-.29-.05-.59-.22-.83l-9.08-12.83c-.18-.26-.42-.46-.7-.61H15.47z"></path>
                  <path
                    fill="#e5c9f3"
                    d="M32.23 10.86l-9.18 14.48h18.41l-9.23-14.48z"></path>
                  <path
                    fill="#ca96e5"
                    d="M32.23 10.86l9.23 14.48 7.53-14.26c-.28-.14-.59-.22-.9-.22H32.23z"></path>
                  <path
                    fill="#ca96e5"
                    d="M16.37 10.86c-.31 0-.62.07-.9.21l7.58 14.27 9.18-14.48H16.37z"></path>
                  <path d="M50.51 11.11a2.972 2.972 0 00-2.42-1.25H16.37c-.95 0-1.85.46-2.42 1.22L4.43 23.94c-.64.87-.56 2.06.19 2.83l25.95 26.77c.74.76 1.97.85 2.85 0l25.95-26.77c.74-.77.84-1.96.22-2.83l-9.08-12.83zM40.07 26.35l-8.05 24-7.61-24h15.66zm-15.21-2l7.37-11.62 7.4 11.62H24.86zm9.19-12.49h13.39l-6.07 11.5-7.32-11.5zm-10.93 11.5l-6.1-11.5h13.39l-7.29 11.5zm6.64 26.47L6.99 26.35h15.32l7.45 23.48zm12.42-23.48H57l-22.67 23.4 7.85-23.4zm.94-2l6.11-11.58 8.2 11.58H43.12zm-27.9-11.62l6.17 11.62H6.62l8.6-11.62z"></path>
                </g>
              </g>
            </svg>
            <span>
              {item?.inner_accounts[0]?.assets?.platinum?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            className={`td ${th[8].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[8].mobileWidth : th[8].width}%` }}>
            <span>{moment(item.createdAt).format("LL")}</span>
            <div style={{ display: "flex", marginLeft: "auto" }} className="table-more">
              <MoreButton dropdownData={dynamicDropDown(item)} />
            </div>
          </div>
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
            <div className={`${"td"} ${styles.customTd}`}>
              <div className="mobile-ttl">
                <svg
                  className={styles.balanceCurrency}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C28.0115 27.066 27.2694 24.3097 25.8636 21.8804C24.4577 19.4511 22.4375 17.4344 20.0058 16.0328C17.5759 17.4357 15.5582 19.4538 14.1556 21.8839C12.753 24.3141 12.0151 27.0708 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z"
                    fill="#C38C5C"
                  />
                  <path
                    d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C29.3536 23.7849 29.6278 9.68772 20.0175 2.0018C20.0099 1.9994 20.0018 1.9994 19.9942 2.0018C10.3745 9.68772 10.6672 23.7875 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span>~ {item?.inner_accounts[0]?.balance}</span>
            </div>
            <div className={`${"td"} ${styles.customTd}`}>
              <div className="mobile-ttl">
                <svg
                  className={styles.balanceCurrency}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32">
                  <g fill="none" fillRule="evenodd">
                    <circle cx="16" cy="16" r="16" fill="#627EEA"></circle>
                    <g fill="#FFF" fillRule="nonzero">
                      <path fillOpacity="0.602" d="M16.498 4v8.87l7.497 3.35z"></path>
                      <path d="M16.498 4L9 16.22l7.498-3.35z"></path>
                      <path
                        fillOpacity="0.602"
                        d="M16.498 21.968v6.027L24 17.616z"></path>
                      <path d="M16.498 27.995v-6.028L9 17.616z"></path>
                      <path
                        fillOpacity="0.2"
                        d="M16.498 20.573l7.497-4.353-7.497-3.348z"></path>
                      <path fillOpacity="0.602" d="M9 16.22l7.498 4.353v-7.701z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <span>~ {item?.inner_accounts[0]?.assets?.eth}</span>
            </div>
            <div className={`${"td"} ${styles.customTd}`}>
              <div className="mobile-ttl">
                <svg
                  className={styles.balanceCurrency}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32">
                  <g fill="none">
                    <circle cx="16" cy="16" r="16" fill="#3E73C4"></circle>
                    <g fill="#FFF">
                      <path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z"></path>
                      <path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <span>~ {item?.inner_accounts[0]?.assets?.usdc}</span>
            </div>

            <div className={`${"td"} ${styles.customTd}`}>
              <div className="mobile-ttl">
                <svg
                  className={styles.balanceCurrency}
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  fill="#000"
                  stroke="#000"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve">
                  <g>
                    <g fill="#FED159">
                      <path d="M223.419 256.1L43.122 256.1 9.565 393.549 256.975 393.549z"></path>
                      <path d="M470.828 256.1L290.531 256.1 256.975 393.549 504.384 393.549z"></path>
                      <path d="M347.124 118.65L166.826 118.65 133.27 256.1 380.68 256.1z"></path>
                    </g>
                    <g fill="#F6C454">
                      <path d="M166.826 118.65L133.27 256.1 171.069 256.1 204.625 118.65z"></path>
                      <path d="M43.122 256.1L9.565 393.549 47.364 393.549 80.92 256.1z"></path>
                      <path d="M290.531 256.1L256.975 393.549 294.774 393.549 328.33 256.1z"></path>
                    </g>
                    <g fill="#FFE4A9">
                      <path d="M347.124 118.65L380.68 256.1 342.881 256.1 309.325 118.65z"></path>
                      <path d="M470.828 256.1L504.384 393.549 466.586 393.549 433.03 256.1z"></path>
                      <path d="M223.419 256.1L256.975 393.549 219.176 393.549 185.62 256.1z"></path>
                    </g>
                    <path d="M511.755 391.412L478.2 253.962a8.591 8.591 0 00-8.345-6.553h-83.403l-31.956-130.897a8.591 8.591 0 00-8.345-6.553h-180.3a8.59 8.59 0 00-8.345 6.553l-9.168 37.556a8.59 8.59 0 006.308 10.383 8.587 8.587 0 0010.383-6.308l7.568-31.003h166.807l29.36 120.268H143.235l14.48-59.313a8.59 8.59 0 00-16.691-4.075l-15.474 63.39H42.147a8.59 8.59 0 00-8.345 6.553L.245 391.412a8.59 8.59 0 008.346 10.628h392.88a8.591 8.591 0 000-17.182H266.94l29.362-120.268h166.807l29.36 120.268h-60.071a8.591 8.591 0 000 17.182h71.012a8.592 8.592 0 008.345-10.628zm-492.224-6.553l29.362-120.268H215.7l29.36 120.268H19.531zM256 357.227l-22.615-92.637h45.231L256 357.227z"></path>
                  </g>
                </svg>
              </div>
              <span>~ {item?.inner_accounts[0]?.assets?.gold}</span>
            </div>
            <div className={`${"td"} ${styles.customTd}`}>
              <div className="mobile-ttl">
                <svg
                  className={styles.balanceCurrency}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64">
                  <g>
                    <g>
                      <path
                        fill="#e5c9f3"
                        d="M5.04 25.35c.01.27.12.53.3.73L31.3 52.85c.15.15.35.24.56.26h.3c.21-.03.4-.12.55-.26l25.96-26.77c.19-.2.31-.45.34-.73l-26.74-5.09-27.23 5.09z"></path>
                      <path
                        fill="#d6b1ed"
                        d="M41.46 25.35H23.04l8.8 27.76c.1.02.2.02.3 0l9.31-27.76z"></path>
                      <path
                        fill="#d6b1ed"
                        d="M15.47 11.07c-.28.14-.53.35-.72.6L5.24 24.53c-.16.24-.23.53-.2.81h53.95c.03-.29-.05-.59-.22-.83l-9.08-12.83c-.18-.26-.42-.46-.7-.61H15.47z"></path>
                      <path
                        fill="#e5c9f3"
                        d="M32.23 10.86l-9.18 14.48h18.41l-9.23-14.48z"></path>
                      <path
                        fill="#ca96e5"
                        d="M32.23 10.86l9.23 14.48 7.53-14.26c-.28-.14-.59-.22-.9-.22H32.23z"></path>
                      <path
                        fill="#ca96e5"
                        d="M16.37 10.86c-.31 0-.62.07-.9.21l7.58 14.27 9.18-14.48H16.37z"></path>
                      <path d="M50.51 11.11a2.972 2.972 0 00-2.42-1.25H16.37c-.95 0-1.85.46-2.42 1.22L4.43 23.94c-.64.87-.56 2.06.19 2.83l25.95 26.77c.74.76 1.97.85 2.85 0l25.95-26.77c.74-.77.84-1.96.22-2.83l-9.08-12.83zM40.07 26.35l-8.05 24-7.61-24h15.66zm-15.21-2l7.37-11.62 7.4 11.62H24.86zm9.19-12.49h13.39l-6.07 11.5-7.32-11.5zm-10.93 11.5l-6.1-11.5h13.39l-7.29 11.5zm6.64 26.47L6.99 26.35h15.32l7.45 23.48zm12.42-23.48H57l-22.67 23.4 7.85-23.4zm.94-2l6.11-11.58 8.2 11.58H43.12zm-27.9-11.62l6.17 11.62H6.62l8.6-11.62z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <span>~ {item?.inner_accounts[0]?.assets?.platinum}</span>
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[8].name}</div>
              <span>{moment(item.createdAt).format("LL")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (activeItem) {
      setAccountData({
        externalAddress: activeItem?.address,
        mainAddress: activeItem?.inner_accounts[0]?.address,
        systemAddress: activeItem?.inner_accounts[1]?.address,
        email: activeItem?.account_metas?.email,
        dateOfBirth: activeItem?.account_metas?.date_of_birth,
        _id: activeItem?._id,
        active: activeItem?.inner_accounts[0]?.active,
        loan: activeItem?.inner_accounts[0]?.extensions?.loan
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.loan)
          : false,
        loanAdmin: activeItem?.inner_accounts[0]?.extensions?.loanAdmin
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.loanAdmin)
          : false,
        trade: activeItem?.inner_accounts[0]?.extensions?.trade
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.trade)
          : false,
        tradeAdmin: activeItem?.inner_accounts[0]?.extensions?.tradeAdmin
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.tradeAdmin)
          : false,
        staking: activeItem?.inner_accounts[0]?.extensions?.staking
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.staking)
          : false,
        stakingAdmin: activeItem?.inner_accounts[0]?.extensions?.stakingAdmin
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.stakingAdmin)
          : false,
        referral: activeItem?.inner_accounts[0]?.extensions?.referral
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.referral)
          : false,
        referralAdmin: activeItem?.inner_accounts[0]?.extensions?.referralAdmin
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.referralAdmin)
          : false,
        notify: activeItem?.inner_accounts[0]?.extensions?.notify
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.notify)
          : false,
        notifyAdmin: activeItem?.inner_accounts[0]?.extensions?.notifyAdmin
          ? JSON.parse(activeItem?.inner_accounts[0]?.extensions?.notifyAdmin)
          : false,
      });
    }
  }, [activeItem]);

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

  useEffect(() => {
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
              _id: "",
            });
          }}
          popUpData={accountData}
          setPopUpData={setAccountData}
          popUpElement={
            <div className="transactions_popup_container">
              <div className="transactions-inputs">
                <div className={styles.wrap}>
                  {switches?.map((item, index) => {
                    return (
                      <div key={index} className={styles.row}>
                        <span>{item.title}</span>
                        <Switches
                          type={item.type}
                          value={item.value}
                          onChange={item.onChange}
                        />
                      </div>
                    );
                  })}
                </div>
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
