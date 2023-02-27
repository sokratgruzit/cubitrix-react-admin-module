import React from "react";
import { useState } from "react";
import styles from "./DevelopersApi.module.css";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import useAxios from "../../hooks/useAxios";

const DevelopersApi = () => {
  const axios = useAxios();
  const [devAppObject, setDevAppObject] = useState({});
  const [responseActive, setResponseActive] = useState(false);

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
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  let changeDevObject = (key, name) => {
    setDevAppObject(prev => ({ ...prev, [key]: name }))
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
              onChange: (e) => {
                changeDevObject(e.target.name,e.target.value)
              }
            },
          ]
        },
        // {
        //   id: 3,
        //   description: 'Delete loan offer',
        //   route: 'api/loan/delete-loan-offer',
        //   type: 'POST',
        //   inputs: [
        //     {
        //       title: 'Id',
        //       name: 'id',
        //       description: '',
        //       value:'',
        //       required: true,
        //       validation: 'text',
        //       onChange: (e) => {
        //         changeDevObject(e.target.name,e.target.value)
        //       }
        //     },
        //     {
        //       title: 'Lender',
        //       name: 'lender',
        //       description: '',
        //       value:'',
        //       required: true,
        //       validation: 'text',
        //       onChange: (e) => {
        //         changeDevObject(e.target.name,e.target.value)
        //       }
        //     },
        //   ]
        // },
      ]
    },
  ];


  // <div
  //     onClick={() =>
  //         makeRequest("POST", "api/loan/take-loan", {
  //           id: "id",
  //           borrower: "0x456",
  //           collateral: [],
  //         })
  //     }
  // >
  //   Take loan
  // </div>
  // <div
  //     onClick={() =>
  //         makeRequest("POST", "api/loan/repay-loan", { id: "id", borrower: "0x567" })
  //     }
  // >
  //   Repay loan
  // </div>
  // <div
  //     onClick={() =>
  //         makeRequest("POST", "api/loan/default-loan", { id: "id", borrower: "0x567" })
  //     }
  // >
  //   Default loan
  // </div>
  const successResponse = {
    message: 'OK',
    result: [{
      blockHash: '0x373d339e45a701447367d7b9c7cef84aab79c2b2714271b908cda0ab3ad0849b',
      blockNumber: '65204',
      confirmations: '',
      contractAddress: '',
      cumulativeGasUsed: '122207',
      from: '0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4',
      gas: '122261',
      gasPrice: '50000000000',
      gasUsed: '122207',
      hash: '0x98beb27135aa0a25650557005ad962919d6a278c4b3dde7f4f6a3a1e65aa746c',
      input: '0xf00d4b5d000000000000000000000000036c8cecce8d8bbf0831d840d7f29c9e3ddefa63000000000000000000000000c5a96db085dda36ffbe390f455315d30d6d3dc52',
      isError: '0',
      nonce: '0',
      timeStamp: '1439232889',
      to: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
      transactionIndex: '0',
      txreceipt_status: '0',
      value: '0'
    }],
    status: '1'
  };

  const failResponse = {
    message: "No data was found",
    result: [],
    status: 0
  };

  const handleTryOutSubmit = (route) => {
    console.log('hihi');
    console.log(devAppObject);
    setResponseActive(route)
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div onClick={() => makeRequest("POST", "/api/data/filter", { name: "hii" })}>
          Trade
        </div>
        <div onClick={() => makeRequest("GET", "/api/loan/loan-market-offers")}>
          All public loan offers
        </div>
        <div
          onClick={() => makeRequest("GET", "api/loan/user-created-loans/lenderAddress")}
        >
          User created loans
        </div>
        <div onClick={() => makeRequest("GET", "api/loan/user-loans/borrowerAddress")}>
          User borrowed active loans
        </div>
        <div
          onClick={() => makeRequest("POST", "api/loan/create-loan", { lender: "0x123" })}
        >
          Create new loan offer
        </div>
        <div
          onClick={() =>
            makeRequest("POST", "api/loan/delete-loan-offer", {
              id: "id",
              lender: "0x123",
            })
          }
        >
          Delete loan offer
        </div>
        <div
          onClick={() =>
            makeRequest("POST", "api/loan/take-loan", {
              id: "id",
              borrower: "0x456",
              collateral: [],
            })
          }
        >
          Take loan
        </div>
        <div
          onClick={() =>
            makeRequest("POST", "api/loan/repay-loan", { id: "id", borrower: "0x567" })
          }
        >
          Repay loan
        </div>
        <div
          onClick={() =>
            makeRequest("POST", "api/loan/default-loan", { id: "id", borrower: "0x567" })
          }
        >
          Default loan
        </div>
      </div>

      <AdminPanel
        adminPage={"developerApi"}
        developersApi={developerApiArray}
        developersApiValues={devAppObject}
        setDeveloperApiValues={setDevAppObject}
        successResponse={successResponse}
        failResponse={failResponse}
        responseActive={responseActive}
        handleTryOutSubmit={handleTryOutSubmit}
      />
    </>
  );
};

export default DevelopersApi;
