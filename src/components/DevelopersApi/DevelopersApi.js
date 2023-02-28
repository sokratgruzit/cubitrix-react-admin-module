import React from "react";
import { useState } from "react";
import styles from "./DevelopersApi.module.css";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import useAxios from "../../hooks/useAxios";

const DevelopersApi = () => {
  const axios = useAxios();
  const [devAppObject, setDevAppObject] = useState({});
  const [responseActive, setResponseActive] = useState(false);
  const [successResponse, setSuccessResponse] = useState({});

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
      console.log(response)
      setSuccessResponse(response.data)
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
              name: 'name',
              description: 'Name of trade',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Lender',
              name: 'lender',
              description: 'lender here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Borrower',
              name: 'borrower',
              description: 'borrower here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Borrower',
              name: 'borrower',
              description: 'borrower here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Borrower',
              name: 'borrower',
              description: 'borrower here',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Referral',
              name: 'referral',
              description: 'Referral code',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
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
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Referral Uni Percentage',
              name: 'referral_uni_percentage',
              description: 'Percent',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),

            },
            {
              title: 'Referral Binary Level 1 Percentage',
              name: 'referral_binary_lvl1_percentage',
              description: 'Percent',
              value:'',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),

            },
            {
              title: 'Referral Binary Level 2 Percentage',
              name: 'referral_binary_lvl2_percentage',
              description: 'Percent',
              value: '',
              required: true,
              validation: 'text',
              onChange: (e) => changeDevObject(e),
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
      title: 'Stake',
      items: [
        {
          id: 9,
          description: 'Stake',
          route: 'api/stake/dunno',
          type: 'METAMASK',
          inputs: [
            {
              title: 'Amount',
              name: 'depositAmount',
              description: 'Deposit Amount',
              value:'',
              required: true,
              validation: 'number',
              onChange: (e) => changeDevObject(e),
            },
            {
              title: 'Timeperiod',
              name: 'timeperiod',
              description: 'Time Period',
              value:'',
              required: true,
              validation: 'number',
              onChange: (e) => changeDevObject(e),
            },
          ]
        },
      ]
    },
  ];


  const failResponse = {
    message: "No data was found",
    result: [],
    status: 0
  };

  const handleTryOutSubmit = (route, type) => {
    setResponseActive(route)
    makeRequest(type, route, devAppObject);
  };

  return (
    <>
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
