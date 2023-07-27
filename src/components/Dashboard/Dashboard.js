import React, { useEffect, useState } from "react";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import styles from "./Dashboard.module.css";

import axios from "../../api/axios";

const Dashboard = ({ animate, user }) => {
  const [cardData, setCardData] = useState(null);
  useEffect(() => {
    axios
      .post("/api/data/total_data")
      .then((res) => {
        setCardData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const coinCards = [
    {
      id: 1,
      type: 'coin',
      currency: "Atar",
      balance: cardData?.accounts?.main?.totalBalance?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      icon: <svg width="23" height="23" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C28.0115 27.066 27.2694 24.3097 25.8636 21.8804C24.4577 19.4511 22.4375 17.4344 20.0058 16.0328C17.5759 17.4357 15.5582 19.4538 14.1556 21.8839C12.753 24.3141 12.0151 27.0708 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="#C38C5C" />
        <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C29.3536 23.7849 29.6278 9.68772 20.0175 2.0018C20.0099 1.9994 20.0018 1.9994 19.9942 2.0018C10.3745 9.68772 10.6672 23.7875 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="white" />
      </svg>,
      incoming: "0",
      outcoming: cardData?.withdrawals?.atr ? cardData?.withdrawals?.atr?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : " 0 ",
      customStyles: {},
    },
    {
      id: 4,
      type: 'coin',
      currency: "BTC",
      balance: cardData?.accounts?.main?.totalBtc?.toLocaleString("en-US", {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      }),
      icon: <svg viewBox="0.004 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" fill="#f7931a"></path><path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" fill="#ffffff"></path></g>
      </svg>,
      incoming: "0",
      outcoming: cardData?.withdrawals?.btc ? cardData?.withdrawals?.btc?.toLocaleString("en-US", {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      }) : " 0 ",
      customStyles: {},
    },

    {
      id: 3,
      type: "coin",
      currency: "Eth",
      balance: cardData?.accounts?.main?.totalEth?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#627EEA"></circle>
            <g fill="#FFF" fillRule="nonzero">
              <path fillOpacity="0.602" d="M16.498 4v8.87l7.497 3.35z"></path>
              <path d="M16.498 4L9 16.22l7.498-3.35z"></path>
              <path fillOpacity="0.602" d="M16.498 21.968v6.027L24 17.616z"></path>
              <path d="M16.498 27.995v-6.028L9 17.616z"></path>
              <path fillOpacity="0.2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"></path>
              <path fillOpacity="0.602" d="M9 16.22l7.498 4.353v-7.701z"></path>
            </g>
          </g>
        </svg>
      ),
      incoming: "0",
      outcoming: cardData?.withdrawals?.eth ? cardData?.withdrawals?.eth?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : " 0 ",
      customStyles: {},
    },
    {
      id: 2,
      type: "coin",
      currency: "USDC",
      balance: cardData?.accounts?.main?.totalUsdc?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#3E73C4"></circle>
            <g fill="#FFF">
              <path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z"></path>
              <path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z"></path>
            </g>
          </g>
        </svg>
      ),
      incoming: "0",
      outcoming: cardData?.withdrawals?.usdc ? cardData?.withdrawals?.usdc?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : " 0 ",
      customStyles: {},
    }
  ];

  const rewardsCard = {
    info: "Rewards",
    todaySum: cardData?.rewards?.message[0]?.todaySum?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    thisMonthSum: cardData?.rewards?.message[0]?.thisMonthSum.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    thisYearSum: cardData?.rewards?.message[0]?.thisYearSum.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    totalStaked: cardData?.accounts?.main?.totalStaked.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }

  return (
    <>
      <AdminPanel rewardsCard={rewardsCard} coinCards={coinCards} adminPage={"dashboard"} animate={animate} />
    </>
  );
};

export default Dashboard;
