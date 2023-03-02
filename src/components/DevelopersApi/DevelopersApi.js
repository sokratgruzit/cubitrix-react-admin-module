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
  const [developerApiActive, setDeveloperApiActive] = useState(false);
  const { connect, disconnect } = useConnect();

  const account = useSelector((state) => state.connect.account);

  var Router = "0xd472C9aFa90046d42c00586265A3F62745c927c0"; // Staking contract Address
  var tokenAddress = "0xE807fbeB6A088a7aF862A2dCbA1d64fE0d9820Cb"; // Staking Token Address
  const {
    approve,
    stake,
    unstake,
    harvest,
    handleDepositAmount,
    handleTimePeriod,
  } = useStake({ Router, tokenAddress });

  const { stakersInfo, stackContractInfo, stakersRecord, isAllowance } =
    useSelector((state) => state.stake);

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
      setSuccessResponse(response.data);
      console.log(successResponse);
    } catch (error) {
      console.log(error.response);
    }
  }

  let changeDevObject = (e) => {
    const { name, value } = e.target;
    setDevAppObject((prev) => ({ ...prev, [name]: value }));
  };

  let developerApiArray = [
    {
      title: "Loan",
      items: [
        {
          id: 0,
          description: "All public loan offers",
          route: "/api/loan/loan-market-offers",
          type: "GET",
          inputs: [],
        },
        {
          id: 1,
          description: "User created loans",
          route: "api/loan/user-created-loans/lenderAddress",
          type: "GET",
          inputs: [],
        },
        {
          id: 2,
          description: "User borrowed active loans",
          route: "api/loan/user-loans/borrowerAddress",
          type: "GET",
          inputs: [],
        },
        {
          id: 3,
          description: "Create new loan offer",
          route: "api/loan/create-loan",
          type: "POST",
          inputs: [
            {
              id: 20,
              title: "Lender",
              name: "lender",
              description: "Name of trade",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 4,
          description: "Delete loan offer",
          route: "api/loan/delete-loan-offer",
          type: "POST",
          inputs: [
            {
              title: "Id",
              name: "id",
              description: "id here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Lender",
              name: "lender",
              description: "lender here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 5,
          description: "Take loan",
          route: "api/loan/take-loan",
          type: "POST",
          inputs: [
            {
              title: "Id",
              name: "id",
              description: "id here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Borrower",
              name: "borrower",
              description: "borrower here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 6,
          description: "Repay loan",
          route: "api/loan/repay-loan",
          type: "POST",
          inputs: [
            {
              title: "Id",
              name: "id",
              description: "id here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Borrower",
              name: "borrower",
              description: "borrower here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 7,
          description: "Default loan",
          route: "api/loan/default-loan",
          type: "POST",
          inputs: [
            {
              title: "Id",
              name: "id",
              description: "id here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Borrower",
              name: "borrower",
              description: "borrower here",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
      ],
    },
    {
      title: "Referral",
      items: [
        {
          id: 8,
          description: "Generate referral codes",
          route: "api/referral/generate_referral_codes",
          type: "GET",
          inputs: [],
        },
        {
          id: 9,
          description: "Bind Code To Referral",
          route: "api/referral/bind_referral_to_user",
          type: "POST",
          inputs: [
            {
              title: "Address",
              name: "address",
              description: "Address",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 10,
          description: "Get Referral Info By address",
          route: "api/referral/get_referrals_by_address",
          type: "POST",
          inputs: [
            {
              title: "Address",
              name: "address",
              description: "Address",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 11,
          description: "Get Referral Info By Code",
          route: "api/referral/get_referrals_by_code",
          type: "POST",
          inputs: [
            {
              title: "Referral",
              name: "referral",
              description: "Referral code",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 12,
          description: "Assign Refferal To User",
          route: "api/referral/assign_refferal_to_user",
          type: "POST",
          inputs: [
            {
              title: "Address",
              name: "address",
              description: "User Address",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral",
              name: "referral",
              description: "Referral code",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 13,
          description: "Admin Setup",
          route: "api/referral/admin_setup",
          type: "POST",
          inputs: [
            {
              title: "Referral Activated",
              name: "referral_activated",
              description: '("all"/"none"/"uni"/"binary")',
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Uni Percentage",
              name: "referral_uni_percentage",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 1 Percentage",
              name: "referral_binary_percentage_lvl_1",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 1 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_1",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 2 Percentage",
              name: "referral_binary_percentage_lvl_2",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 2 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_2",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 3 Percentage",
              name: "referral_binary_percentage_lvl_3",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 3 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_3",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 4 Percentage",
              name: "referral_binary_percentage_lvl_4",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 4 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_4",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 5 Percentage",
              name: "referral_binary_percentage_lvl_5",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 5 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_5",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 6 Percentage",
              name: "referral_binary_percentage_lvl_6",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 6 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_6",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 7 Percentage",
              name: "referral_binary_percentage_lvl_7",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 7 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_7",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 8 Percentage",
              name: "referral_binary_percentage_lvl_8",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 8 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_8",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 9 Percentage",
              name: "referral_binary_percentage_lvl_9",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 9 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_9",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 10 Percentage",
              name: "referral_binary_percentage_lvl_10",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 10 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_10",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 11 Percentage",
              name: "referral_binary_percentage_lvl_11",
              description: "Percent",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: "Referral Binary Level 11 Max Bonus Amount",
              name: "referral_binary_max_amount_lvl_11",
              description: "Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 14,
          description: "Get Referral Options",
          route: "api/referral/get_referral_options",
          type: "GET",
          inputs: [],
        },
      ],
    },
    {
      title: "Staking",
      items: [
        {
          id: 0,
          description: "Stake your CML",
          route: "stake",
          type: "METAMASK",
          inputs: [
            {
              id: 0,
              title: "Amount",
              name: "depostAmount",
              description: "Deposit Amount",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
            {
              id: 1,
              title: "Timeperiod",
              name: "timeperiod",
              description: "Timeperiod",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                handleTimePeriod(e.target.value);
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 1,
          description: "Get stack contract info",
          route: "getStackerInfo_stackContract",
          type: "GET",
          inputs: [],
        },
        {
          id: 2,
          description: "Get account summary data",
          route: "getStackerInfo_accountSummary",
          type: "GET",
          inputs: [],
        },
        {
          id: 3,
          description: "Get stakers record",
          route: "getStackerInfo_stakersRecord",
          type: "GET",
          inputs: [],
        },
        {
          id: 3,
          description: "Unstake your record",
          route: "unstake",
          type: "METAMASK",
          inputs: [
            {
              id: 0,
              title: "Index",
              name: "index",
              description: "Stakers record index",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 3,
          description: "Harvest your record",
          route: "harvest",
          type: "METAMASK",
          inputs: [
            {
              id: 0,
              title: "Index",
              name: "index",
              description: "Stakers record index",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
      ],
    },
  ];

  const failResponse = {
    message: "No data was found",
    result: [],
    status: 0,
  };

  const handleTryOutSubmit = (route, type) => {
    // console.log("hihi");
    // console.log(devAppObject);
    setResponseActive(route);
    setDeveloperApiActive(route);
    // console.log(route);
    // console.log(type);
    if (type === "METAMASK") {
      if (route === "stake") {
        if (account && isAllowance) {
          approve();
        }
        if (account && !isAllowance) {
          stake();
        }
      }
      if (route === "unstake") {
        unstake(devAppObject.index);
      }
      if (route === "harvest") {
        harvest(devAppObject.index);
      }
    }

    if (type === "GET") {
      if (route === "getStackerInfo_stackContract") {
        return console.log(stackContractInfo);
      }
      if (route === "getStackerInfo_accountSummary") {
        return setSuccessResponse(stakersInfo);
      }
      if (route === "getStackerInfo_stakersRecord") {
        return setSuccessResponse(stakersRecord);
      }
      const queryString = buildQueryString(devAppObject);
      const fullUrl = `${route}${queryString ? `?${queryString}` : ""}`;

      makeRequest(type, fullUrl);
    }

    if (type === "POST" || type === "GET") {
      makeRequest(type, route, devAppObject);
    }
  };

  function buildQueryString(params) {
    let queryString = "";
    let first = true;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (first) {
          first = false;
        } else {
          queryString += "&";
        }
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
          params[key]
        )}`;
      }
    }

    return queryString;
  }

  console.log(successResponse);

  return (
    <>
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
        setSuccessResponse={setSuccessResponse}
        failResponse={failResponse}
        developerApiActive={developerApiActive}
        setDeveloperApiActive={setDeveloperApiActive}
        responseActive={responseActive}
        setResponseActive={setResponseActive}
        handleTryOutSubmit={handleTryOutSubmit}
      />
    </>
  );
};

export default DevelopersApi;
