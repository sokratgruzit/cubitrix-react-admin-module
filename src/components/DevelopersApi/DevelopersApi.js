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
    {
      title: 'Loan',
      items: [
        {
          id: 0,
          description: 'All public loan offers',
          route: '/api/loan/loan-market-offers',
          type: 'GET',
          inputs: []
        },
        {
          id: 1,
          description: 'User created loans',
          route: 'api/loan/user-created-loans/lenderAddress',
          type: 'GET',
          inputs: []
        },
        {
          id: 2,
          description: 'User borrowed active loans',
          route: 'api/loan/user-loans/borrowerAddress',
          type: 'GET',
          inputs: []
        },
        {
          id: 3,
          description: 'Create new loan offer',
          route: 'api/loan/create-loan',
          type: 'POST',
          inputs: [
            {
              id: 20,
              title: 'Lender',
              name: 'lender',
              description: 'Name of trade',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 4,
          description: 'Delete loan offer',
          route: 'api/loan/delete-loan-offer',
          type: 'POST',
          inputs: [
            {
              title: 'Id',
              name: 'id',
              description: 'id here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Lender',
              name: 'lender',
              description: 'lender here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 5,
          description: 'Take loan',
          route: 'api/loan/take-loan',
          type: 'POST',
          inputs: [
            {
              title: 'Id',
              name: 'id',
              description: 'id here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Borrower',
              name: 'borrower',
              description: 'borrower here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 6,
          description: 'Repay loan',
          route: 'api/loan/repay-loan',
          type: 'POST',
          inputs: [
            {
              title: 'Id',
              name: 'id',
              description: 'id here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Borrower',
              name: 'borrower',
              description: 'borrower here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 7,
          description: 'Default loan',
          route: 'api/loan/default-loan',
          type: 'POST',
          inputs: [
            {
              title: 'Id',
              name: 'id',
              description: 'id here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Borrower',
              name: 'borrower',
              description: 'borrower here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
      ]
    },
    {
      title: 'Referral',
      items: [
        {
          id: 8,
          description: 'Generate referral codes',
          route: 'api/referral/generate_referral_codes',
          type: 'GET',
          inputs: []
        },
        {
          id: 9,
          description: 'Bind Referral To User',
          route: 'api/referral/bind_referral_to_user',
          type: 'POST',
          inputs: [
            {
              title: 'Address',
              name: 'address',
              description: 'Address',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 10,
          description: 'Bind Referral To User',
          route: 'api/referral/get_referrals_by_address',
          type: 'POST',
          inputs: [
            {
              title: 'Address',
              name: 'address',
              description: 'Address',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 11,
          description: 'Bind Referral To Code',
          route: 'api/referral/get_referrals_by_code',
          type: 'POST',
          inputs: [
            {
              title: 'Address',
              name: 'address',
              description: 'Address',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Referral',
              name: 'referral',
              description: 'Referral code',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 12,
          description: 'Assign Refferal To User',
          route: 'api/referral/assign_refferal_to_user',
          type: 'POST',
          inputs: [
            {
              title: 'Referral',
              name: 'referral',
              description: 'Referral code',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
          ]
        },
        {
          id: 13,
          description: 'Admin Setup',
          route: 'api/referral/admin_setup',
          type: 'POST',
          inputs: [
            {
              title: 'Referral Activated',
              name: 'referral_activated',
              description: '("all"/"none"/"uni"/"binary")',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Referral Uni Percentage',
              name: 'referral_uni_percentage',
              description: 'Percent',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            },
            {
              title: 'Referral Binary Level 1 Percentage',
              name: 'referral_binary_lvl1_percentage',
              description: 'Percent',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              },
            },
            {
              title: 'Referral Binary Level 2 Percentage',
              name: 'referral_binary_lvl2_percentage',
              description: 'Percent',
              value: '',
              required: true,
              validation: 'text',
              onChange: (e) => {
                changeDevObject(e);
              }
            }
          ]
        },
        {
          id: 14,
          description: 'Get Referral Options',
          route: 'api/referral/get_referral_options',
          type: 'GET',
          inputs: []
        },
      ]
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
          type: "METAMASK_GET",
          inputs: [],
        },
        {
          id: 2,
          description: "Get account summary data",
          route: "getStackerInfo_accountSummary",
          type: "METAMASK_GET",
          inputs: [],
        },
        {
          id: 3,
          description: "Get stakers record",
          route: "getStackerInfo_stakersRecord",
          type: "METAMASK_GET",
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
    if (type === "METAMASK_GET") {
      if (route === "getStackerInfo_stackContract") {
        setSuccessResponse(stackContractInfo);
      }
      if (route === "getStackerInfo_accountSummary") {
        setSuccessResponse(stakersInfo);
      }
      if (route === "getStackerInfo_stakersRecord") {
        setSuccessResponse(stakersRecord);
      }
    }

    if (type === "POST") {
      makeRequest(type, route, devAppObject);
    }
  };

  return (
    <>
      {/* {account} */}
      {account ? (
        <div onClick={() => disconnect()}>disconnect</div>
      ) : (
        <div onClick={() => connect("metaMask", injected)}>connect</div>
      )}

      {/* <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}> */}
      {/*  <div onClick={() => makeRequest("POST", "/api/data/filter", { name: "hii" })}>*/}
      {/*    Trade*/}
      {/*  </div>*/}
      {/*  <div onClick={() => makeRequest("GET", "/api/loan/loan-market-offers")}>*/}
      {/*    All public loan offers*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() => makeRequest("GET", "api/loan/user-created-loans/lenderAddress")}*/}
      {/*  >*/}
      {/*    User created loans*/}
      {/*  </div>*/}
      {/*  <div onClick={() => makeRequest("GET", "api/loan/user-loans/borrowerAddress")}>*/}
      {/*    User borrowed active loans*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() => makeRequest("POST", "api/loan/create-loan", { lender: "0x123" })}*/}
      {/*  >*/}
      {/*    Create new loan offer*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() =>*/}
      {/*      makeRequest("POST", "api/loan/delete-loan-offer", {*/}
      {/*        id: "id",*/}
      {/*        lender: "0x123",*/}
      {/*      })*/}
      {/*    }*/}
      {/*  >*/}
      {/*    Delete loan offer*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() =>*/}
      {/*      makeRequest("POST", "api/loan/take-loan", {*/}
      {/*        id: "id",*/}
      {/*        borrower: "0x456",*/}
      {/*        collateral: [],*/}
      {/*      })*/}
      {/*    }*/}
      {/*  >*/}
      {/*    Take loan*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() =>*/}
      {/*      makeRequest("POST", "api/loan/repay-loan", { id: "id", borrower: "0x567" })*/}
      {/*    }*/}
      {/*  >*/}
      {/*    Repay loan*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() =>*/}
      {/*      makeRequest("POST", "api/loan/default-loan", { id: "id", borrower: "0x567" })*/}
      {/*    }*/}
      {/*  >*/}
      {/*    Default loan*/}
      {/*  </div>*/}
      {/* </div> */}

      <AdminPanel
        adminPage={"developerApi"}
        developersApi={developerApiArray}
        developersApiValues={devAppObject}
        setDeveloperApiValues={setDevAppObject}
        successResponse={successResponse}
        setSuccessResponse={setSuccessResponse}
        failResponse={failResponse}
        responseActive={responseActive}
        setResponseActive={setResponseActive}
        handleTryOutSubmit={handleTryOutSubmit}
      />
    </>
  );
};

export default DevelopersApi;
