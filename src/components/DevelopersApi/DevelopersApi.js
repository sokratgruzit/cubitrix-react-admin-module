import React, { useState, useEffect } from "react";

import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import { useConnect, useStake } from "@cubitrix/cubitrix-react-connect-module";
import { injected } from "../../connector";

import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";

import styles from "./DevelopersApi.module.css";

const DevelopersApi = () => {
  const axios = useAxios();
  const [devAppObject, setDevAppObject] = useState({});
  const [responseActive, setResponseActive] = useState(false);
  const [successResponse, setSuccessResponse] = useState({});
  const { connect, disconnect } = useConnect();

  const account = useSelector((state) => state.connect.account);

  var Router = "0xd472C9aFa90046d42c00586265A3F62745c927c0"; // Staking contract Address
  var tokenAddress = "0xE807fbeB6A088a7aF862A2dCbA1d64fE0d9820Cb"; // Staking Token Address
  const {
    approve,
    stake,
    // unstake,
    // harvest,
    // setMaxWithdrawal,
    // handleTimeperiodDate,
    handleDepositAmount,
    handleTimePeriod,
  } = useStake({ Router, tokenAddress });

  const {
    depositAmount,
    // balance,
    // stakersInfo,
    // stackContractInfo,
    // timeperiod,
    // stakersRecord,
    isAllowance,
    // loading,
    // timeperiodDate,
  } = useSelector((state) => state.stake);
  // console.log(depositAmount);

  async function makeRequest(method, url, data) {
    try {
      const options = {
        method,
        url,
      };
      if (data) {
        options.data = data;
      }
      const response = await axios(options);
      console.log(response);
      setSuccessResponse(response.data.result);
      // return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  let changeDevObject = (e) => {
    const { name, value } = e.target;
    setDevAppObject((prev) => ({ ...prev, [name]: value }));
  };

  let developerApiArray = [
    // {
    //   title: "Loan",
    //   items: [
    //     {
    //       id: 0,
    //       description: "All public loan offers",
    //       route: "/api/loan/loan-market-offers",
    //       type: "GET",
    //       inputs: [],
    //     },
    //     {
    //       id: 1,
    //       description: "User created loans",
    //       route: "api/loan/user-created-loans/lenderAddress",
    //       type: "GET",
    //       inputs: [],
    //     },
    //     {
    //       id: 2,
    //       description: "User borrowed active loans",
    //       route: "api/loan/user-loans/borrowerAddress",
    //       type: "GET",
    //       inputs: [],
    //     },
    //     {
    //       id: 3,
    //       description: "Create new loan offer",
    //       route: "api/loan/create-loan",
    //       type: "POST",
    //       inputs: [
    //         {
    //           id: 20,
    //           title: "Lender",
    //           name: "name",
    //           description: "Name of trade",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //       ],
    //     },
    //     {
    //       id: 4,
    //       description: "Delete loan offer",
    //       route: "api/loan/delete-loan-offer",
    //       type: "POST",
    //       inputs: [
    //         {
    //           title: "Id",
    //           name: "id",
    //           description: "id here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //         {
    //           title: "Lender",
    //           name: "lender",
    //           description: "lender here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //       ],
    //     },
    //     {
    //       id: 5,
    //       description: "Take loan",
    //       route: "api/loan/take-loan",
    //       type: "POST",
    //       inputs: [
    //         {
    //           title: "Id",
    //           name: "id",
    //           description: "id here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //         {
    //           title: "Borrower",
    //           name: "borrower",
    //           description: "borrower here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //       ],
    //     },
    //     {
    //       id: 6,
    //       description: "Repay loan",
    //       route: "api/loan/repay-loan",
    //       type: "POST",
    //       inputs: [
    //         {
    //           title: "Id",
    //           name: "id",
    //           description: "id here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //         {
    //           title: "Borrower",
    //           name: "borrower",
    //           description: "borrower here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //       ],
    //     },
    //     {
    //       id: 7,
    //       description: "Default loan",
    //       route: "api/loan/default-loan",
    //       type: "POST",
    //       inputs: [
    //         {
    //           title: "Id",
    //           name: "id",
    //           description: "id here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => changeDevObject(e),
    //         },
    //         {
    //           title: "Borrower",
    //           name: "borrower",
    //           description: "borrower here",
    //           value: "",
    //           required: true,
    //           validation: "text",
    //           onChange: (e) => {
    //             changeDevObject(e.target.name, e.target.value);
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Stake",
    //   items: [
    //     {
    //       id: 0,
    //       description: "Create new loan offer",
    //       route: "api/loan/create-loan",
    //       type: "METAMASK",
    //       inputs: [
    //         {
    //           id: 0,
    //           title: "Amount",
    //           name: "depostAmount",
    //           description: "Deposit Amount",
    //           value: "",
    //           required: true,
    //           validation: "number",
    //           onChange: (e) => {
    //             handleDepositAmount(e.target.value);
    //             changeDevObject(e);
    //           },
    //         },
    //         {
    //           id: 1,
    //           title: "Timeperiod",
    //           name: "timeperiod",
    //           description: "Timeperiod",
    //           value: "",
    //           required: true,
    //           validation: "number",
    //           onChange: (e) => {
    //             handleTimePeriod(e.target.value);
    //             changeDevObject(e);
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: "Transaction",
      items: [
        {
          id: 0,
          description: "Create new transaction",
          route: "api/transactions/make_transaction",
          type: "POST",
          inputs: [
            {
              title: "From",
              name: "from",
              description: "from here",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "To",
              name: "to",
              description: "to here",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Amount",
              name: "amount",
              description: "amount here",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Tx Type",
              name: "txType",
              description: "txType here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Tx Currency",
              name: "txCurrency",
              description: "txCurrency here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 1,
          description: "Update transaction status",
          route: "api/transactions/update_transaction_status",
          type: "POST",
          inputs: [
            {
              title: "Tx Hash",
              name: "tx_hash",
              description: "tx_hash here",
              value: "",
              required: true,
              validation: "hash",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Status",
              name: "status",
              description: "status here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
      ],
    },
  ];

  // <div
  //     onClick={() =>
  //         makeRequest("POST", "api/loan/default-loan", { id: "id", borrower: "0x567" })
  //     }
  // >
  //   Default loan
  // </div>

  const failResponse = {
    message: "No data was found",
    result: [],
    status: 0,
  };

  const handleTryOutSubmit = (route, type) => {
    console.log("hihi");
    console.log(devAppObject);
    setResponseActive(route);
    console.log(route);
    console.log(type);
    if (type === "METAMASK") {
      if (account && isAllowance) {
        approve();
      }
      if (account && !isAllowance) {
        stake();
      }
    } else {
      makeRequest(type, route, devAppObject);
    }
  };

  return (
    <>
      {account}
      {account ? (
        <div onClick={() => disconnect()}>disconnect</div>
      ) : (
        <div onClick={() => connect("metaMask", injected)}>connect</div>
      )}

      <AdminPanel
        adminPage={"developerApi"}
        developersApi={developerApiArray}
        developersApiValues={devAppObject}
        setDeveloperApiValues={setDevAppObject}
        successResponse={successResponse}
        failResponse={failResponse}
        responseActive={responseActive}
        setResponseActive={setResponseActive}
        handleTryOutSubmit={handleTryOutSubmit}
      />
    </>
  );
};

export default DevelopersApi;
