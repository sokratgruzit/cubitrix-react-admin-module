import React from "react";
import { useState, useEffect } from "react";
import {
  AdminPanel,
  Button,
  Input,
  MoreButton,
  Popup,
} from "@cubitrix/cubitrix-react-ui-module";

import moment from "moment";
import useAxios from "../../hooks/useAxios";
import { useTableParameters } from "../../hooks/useTableParameters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Withdrawals.module.css";

const Withdrawals = (props) => {
  const axios = useAxios();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("Withdrawals");

  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({
    selects: { tx_type: "withdraw" },
  });

  console.log(tableFilterOutcomingData?.selects);

  let [td, setTd] = useState([]);
  let [pageNow, setPageNow] = useState(1);
  let [pageAll, setPageAll] = useState(1);
  let [tx_type, setTx_type] = useState("");
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState("");
  let [tx_currency, setTx_currency] = useState("ether");
  const [isLoading, setIsLoading] = useState(false);

  const [tx_status, setTx_status] = useState({
    tx_status: "",
    id: "",
  });

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  async function fetchData() {
    setIsLoading(true);
    await axios
      .post("/api/data/filter", {
        type: "transactions",
        filter: tableFilterOutcomingData,
        page: pageNow,
      })
      .then((res) => {
        setPageAll(res.data.success.pages);
        setTd(res.data.success.data);
        setIsLoading(false);
        console.log(res);
      });
  }

  useEffect(() => {
    fetchData();
  }, [tableFilterOutcomingData, pageNow]);

  useEffect(() => {
    setPageNow(1);
  }, [tableFilterOutcomingData]);

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
      id: item._id,
    }));
  };

  const statusSelectHandler = (value) => {
    editStatus(value);
  };

  const notify = (msg) => {
    toast(msg);
  };

  async function editStatus(value) {
    let status = value;
    let id = tx_status.id;

    try {
      const response = await axios.post("/api/data/change_transaction_status", {
        _id: id,
        tx_status: status,
      });
      // console.log(response);
      notify("Transaction Status Changed");
      fetchData();
    } catch (error) {
      notify("Something Went Wrong");
      console.log(error);
    }
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
      name: "Canceled",
      value: "canceled",
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
        }}>
        <div className="table">
          <div
            className={`td ${th[0].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}>
            <span>{item.tx_hash}</span>
          </div>
          <div
            className={`td ${th[1].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[1].mobileWidth : th[1].width}%` }}>
            <span>{item.from}</span>
          </div>
          <div
            className={`td ${th[2].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[2].mobileWidth : th[2].width}%` }}>
            <span>{item.to}</span>
          </div>
          <div
            className={`td ${th[3].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}>
            <span>{item.amount}</span>
            <span className={`table-currency`}>
              {item?.tx_options?.currency?.toUpperCase() ?? "ATR"}
            </span>
          </div>
          <div
            className={`td ${th[4].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}>
            <span>{moment(item.createdAt).format("LL")}</span>
          </div>
          <div
            onClick={() => statusEditHandler(item)}
            className={`td ${th[5].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}>
            {item.tx_type === "payment" ? (
              <span
                className={`alert-status-box 
                   ${item.tx_status === "canceled" && "alert-status-blue"} 
                   ${item.tx_status === "pending" && "alert-status-yellow"}
                   ${item.tx_status === "approved" && "alert-status-green"}`}>
                {item.tx_status}
              </span>
            ) : (
              <>
                {item.tx_status === "pending" ? (
                  <Input
                    type={"lable-input-select"}
                    icon={false}
                    emptyFieldErr={false}
                    defaultData={statuses}
                    selectHandler={statusSelectHandler}
                    value={item.tx_status}
                    active={true}
                    color={"#FFA726"}
                  />
                ) : (
                  <span
                    className={`alert-status-box 
           ${item.tx_status === "canceled" && "alert-status-blue"} 
           ${item.tx_status === "pending" && "alert-status-yellow"}
           ${item.tx_status === "approved" && "alert-status-green"}`}>
                    {item.tx_status}
                  </span>
                )}
              </>
            )}
          </div>
          <div
            className={`td ${th[6].mobileWidth ? true : false}`}
            style={{
              width: `${mobile ? th[6].mobileWidth : th[6].width}%`,
              paddingRight: "0px",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <span
              className={`alert-status-box 
         ${item.tx_type === "deposit" && styles.depostit} 
         ${item.tx_type === "transfer" && styles.tranfer}
         ${item.tx_type === "withdraw" && styles.withdraw}
         ${item.tx_type === "payment" && styles.payment}
         ${item.tx_type === "internal_transfer" && styles.internal}
         ${item.tx_type === "exchange" && styles.exchange}
         ${item.tx_type === "bonus" && styles.bonus}
       `}>
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
          {/* mobile version is shit  */}
          <div className="table-mobile-content">
            <div className="td">
              <div className="mobile-ttl">{th[4].name}</div>
              <span className={`table-currency`}>
                {moment(item.createdAt).format("LL")}
              </span>
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[5].name}</div>
              {item.type === "payment" ? (
                <span
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
                  emptyFieldErr={false}
                  defaultData={statuses}
                  selectHandler={statusSelectHandler}
                  value={item.tx_status}
                  active={true}
                  color={"#FFA726"}
                />
              )}
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[6].name}</div>
              <span>{item.tx_type}</span>
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
        _id: selectedTransaction._id,
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

  const editTransactionHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", popUpData._id);
      formData.append("amount", popUpData.amount);
      formData.append("from", popUpData.from);
      formData.append("to", popUpData.to);
      formData.append("tx_currency", popUpData.tx_currency);
      formData.append("tx_hash", popUpData.tx_hash);
      formData.append("tx_status", popUpData.tx_status);
      formData.append("tx_type", popUpData.tx_type);

      const response = await axios.post("/api/data/edit_transaction", formData);
      notify("Transaction Edited");
      setSelectedTransaction(null);
    } catch (error) {
      notify("Something Went Wrong");
      console.log(error);
    }
  };

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
            <div
              style={{ flexDirection: "column" }}
              className="transactions_popup_container">
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
                onClick={editTransactionHandler}
                customStyles={{ width: "100%" }}
              />
            </div>
          }
        />
      )}
      <AdminPanel
        adminPage={"table"}
        tableData={tableData.length === 0 ? false : tableData}
        pageLabel={"Transactions"}
        dataLoading={isLoading}
        tableEmulator={false}
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

export default Withdrawals;
