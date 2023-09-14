import { useState, useEffect } from "react";

const tableFilterData = {
  transactions: {
    search: {
      options: [
        {
          name: "Tranx Hash",
          value: "tx_hash",
        },
        {
          name: "From",
          value: "from",
        },
        {
          name: "To",
          value: "to",
        },
      ],
    },
    selects: [
      {
        name: "Tranx Type",
        value: "tx_type",
        options: [
          {
            name: "Payment",
            value: "payment",
          },
          {
            name: "Deposit",
            value: "deposit",
          },
          {
            name: "Transfer",
            value: "transfer",
          },
          {
            name: "Internal Transfer",
            value: "internal_transfer",
          },
          {
            name: "Bonus",
            value: "bonus",
          },
          {
            name: "Withdraw",
            value: "withdraw",
          },
          { name: "Exchange", value: "exchange" },
          { name: "Stake", value: "stake" },
        ],
      },
      {
        name: "Transaction Status",
        value: "tx_status",
        options: [
          {
            name: "Pending",
            value: "pending",
          },
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Approved",
            value: "approved",
          },
        ],
      },
      {
        name: "Currencies",
        value: "currency",
        options: [
          {
            name: "ETH",
            value: "ETH",
          },
          {
            name: "BTC",
            value: "BTC",
          },
          {
            name: "USDC",
            value: "USDC",
          },
          { name: "GOLD", value: "GOLD" },
          { name: "PLATINUM", value: "PLATINUM" },
        ],
      },
    ],
  },
  withdrawals: {
    search: {
      options: [
        {
          name: "Tranx Hash",
          value: "tx_hash",
        },
        {
          name: "From",
          value: "from",
        },
        {
          name: "To",
          value: "to",
        },
      ],
    },
    selects: [
      {},
      {
        name: "Transaction Status",
        value: "tx_status",
        options: [
          {
            name: "Pending",
            value: "pending",
          },
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Approved",
            value: "approved",
          },
        ],
      },
    ],
  },
  accounts: {
    search: {
      options: [
        {
          name: "Account Owner",
          value: "account_owner",
        },
        {
          name: "Address",
          value: "address",
        },
      ],
    },
    selects: [
      {
        name: "Account Type Id",
        value: "account_type_id",
        options: [
          {
            name: "Loan",
            value: "loan",
          },
          {
            name: "Staking",
            value: "staking",
          },
          {
            name: "Trade",
            value: "trade",
          },
        ],
      },
    ],
  },
  users: {
    search: {
      options: [
        {
          name: "Name",
          value: "name",
        },
        {
          name: "Address",
          value: "address",
        },
        {
          name: "Email",
          value: "email",
        },
        {
          name: "Mobile",
          value: "mobile",
        },
      ],
    },
    selects: [
      // {
      //   name: "Nationality",
      //   value: "nationality",
      //   options: [
      //     {
      //       name: "Armenia",
      //       value: "armenia",
      //     },
      //     {
      //       name: "Azer",
      //       value: "azer",
      //     },
      //     {
      //       name: "China",
      //       value: "china",
      //     },
      //     {
      //       name: "Chukcha",
      //       value: "chukcha",
      //     },
      //   ],
      // },
      {
        name: "Account Type Id",
        value: "account_type_id",
        options: [
          {
            name: "Loan",
            value: "loan",
          },
          {
            name: "Staking",
            value: "staking",
          },
          {
            name: "Trade",
            value: "trade",
          },
        ],
      },
    ],
  },
};

const th = {
  transactions: [
    {
      name: "Tranx Hash",
      width: 10,
      mobileWidth: 25,
      id: 0,
    },
    {
      name: "From",
      width: 12,
      mobileWidth: 25,
      id: 1,
    },
    {
      name: "To",
      width: 12,
      mobileWidth: 25,
      id: 2,
    },
    {
      name: "Amount",
      width: 11,
      mobileWidth: 25,
      id: 3,
    },
    {
      name: "Created",
      width: 11,
      id: 4,
    },
    {
      name: "Tranx Status",
      width: 10,
      id: 5,
    },
    {
      name: "Tranx Type",
      width: 10,
      id: 6,
    },
  ],
  accounts: [
    {
      name: "Type ID",
      width: 7,
      mobileWidth: 33,
      id: 0,
    },
    {
      name: "Address",
      width: 10,
      mobileWidth: 33,
      id: 1,
    },
    {
      name: "Balances",
      width: 11,
      // mobileWidth: 33,
      id: 2,
    },
    {
      name: "",
      width: 11,
      // mobileWidth: 33,
      id: 3,
    },
    {
      name: "",
      width: 11,
      // mobileWidth: 33,
      id: 4,
    },
    {
      name: "",
      width: 11,
      // mobileWidth: 33,
      id: 5,
    },
    {
      name: "",
      width: 11,
      // mobileWidth: 33,
      id: 6,
    },
    {
      name: "",
      width: 11,
      // mobileWidth: 33,
      id: 7,
    },
    {
      name: "Date",
      width: 9,
      id: 8,
    },
  ],
  users: [
    {
      name: "Name",
      width: 10,
      mobileWidth: 23,
      id: 0,
    },
    {
      name: "Address",
      width: 35,
      mobileWidth: 43,
      id: 1,
    },
    {
      name: "Email",
      width: 15,
      mobileWidth: 33,
      id: 2,
    },
    {
      name: "Date Of Birth",
      width: 15,
      id: 3,
    },
  ],
  adminManagement: [
    {
      name: "Email",
      width: 33,
      mobileWidth: 33,
      id: 1,
    },
    {
      name: "Level",
      width: 33,
      mobileWidth: 33,
      id: 2,
    },
    {
      name: "Last Login",
      width: 33,
      mobileWidth: 33,
      id: 3,
    },
  ],
};

const getWidth = () =>
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const useTableParameters = (name) => {
  let [width, setWidth] = useState(getWidth());

  const [mobileExpand, setMobileExpand] = useState(null);

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  let mobile = false;

  if (width <= 1300) {
    mobile = true;
  }

  let mobileExpandFunc = (id) => {
    if (width <= 1300) {
      if (id !== mobileExpand) {
        setMobileExpand(id);
      } else {
        setMobileExpand(null);
      }
    }
  };

  if (name.toLowerCase() === "transactions") {
    return {
      tableFilterData: tableFilterData.transactions,
      th: th.transactions,
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }
  if (name.toLowerCase() === "withdrawals") {
    return {
      tableFilterData: tableFilterData.withdrawals,
      th: th.transactions,
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }
  if (name.toLowerCase() === "accounts") {
    return {
      tableFilterData: tableFilterData.accounts,
      th: th.accounts,
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }
  if (name.toLowerCase() === "users") {
    return {
      tableFilterData: tableFilterData.users,
      th: th.users,
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }
  if (name.toLowerCase() === "adminmanagement") {
    return {
      th: th.adminManagement,
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }
};
