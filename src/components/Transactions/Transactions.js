import React from "react";
import { useState, useEffect } from "react";
import {
  AdminPanel,
  Button,
  MoreButton,
  Popup,
} from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import useAxios from "../../hooks/useAxios";
import moment from "moment";

import styles from "./Transactions.module.css";

const Transactions = (props) => {
  const axios = useAxios();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("Transactions");

  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});

  let [td, setTd] = useState([]);
  let [pageNow, setPageNow] = useState(1);
  let [pageAll, setPageAll] = useState(1);
  const [transactionActions, setTransactionActions] = useState(false);
  let [tx_type, setTx_type] = useState("");
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState("");
  let [tx_currency, setTx_currency] = useState("ether");

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
  }
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

  let tableData;
  tableData = td.map((item, index) => {
    let dropdownData = [
      {
        id: 0,
        list: [
          {
            title: "Actions",
            onClick: () => {
              setTransactionActions(true);
              setSelectedTransaction(item);
            },
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
                  d="M1.57891 1.57891C2.69097 0.466855 4.35504 0.041687 6.50002 0.041687H11.5C13.645 0.041687 15.3091 0.466855 16.4211 1.57891C17.5332 2.69097 17.9584 4.35504 17.9584 6.50002V11.5C17.9584 13.645 17.5332 15.3091 16.4211 16.4211C15.3091 17.5332 13.645 17.9584 11.5 17.9584H6.50002C4.35504 17.9584 2.69097 17.5332 1.57891 16.4211C0.466855 15.3091 0.041687 13.645 0.041687 11.5V6.50002C0.041687 4.35504 0.466855 2.69097 1.57891 1.57891ZM2.4628 2.4628C1.69985 3.22574 1.29169 4.47833 1.29169 6.50002V11.5C1.29169 13.5217 1.69985 14.7743 2.4628 15.5372C3.22574 16.3002 4.47833 16.7084 6.50002 16.7084H11.5C13.5217 16.7084 14.7743 16.3002 15.5372 15.5372C16.3002 14.7743 16.7084 13.5217 16.7084 11.5V6.50002C16.7084 4.47833 16.3002 3.22574 15.5372 2.4628C14.7743 1.69985 13.5217 1.29169 11.5 1.29169H6.50002C4.47833 1.29169 3.22574 1.69985 2.4628 2.4628Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.984x 6.20011C13.2279 6.4444 13.2276 6.84013 12.9833 7.08399L8.25826 11.8007C8.01412 12.0444 7.61869 12.0442 7.37477 11.8003L5.01643 9.44194C4.77235 9.19786 4.77235 8.80213 5.01643 8.55805C5.26051 8.31398 5.65624 8.31398 5.90032 8.55805L7.8171 10.4748L12.1002 6.19933C12.3444 5.95547 12.7402 5.95582 12.984 6.20011Z"
                  fill="white"
                />
              </svg>
            ),
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
            <span className={`table-currency`}>{item.tx_currency}</span>
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
            className={`td ${th[7].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[7].mobileWidth : th[7].width}%` }}
          >
            <span
              className={`alert-status-box 
                            ${item.tx_status === "active" && "alert-status-blue"} 
                            ${item.tx_status === "active1" && "alert-status-yellow"}
                            ${item.tx_status === "pending" && "alert-status-green"}`}
            >
              {item.tx_status}
            </span>
          </div>
          <div
            className={`td ${th[8].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[8].mobileWidth : th[8].width}%` }}
          >
            <span
              className={`alert-status-box 
                            ${item.tx_type === "deposit" && "alert-status-blue"} 
                            ${item.tx_type === "withdraw" && "alert-status-yellow"}
                            ${item.tx_type === "transfer" && "alert-status-green"}`}
            >
              {item.tx_type}
            </span>
          </div>
        </div>
        <div className="table-more">
          <MoreButton dropdownData={dropdownData} />
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
                                ${item.tx_status === "active" && "alert-status-blue"} 
                                ${item.tx_status === "active1" && "alert-status-yellow"}
                                ${item.tx_status === "pending" && "alert-status-green"}`}
              >
                {item.tx_status}
              </span>
            </div>
            <div className="td">
              <div className="mobile-ttl">{th[8].name}</div>
              <span
                className={`alert-status-box 
                                ${item.tx_type === "deposit" && "alert-status-blue"} 
                                ${item.tx_type === "withdraw" && "alert-status-yellow"}
                                ${item.tx_type === "transfer" && "alert-status-green"}`}
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

  return (
    <>
      {transactionActions && (
        <Popup
          label={"Transaction Actions"}
          handlePopUpClose={() => setTransactionActions(false)}
          popUpElement={
            <div className={styles.background}>
              <div>
                <p>Deposit method: {selectedTransaction?.tx_options?.method}</p>
                <p>Transaction Hash: {selectedTransaction?.tx_hash}</p>
                <p>Transaction Amount: {selectedTransaction?.amount}</p>
                <div className={styles.actionsWrap}>
                  <Button
                    element="button"
                    label={`Accept`}
                    type="btn-primary"
                    size="btn-lg"
                    customStyles={{
                      width: "100%",
                      margin: "0",
                    }}
                    onClick={handleAccept}
                  />
                  <Button
                    element="button"
                    label={`Reject`}
                    type="btn-secondary"
                    size="btn-lg"
                    customStyles={{
                      width: "100%",
                      margin: "0",
                    }}
                    onClick={handleReject}
                  />
                  <Button
                    element="button"
                    label={`Delete`}
                    type="btn-secondary"
                    size="btn-lg"
                    customStyles={{
                      width: "100%",
                      margin: "0",
                    }}
                    onClick={handleDelete}
                  />
                </div>
              </div>
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
    </>
  );
};

export default Transactions;
