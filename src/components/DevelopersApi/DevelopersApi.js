import React from "react";
import { useState } from "react";
import styles from "./DevelopersApi.module.css";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import useAxios from "../../hooks/useAxios";

const DevelopersApi = () => {
  const axios = useAxios();
  const [devAppObject, setDevAppObject] = useState({});

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

  let changeDevObject = (key, name, clear) => {
    if (clear !== true) {
      let data = devAppObject;
      data[key] = name;
      console.log(data);
      setDevAppObject(data);
      console.log(devAppObject);
    }
  };

  let developerApiArray = [
    {
      title: "Trade",
      items: [
        {
          description: "Get trade items from basdla bla bla",
          route: "api/trade/blaasd",
          type: "POST",
          inputs: [
            {
              title: "Name",
              name: "name",
              description: "Name of trade",
              value: "",
              onChange: (e) => {
                console.log(e.target.name);
                changeDevObject(e.target.name, e.target.value, false);
              },
            },
            {
              title: "Last Name",
              name: "last_name",
              description: "Name of trade",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
                console.log(e.target.name);
                changeDevObject(e.target.name, e.target.value, false);
              },
            },
          ],
        },
        {
          description: "Get trade items from bla bla bla",
          route: "api/trade/blaaaaa",
          type: "GET",
          inputs: [
            {
              title: "Name",
              name: "last_nameqqqqqqqq",
              description: "Name of trade",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
              },
            },
            {
              title: "Last Name",
              name: "last_nameqqqqq",
              description: "Name of trade",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
              },
            },
          ],
        },
      ],
    },
    {
      title: "Stake",
      items: [
        {
          description: "Get trade items from bla bla bla",
          route: "api/trade/baaaaala",
          type: "GET",
          inputs: [
            {
              title: "Name",
              description: "Name of trade",
              name: "last_nameqwa",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
              },
            },
            {
              title: "Last Name",
              description: "Name of trade",
              name: "last_namedsssss",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
              },
            },
          ],
        },
        {
          description: "Get trade items from bla bla bla",
          route: "api/trade/bla",
          type: "POST",
          inputs: [
            {
              title: "Name",
              description: "Name of trade",
              name: "last_nameaaa",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
              },
            },
            {
              title: "Last Name",
              description: "Name of trade",
              name: "last_nameasd",
              value: "",
              onChange: (e) => {
                console.log(e.target.value);
              },
            },
          ],
        },
      ],
    },
  ];
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
      />
    </>
  );
};

export default DevelopersApi;
