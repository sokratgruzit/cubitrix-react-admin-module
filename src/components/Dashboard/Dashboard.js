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
    },
    {
      id: 5,
      type: 'coin',
      currency: "gold",
      balance: cardData?.accounts?.main?.totalGold?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000"
        version="1.1"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
      >
        <g>
          <g fill="#FED159">
            <path d="M221.279 256L34.721 256 0 398.222 256 398.222z"></path>
            <path d="M477.279 256L290.721 256 256 398.222 512 398.222z"></path>
            <path d="M349.279 113.778L162.721 113.778 128 256 384 256z"></path>
          </g>
          <g fill="#F6C454">
            <path d="M162.721 113.778L128 256 167.111 256 201.832 113.778z"></path>
            <path d="M34.721 256L0 398.222 39.111 398.222 73.832 256z"></path>
            <path d="M290.721 256L256 398.222 295.111 398.222 329.832 256z"></path>
          </g>
          <g fill="#FFE4A9">
            <path d="M349.279 113.778L384 256 344.889 256 310.168 113.778z"></path>
            <path d="M477.279 256L512 398.222 472.889 398.222 438.168 256z"></path>
            <path d="M221.279 256L256 398.222 216.889 398.222 182.168 256z"></path>
          </g>
        </g>
      </svg>,
      incoming: "0",
      outcoming: cardData?.withdrawals?.gold ? cardData?.withdrawals?.gold?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : " 0 ",
      customStyles: {},
    },
    {
      id: 6,
      type: 'coin',
      currency: "platinum",
      balance: cardData?.accounts?.main?.totalPlatinum?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#48eab4"
          viewBox="0 -13.5 182 182">
          <g>
            <g clipPath="url(#clip0)">
              <path
                fill="#009dd1"
                d="M5.308 58.816c1.166 1.455 2.372 2.957 3.465 4.473 16.324 22.638 34.512 44.769 52.101 66.169 5.865 7.135 11.928 14.512 17.833 21.798 1.887 2.33 3.65 3.498 5.555 3.676.172.016.345.024.517.024 1.712 0 3.517-.785 5.628-2.438a80.388 80.388 0 009.999-9.625c24.051-26.779 47.395-52.928 67.058-74.977 2.19-2.456 4.335-4.998 6.411-7.456 1.89-2.24 3.845-4.555 5.823-6.793 2.27-2.57 2.377-5.134.318-7.62a54.193 54.193 0 00-3.857-4.16 2631.8 2631.8 0 00-9.431-9.181 4876.285 4876.285 0 01-9.566-9.316c-1.308-1.28-2.611-2.606-3.872-3.888-1.493-1.518-3.037-3.09-4.608-4.604-4.904-4.728-9.006-8.582-12.908-12.133-1.004-.86-2.28-1.465-3.679-1.749a26.527 26.527 0 00-5.218-.406C120.253.584 113.629.59 108.08.592h-4.938l-14.39.564c-13.05.51-25.377.995-37.569 1.436-2.856.104-5.993.487-7.05 3.745a1.98 1.98 0 01-.507.561 8.607 8.607 0 00-.24.22c-1.312 1.25-2.622 2.502-3.928 3.755-3.24 3.104-6.591 6.313-9.944 9.427A291.328 291.328 0 004.358 46.859a18.093 18.093 0 00-2.69 4.812 3.214 3.214 0 00-.172 1.498c.062.504.243.992.534 1.437 1.05 1.432 2.183 2.844 3.278 4.21zm156.799-1.79l-.097.12c-.598.741-1.114 1.381-1.687 1.998-2.307 2.483-4.627 4.959-6.961 7.426-4.497 4.777-9.148 9.716-13.576 14.67-10.401 11.635-20.891 23.516-31.035 35.007-4.233 4.796-8.469 9.59-12.706 14.382-.175.199-.349.395-.523.586.532-1.31 1.086-2.652 1.654-3.963l8.517-19.645a36565.311 36565.311 0 0019.343-44.688 30.753 30.753 0 001.332-4.138c.152-.564.311-1.147.488-1.755h35.251zm-47.555-.016l-30.407 72.683c-2.438-8.376-5.171-16.75-7.828-24.87-4.996-15.287-10.16-31.086-13.405-47.153l51.64-.66zM98.08 9.652c5.31-.166 10.665-.155 15.859-.148 5.208.009 10.593.018 15.923-.148l33.809 37.741-39.434.674-.495.009L98.08 9.652zM64.11 48.496c7.148-12.236 16.233-22.592 26.48-33.764l18.546 32.927-45.026.837zm-14.341 9.446c4.078 16.777 9.727 33.394 15.192 49.468 1.588 4.669 3.22 9.467 4.804 14.246-11.73-13.1-22.492-26.979-32.922-40.43-5.932-7.652-12.06-15.554-18.308-23.24 5.39-.517 23.993-.57 31.234-.045v0zM72.623 10.21l7.256-.057a9.76 9.76 0 01.733.026c-9.829 10.976-20.716 23.835-27.85 38.51H13.908c.233-.33.496-.644.785-.942A8015.12 8015.12 0 0139.85 22.97c2.054-2.015 4.18-4.046 6.23-6.01 1.922-1.838 3.835-3.681 5.742-5.53a3.11 3.11 0 011.184-.842c.472-.195.995-.29 1.522-.276 6.033 0 12.165-.053 18.096-.101v0z"></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <path fill="#fff" d="M0 0H181V155H0z" transform="translate(.777)"></path>
              </clipPath>
            </defs>
          </g>
        </svg>
      ),
      incoming: "0",
      outcoming: cardData?.withdrawals?.platinum ? cardData?.withdrawals?.platinum?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : " 0 ",
      customStyles: {},
    },
  ];

  const balanceCards = [
    {
      id: 1,
      type: "balance-card",
      account: "LOAN",
      totalbalance: cardData?.accounts?.loan?.totalBalance?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      coinIcon: (
        <svg width="23" height="23" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C28.0115 27.066 27.2694 24.3097 25.8636 21.8804C24.4577 19.4511 22.4375 17.4344 20.0058 16.0328C17.5759 17.4357 15.5582 19.4538 14.1556 21.8839C12.753 24.3141 12.0151 27.0708 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="#C38C5C" />
          <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C29.3536 23.7849 29.6278 9.68772 20.0175 2.0018C20.0099 1.9994 20.0018 1.9994 19.9942 2.0018C10.3745 9.68772 10.6672 23.7875 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="white" />
        </svg>
      ),
      info: 'LOAN'
    },
    {
      id: 2,
      type: "balance-card",
      account: "TRADE",
      totalbalance: cardData?.accounts?.trade?.totalBalance?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      coinIcon: (
        <svg width="23" height="23" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C28.0115 27.066 27.2694 24.3097 25.8636 21.8804C24.4577 19.4511 22.4375 17.4344 20.0058 16.0328C17.5759 17.4357 15.5582 19.4538 14.1556 21.8839C12.753 24.3141 12.0151 27.0708 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="#C38C5C" />
          <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C29.3536 23.7849 29.6278 9.68772 20.0175 2.0018C20.0099 1.9994 20.0018 1.9994 19.9942 2.0018C10.3745 9.68772 10.6672 23.7875 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="white" />
        </svg>
      ),
      info: 'TRADE'
    },
    {
      id: 3,
      type: "balance-card",
      account: "MAIN",
      totalbalance: cardData?.accounts?.main?.totalBalance?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      coinIcon: (
        <svg width="23" height="23" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C28.0115 27.066 27.2694 24.3097 25.8636 21.8804C24.4577 19.4511 22.4375 17.4344 20.0058 16.0328C17.5759 17.4357 15.5582 19.4538 14.1556 21.8839C12.753 24.3141 12.0151 27.0708 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="#C38C5C" />
          <path d="M19.9942 2.0018C20.0018 1.9994 20.0099 1.9994 20.0175 2.0018C26.097 5.51543 31.1443 10.5677 34.652 16.6506C38.1597 22.7335 40.0042 29.6326 40 36.6544L28.0152 29.8767V29.8728C29.3536 23.7849 29.6278 9.68772 20.0175 2.0018C20.0099 1.9994 20.0018 1.9994 19.9942 2.0018C10.3745 9.68772 10.6672 23.7875 12.016 29.8767L1.36193e-05 36.6544C-0.00578363 29.6309 1.83928 22.7299 5.34937 16.6464C8.85947 10.563 13.9106 5.51183 19.9942 2.0018Z" fill="white" />
        </svg>
      ),
      info: 'TRADE'
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
      <AdminPanel rewardsCard={rewardsCard} balanceCards={balanceCards} coinCards={coinCards} adminPage={"dashboard"} animate={animate} />
    </>
  );
};

export default Dashboard;
