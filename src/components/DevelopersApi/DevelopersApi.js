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
      setSuccessResponse(response.data.result)
      // return response.data;
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
              onChange: (e) => {
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
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
                changeDevObject(e.target.name,e.target.value)
              }
            },
          ]
        },
      ]
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
    status: 0
  };

  const handleTryOutSubmit = (route, id, type) => {
    console.log('hihi');
    console.log(devAppObject);
    setResponseActive(route)
    console.log(route)
    console.log(type)
    makeRequest(type, route, devAppObject)
  };

  return (
    <>
      {/*<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>*/}
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
      {/*</div>*/}

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
