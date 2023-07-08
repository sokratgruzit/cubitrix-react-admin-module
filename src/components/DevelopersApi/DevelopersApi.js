import React, { useState, useEffect } from "react";

import { AdminPanel, Button } from "@cubitrix/cubitrix-react-ui-module";
import { useConnect, useStake } from "@cubitrix/cubitrix-react-connect-module";
import { injected } from "../../connector";

import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";

import styles from "./DevelopersApi.module.css";

const DevelopersApi = (props) => {
  const axios = useAxios();
  const [devAppObject, setDevAppObject] = useState({});
  const [developerApiResponseActive, setDeveloperApiResponseActive] =
    useState(false);
  const [developerApiSuccessResponse, setDeveloperApiSuccessResponse] =
    useState({});
  const [developerApiErrorResponse, setDeveloperApiErrorResponse] =
    useState(false);
  const [developerApiActive, setDeveloperApiActive] = useState(false);
  const [developerApiLoading, setDeveloperApiLoading] = useState(false);
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
      setDeveloperApiErrorResponse(false);
      const response = await axios(options);
      if (response.data.result) {
        return setDeveloperApiSuccessResponse(response.data.result);
      }
      console.log(response);
      setDeveloperApiSuccessResponse(response.data);
    } catch (error) {
      setDeveloperApiErrorResponse(error.response);
    }
  }

  let changeDevObject = (e) => {
    const { name, value } = e.target;
    setDevAppObject((prev) => ({ ...prev, [name]: value }));
  };

  let developerApiArray = [
    {
      title: "Global Options",
      items: [
        {
          id: 0,
          description: "Update Fee Options",
          route: "api/transactions/update_options",
          type: "POST",
          inputs: [
            {
              id: 1,
              title: "Loan extensions fee",
              name: "loan_extensions_fee",
              description: "Fee",
              value: "",
              required: true,
              validation: "numbers",
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 2,
              title: "Trade extensions fee",
              name: "trade_extensions_fee",
              description: "Fee",
              value: "",
              required: true,
              validation: "numbers",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
      ],
    },
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
          route: "api/loan/user-created-loans",
          type: "GET",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description:
                "Address of lender (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 2,
          description: "User borrowed active loans",
          route: "api/loan/user-loans",
          type: "GET",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description:
                "Address of borrower (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 3,
          description: "Create new loan offer",
          route: "api/loan/create-loan",
          type: "POST",
          inputs: [
            {
              id: 20,
              title: "Address",
              name: "lender",
              description:
                "Address of lender (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 21,
              title: "Amount",
              name: "amount",
              description: "Amount of trade (E.g., 100)",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 22,
              title: "Interest",
              name: "interest",
              description: "Interest of trade (E.g., 10)",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 23,
              title: "Duration",
              name: "duration",
              description: "Duration of trade (E.g., 10)",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
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
              description: "Loan Id (E.g., 63ff0ffa2098cf36968b6659)",
              value: "",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Address",
              name: "lender",
              description:
                "Lender address (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              validation: "address",
              onChange: (e) => changeDevObject(e),
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
              description: "Loan Id (E.g., 63ff0ffa2098cf36968b6659)",
              value: "",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Address",
              name: "borrower",
              description:
                "Borrower address (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Collateral",
              name: "collateral",
              description: "collateral here (E.g., 100)",
              value: "",
              required: true,
              onChange: (e) => changeDevObject(e),
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
              description: "Loan Id (E.g., 63ff0ffa2098cf36968b6659)",
              value: "",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Address",
              name: "borrower",
              description:
                "Borrower address (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Amount",
              name: "amount",
              description: "amount here (E.g., 100)",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
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
              description: "id here (E.g., 63ff0ffa2098cf36968b6659)",
              value: "",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              title: "Address",
              name: "borrower",
              description:
                "Borrower address (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              value: "",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
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
      connectWallet: true,
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
              description: "Deposit Amount (Any Number)",
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
              description: "Timeperiod (each option represents value 0-4)",
              required: true,
              type: "select",
              selectPosition: "top",
              options: [
                {
                  name: "30 D",
                  value: 0,
                },
                {
                  name: "60 D",
                  value: 1,
                },
                {
                  name: "90 D",
                  value: 2,
                },
                {
                  name: "180 D",
                  value: 3,
                },
                {
                  name: "360 D",
                  value: 4,
                },
              ],
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
          type: "METAMASK_RES",
          inputs: [],
        },
        {
          id: 2,
          description: "Get account summary data",
          route: "getStackerInfo_accountSummary",
          type: "METAMASK_RES",
          inputs: [],
        },
        {
          id: 3,
          description: "Get stakers record",
          route: "getStackerInfo_stakersRecord",
          type: "METAMASK_RES",
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
              description:
                "Stakers record index (E.g., 0, 1 which is the index of the record)",
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
              description:
                "Stakers record index (E.g., 0, 1... which is the index of the record)",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
      ],
    },
    {
      title: "Transactions",
      items: [
        {
          id: 0,
          description: "Update Transaction Status",
          route: "api/transactions/update_transaction_status",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Tx Hash",
              name: "tx_hash",
              description:
                "Write transaction hash here, example (0xacslxthl8l7c9wsgrf3scioxy4xbaz28yz6tdwhfkjt9ghsmbpirheqyluqiwaek5d)",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
            {
              id: 1,
              title: "Status",
              name: "status",
              description: "Write transaction status here. Example (approve)",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                handleTimePeriod(e.target.value);
                changeDevObject(e);
              },
            },
          ],
        },
        {
          id: 1,
          description: "Make New Transaction",
          route: "api/transactions/make_transaction",
          type: "POST",
          inputs: [
            {
              id: 20,
              title: "Tx Type",
              name: "tx_type",
              description:
                "Write transaction type here, example ('deposit','transfer')",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
            {
              id: 21,
              title: "From",
              name: "from",
              description: "Write account name",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
            {
              id: 22,
              title: "To",
              name: "to",
              description: "Write account name",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
            {
              id: 23,
              title: "Amount",
              name: "amount",
              description: "Amount of transaction",
              value: "",
              required: true,
              validation: "number",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
            {
              id: 24,
              title: "Tx Currency",
              name: "tx_currency",
              description: "Name of transaction currency. Example(ETH)",
              value: "",
              required: true,
              validation: "text",
              onChange: (e) => {
                handleDepositAmount(e.target.value);
                changeDevObject(e);
              },
            },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      items: [
        {
          id: 0,
          description: "Login account",
          route: "api/accounts/login",
          type: "POST",
          inputs: [
            {
              title: "address",
              name: "address",
              description:
                "Creates basic accounts for address to a database. Address (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              required: true,
              validation: "address",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 1,
          description: "Get account data",
          route: "api/accounts/get_account",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description:
                "Address (E.g., 0xA3403975861B601aE111b4eeAFbA94060a58d0CA)",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 2,
          description: "Add personal info to account",
          route: "api/accounts/update_profile",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Name",
              name: "name",
              description: "Name",
              validation: "text",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 2,
              title: "Email",
              name: "email",
              description: "Email",
              validation: "email",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 3,
              title: "Mobile",
              name: "mobile",
              description: "Mobile",
              type: "mobile",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 4,
              title: "Date",
              name: "date_of_birth",
              description: "Date of birth",
              type: "date",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 5,
              title: "Nationality",
              name: "nationality",
              description: "Nationality",
              required: true,
              type: "select",
              selectType: "country",
              selectLabel: "Select Country",
              selectPosition: "top",
              onChange: (e) => changeDevObject(e),
            },
            // {
            //   id: 6,
            //   title: "Avatar",
            //   name: "avatar",
            //   description: "Avatar",
            //   required: true,
            //   type: "upload",
            //   onChange: (e) => changeDevObject(e),
            // },
          ],
        },
        {
          id: 3,
          description: "Resend verification email",
          route: "api/accounts/resend-email",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 4,
          description: "Verify Email",
          route: "api/accounts/verify",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Code",
              name: "code",
              description:
                "Code ( this code is in the link that is sent to your email )",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 5,
          description:
            "Create/Update Account password ( Only verrified accounts )",
          route: "api/accounts/update_profile_auth",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Current Password",
              name: "currentPassword",
              description: "Current Password ( only when updating password )",
              inputType: "password",
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 2,
              title: "New Password",
              name: "newPassword",
              description: "New password",
              validation: "password",
              required: true,
              inputType: "password",
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 6,
          description: "Login with email",
          route: "api/accounts/recovery/login",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Email",
              name: "email",
              description: "Email",
              validation: "email",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Password",
              name: "password",
              description: "Password",
              validation: "password",
              inputType: "password",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 7,
          description:
            "Create differnt accounts ( E.g., loan, staking, trade.)",
          route: "api/accounts/create_different_accounts",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Type",
              name: "type",
              description: "Type",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 8,
          description: "Forgot password ( send email )",
          route: "api/accounts/get-reset-password-email",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Email",
              name: "email",
              description:
                "Email ( reset password link will be sent to this email )",
              validation: "email",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 9,
          description: "Reset password ( via email link )",
          route: "api/accounts/reset-password",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Code",
              name: "code",
              description:
                "Code ( this code is in the link that is sent to your email )",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Password",
              name: "password",
              description: "Password ( new password )",
              validation: "password",
              inputType: "password",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 10,
          description: "Generate OTP (google 2fa)",
          route: "api/accounts/otp/generate",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 11,
          description: "Verify OTP (google 2fa)",
          route: "api/accounts/otp/verify",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Token",
              name: "token",
              description: "Token",
              validation: "text",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 12,
          description: "Validate OTP (google 2fa)",
          route: "api/accounts/otp/validate",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
            {
              id: 1,
              title: "Token",
              name: "token",
              description: "Token",
              validation: "text",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 13,
          description: "Disable OTP (google 2fa)",
          route: "api/accounts/otp/disable",
          type: "POST",
          inputs: [
            {
              id: 0,
              title: "Address",
              name: "address",
              description: "Address",
              validation: "address",
              required: true,
              onChange: (e) => changeDevObject(e),
            },
          ],
        },
        {
          id: 14,
          description: "Get all account",
          route: "api/accounts/roles",
          type: "GET",
          inputs: [],
        },
      ],
    },
  ];

  const developerApiFailResponse = {
    message: "No data was found",
    result: [],
    status: 0,
  };

  const handleDeveloperApiTryOut = (route, type) => {
    setDeveloperApiResponseActive(route);
    setDeveloperApiLoading(true);

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

    if (type === "METAMASK_RES") {
      if (route === "getStackerInfo_stackContract") {
        setDeveloperApiSuccessResponse(stackContractInfo);
      }
      if (route === "getStackerInfo_accountSummary") {
        setDeveloperApiSuccessResponse(stakersInfo);
      }
      if (route === "getStackerInfo_stakersRecord") {
        setDeveloperApiSuccessResponse(stakersRecord[0]);
      }
    }

    if (type === "GET") {
      const queryString = buildQueryString(devAppObject);
      const fullUrl = `${route}${queryString ? `?${queryString}` : ""}`;

      makeRequest(type, fullUrl);
    }

    if (type === "POST") {
      if (route === "api/transactions/update_options") {
        makeRequest(type, route, {
          type: "extension_options",
          object_value: {
            loan_extensions_fee: Number(devAppObject.loan_extensions_fee),
            trade_extensions_fee: Number(devAppObject.trade_extensions_fee),
          },
        });
        return;
      }
      makeRequest(type, route, devAppObject);
    }
    setDeveloperApiLoading(false);
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

  return (
    <>
      <AdminPanel
        adminPage={"developerApi"}
        animate={props.animate}
        developersApi={developerApiArray}
        developersApiValues={devAppObject}
        setDeveloperApiValues={setDevAppObject}
        developerApiSuccessResponse={developerApiSuccessResponse}
        setDeveloperApiSuccessResponse={setDeveloperApiSuccessResponse}
        developerApiFailResponse={
          developerApiErrorResponse || developerApiFailResponse
        }
        developerApiActive={developerApiActive}
        setDeveloperApiActive={setDeveloperApiActive}
        developerApiResponseActive={developerApiResponseActive}
        setDeveloperApiResponseActive={setDeveloperApiResponseActive}
        handleDeveloperApiTryOut={handleDeveloperApiTryOut}
        developerApiLoading={developerApiLoading}
        developersApiConnectButton={
          account ? (
            <Button
              label={"Disconnect Wallet"}
              size={"btn-sm"}
              type={"btn-primary"}
              arrow={"arrow-none"}
              element={"button"}
              onClick={() => disconnect()}
              customStyles={{ margin: "0" }}
            />
          ) : (
            <Button
              label={"Connect Wallet"}
              size={"btn-sm"}
              type={"btn-primary"}
              arrow={"arrow-none"}
              element={"button"}
              onClick={() => connect("metaMask", injected)}
              customStyles={{ margin: "0" }}
            />
          )
        }
        walletConnect={account ? true : false}
      />
    </>
  );
};

export default DevelopersApi;
