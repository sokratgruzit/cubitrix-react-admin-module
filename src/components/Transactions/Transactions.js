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

import styles from "./Transactions.module.css";

const Transactions = (props) => {
  const axios = useAxios();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("Transactions");

  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});

  let [td, setTd] = useState([]);
  let [pageNow, setPageNow] = useState(1);
  let [pageAll, setPageAll] = useState(1);
  let [tx_type, setTx_type] = useState("");
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState("");
  let [tx_currency, setTx_currency] = useState("ether");
  const [isReady, setIsReady] = useState(false);

  const [tx_status, setTx_status] = useState({
    tx_status: "",
    id: "",
  });

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  async function fetchData() {
    await axios
      .post("/api/data/filter", {
        type: "transactions",
        filter: tableFilterOutcomingData,
        page: pageNow,
      })
      .then((res) => {
        setPageAll(res.data.success.pages);
        setTd(res.data.success.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableFilterOutcomingData, pageNow]);
  async function newTx() {
    await axios
      .post("/api/transactions/make_transaction", {
        tx_type: tx_type,
        from: from,
        to: to,
        amount: amount,
        tx_currency: tx_currency,
      })
      .then((res) => {
        console.log(res);
        fetchData();
      });
  }

  const statusEditHandler = (item) => {
    setTx_status((prevState) => ({
      ...prevState,
      id: item._id
    }));
  };

  const statusSelectHandler = (value) => {
    setTx_status((prevState) => ({
      ...prevState,
      tx_status: value
    }));
    editStatus();
  };

  const notify = (res) => {
    toast(`${res}`);
  };

  const editStatus = async () => {
    axios
      .post("/api/data/change_transaction_status", {
        _id: tx_status.id,
        tx_status: tx_status.tx_status
      })
      .then((res) => {
        console.log(res);
        notify(res.statusText)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let statuses = [
    {
      name: "Approved",
      value: "approved",
    },
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "Cancelled",
      value: "cancelled",
    },
  ];

  let tableData;
  tableData = td.map((item, index) => {
    let dropdownData = [
      {
        id: 0,
        list: [
          {
            title: "Edit", // here to edit whole transaction by popup
            onClick: () => {
              setSelectedTransaction(item);
            },
          },
        ],
      },
    ];

    return (
      <div
        key={index}
        className={`table-parent ${mobileExpand === index ? "active" : ""}`}
        onClick={() => {
          mobileExpandFunc(index);
        }}
      >
        <div className="table">
          <div
            className={`td ${th[0].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}
          >
            <span>{item.tx_hash}</span>
          </div>
          <div
            className={`td ${th[1].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[1].mobileWidth : th[1].width}%` }}
          >
            <span>{item.from}</span>
          </div>
          <div
            className={`td ${th[2].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[2].mobileWidth : th[2].width}%` }}
          >
            <span>{item.to}</span>
          </div>
          <div
            className={`td ${th[3].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}
          >
            <span>{item.amount}</span>
            <span className={`table-currency`}>
              {item?.tx_options?.account_category_from ?? "ATR"}
            </span>
          </div>
          <div
            className={`td ${th[4].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
          >
            <span>{item?.tx_fee}</span>
            <span className={`table-currency`}>{item.tx_fee_currency}</span>
          </div>
          <div
            className={`td ${th[5].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}
          >
            <span>{item.domination}</span>
          </div>
          <div
            className={`td ${th[6].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[6].mobileWidth : th[6].width}%` }}
          >
            <span>{moment(item.createdAt).format("LL")}</span>
          </div>
          <div
            onClick={() => statusEditHandler(item)}
            className={`td ${th[7].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[7].mobileWidth : th[7].width}%` }}
          >
            {item.type === "payment" ? (
              <span
                // here edit in table ()
                className={`alert-status-box 
                            ${item.tx_status === "active" && "alert-status-blue"} 
                            ${item.tx_status === "active1" && "alert-status-yellow"}
                            ${item.tx_status === "pending" && "alert-status-green"}`}>
                {item.tx_status}
              </span>
            ) : (
              <Input
                type={"lable-input-select"}
                icon={false}
                // selectData={selectData}
                emptyFieldErr={false}
                defaultData={statuses}
                // label={"edit status"}
                selectHandler={statusSelectHandler}
                value={item.tx_status}
                active={true}
                // status={"warning"}
                // statusCard={
                //   <HelpText
                //     status={"error"}
                //     title={"your text"}
                //     fontSize={"font-12"}
                //     icon={true}
                //   />
                // }
                // title={"your text"}
                color={"#FFA726"}
              // customStyles={{ width: "320px" }}
              />
            )}
          </div>
          <div
            className={`td ${th[8].mobileWidth ? true : false}`}
            style={{
              width: `${mobile ? th[8].mobileWidth : th[8].width}%`,
              paddingRight: "0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              className={`alert-status-box 
                            ${item.tx_type === "deposit" && "alert-status-blue"
                } 
                            ${item.tx_type === "withdraw" &&
                "alert-status-yellow"
                }
                            ${item.tx_type === "transfer" &&
                "alert-status-green"
                }`}
            >
              {item.tx_type}
            </span>
            <div style={{ display: "flex" }} className="table-more">
              <MoreButton dropdownData={dropdownData} />
            </div>
          </div>
        </div>
        <div className="icon-place">
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
              <span>{moment(item.createdAt).format("LL")}</span>
            </div>

            <div className="td">
              <div className="mobile-ttl">{th[7].name}</div>
              <span
                className={`alert-status-box 
                                ${item.tx_status === "active" &&
                  "alert-status-blue"
                  } 
                                ${item.tx_status === "active1" &&
                  "alert-status-yellow"
                  }
                                ${item.tx_status === "pending" &&
                  "alert-status-green"
                  }`}
              >
                {item.tx_status}
              </span>
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[8].name}</div>
              <span
                className={`alert-status-box 
                                ${item.tx_type === "deposit" &&
                  "alert-status-blue"
                  } 
                                ${item.tx_type === "withdraw" &&
                  "alert-status-yellow"
                  }
                                ${item.tx_type === "transfer" &&
                  "alert-status-green"
                  }`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  async function handleAcceptToken() {
    axios
      .post("/api/content/accept_deposit_request", {
        _id: "646b490aae91366a0257063e",
        tx_hash: "0x0",
        tx_status: "active",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAccept = () => {
    // code to accept the transaction
  };

  const handleReject = () => {
    // code to reject the transaction
  };

  const handleDelete = () => {
    // code to delete the transaction
  };

  const addTransactionSelects = [
    {
      name: "Transaction Type",
      value: "tx_type",
      options: [
        {
          name: "Approved",
          value: "approved",
        },
        {
          name: "Pending",
          value: "pending",
        },
        {
          name: "Cancelled",
          value: "cancelled",
        },
      ],
    },
    {
      name: "Tranx Currency",
      value: "tx_currency",
      options: [
        {
          name: "ether",
          value: "ether",
        },
      ],
    },
  ];

  const [popUpData, setPopUpData] = useState({
    tx_type: "",
    from: "",
    to: "",
    amount: "",
    tx_status: "",
    tx_hash: "",
  });

  const inputs = [
    {
      title: "Transaction hash",
      name: "tx_hash",
      type: "default",
      placeholder: "hash",
      value: popUpData.tx_hash,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Select Transaction type",
      name: "tx_type",
      type: "lable-input-select",
      options: [
        { name: "Deposit", value: "deposit" },
        { name: "Bonus", value: "bonus" },
        { name: "Withdraw", value: "withdraw" },
        { name: "Transfer", value: "transfer" },
        { name: "Payment", value: "payment" },
        { name: "Internal transfer", value: "internal_transfer" },
      ],
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Select Transaction type",
      name: "tx_status",
      type: "lable-input-select",
      options: [
        { name: "Approved", value: "approved" },
        { name: "Pending", value: "pending" },
        { name: "Canceled", value: "canceled" },
      ],
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Address from",
      name: "from",
      type: "default",
      placeholder: "address",
      value: popUpData.from,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Address to",
      name: "to",
      type: "default",
      placeholder: "address",
      value: popUpData.to,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Transfer amount",
      name: "amount",
      type: "default",
      rightText: "ATR",
      placeholder: "enter",
      value: popUpData.amount,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
  ];

  useEffect(() => {
    if (selectedTransaction) {
      setPopUpData({
        tx_type: selectedTransaction.tx_type,
        tx_status: selectedTransaction.tx_status,
        from: selectedTransaction.from,
        to: selectedTransaction.to,
        amount: selectedTransaction.amount,
        tx_currency: selectedTransaction.tx_currency,
        tx_hash: selectedTransaction.tx_hash,
      });
    }
  }, [selectedTransaction]);

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

  function handleTransactionEdit() {
    console.log(popUpData);
  }

  return (
    <>
      {selectedTransaction && (
        <Popup
          label={`Edit Transaction`}
          inputs={inputs}
          handlePopUpClose={() => setSelectedTransaction(null)}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          popUpElement={
            <div className="transactions_popup_container">
              <div className="transactions-inputs">
                {inputs?.map((params, index) => {
                  let selectedOption;
                  if (params.type === "lable-input-select") {
                    selectedOption = params?.options.find(
                      (option) => option.value === popUpData[params?.name]
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
                      />
                      {params?.rightText && (
                        <span className="font-14 exchange-input-right">
                          {params?.rightText}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <Button
                label={"Save"}
                size={"btn-lg"}
                type={"btn-primary"}
                element={"button"}
                onClick={handleTransactionEdit}
                customStyles={{ width: "100%" }}
              />
            </div>
          }
        />
      )}
      <AdminPanel
        adminPage={"table"}
        tableData={tableData}
        pageLabel={"Transactions"}
        animate={props.animate}
        tableHead={th}
        mobile={mobile}
        tableHeader={1}
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

export default Transactions;
