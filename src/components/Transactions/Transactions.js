import React from "react";
import { useState,useEffect } from "react";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import { useTableParameters } from "../../hooks/useTableParameters";
import useAxios from "../../hooks/useAxios";
import moment from 'moment';

const Transactions = () => {
    const axios = useAxios();
    const {
        tableFilterData,
        th,
        mobile,
        mobileExpand,
        mobileExpandFunc
    } = useTableParameters('Transactions');

    const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});

    let [td, setTd] = useState([]);
    let [pageNow, setPageNow] = useState(1);
    let [pageAll, setPageAll] = useState(1);
    let [tx_type, setTx_type] = useState('');
    let [from, setFrom] = useState('');
    let [to, setTo] = useState('');
    let [amount, setAmount] = useState('');
    let [tx_currency, setTx_currency] = useState('ether');
    async function fetchData() {
        await axios.post("/api/data/filter", {
            type: "transactions",
            filter: tableFilterOutcomingData,
            page: pageNow
        })
            .then(res => {
                setPageAll(res.data.success.pages);
                setTd(res.data.success.data)
            });
    }
    useEffect(() => {
        fetchData();
    }, [tableFilterOutcomingData,pageNow]);
    async function newTx() {
        await axios.post("/api/transactions/make_transaction", {
            tx_type:tx_type,
            from: from,
            to: to,
            amount: amount,
            tx_currency: tx_currency
        })
            .then(res => {
                console.log(res)
                fetchData();
            });
    }

    let tableData;
    tableData = td.map((item,index) => {
        return(
            <div key={index} className={`table-parent ${mobileExpand === index ? 'active' : ''}`} onClick={() => {
                mobileExpandFunc(index)
            }}>
                <div className="table">
                    <div className={`td ${th[0].mobileWidth ? true : false }`} style={{width: `${mobile ? th[0].mobileWidth : th[0].width}%`}}>
                        <span>{item.tx_hash}</span>
                    </div>
                    <div className={`td ${th[1].mobileWidth ? true : false }`} style={{width: `${mobile ? th[1].mobileWidth : th[1].width}%`}}>
                        <span>{item.from}</span>
                    </div>
                    <div className={`td ${th[2].mobileWidth ? true : false }`} style={{width: `${mobile ? th[2].mobileWidth : th[2].width}%`}}>
                        <span>{item.to}</span>
                    </div>
                    <div className={`td ${th[3].mobileWidth ? true : false }`} style={{width: `${mobile ? th[3].mobileWidth : th[3].width}%`}}>
                        <span>{item.amount}</span>
                        <span className={`table-currency`}>{item.tx_currency}</span>
                    </div>
                    <div className={`td ${th[4].mobileWidth ? true : false }`} style={{width: `${mobile ? th[4].mobileWidth : th[4].width}%`}}>
                        <span>{item?.tx_fee}</span>
                        <span className={`table-currency`}>{item.tx_fee_currency}</span>
                    </div>
                    <div className={`td ${th[5].mobileWidth ? true : false }`} style={{width: `${mobile ? th[5].mobileWidth : th[5].width}%`}}>
                        <span>{item.domination}</span>
                    </div>
                    <div className={`td ${th[6].mobileWidth ? true : false }`} style={{width: `${mobile ? th[6].mobileWidth : th[6].width}%`}}>
                        <span>{moment(item.createdAt).format('LL')}</span>
                    </div>
                    <div className={`td ${th[7].mobileWidth ? true : false }`} style={{width: `${mobile ? th[7].mobileWidth : th[7].width}%`}}>
                        <span
                            className={`alert-status-box 
                            ${item.tx_status === 'active' && 'alert-status-blue'} 
                            ${item.tx_status === 'active1' && 'alert-status-yellow'}
                            ${item.tx_status === 'pending' && 'alert-status-green'}`}
                        >
                            {item.tx_status}
                        </span>
                    </div>
                    <div className={`td ${th[8].mobileWidth ? true : false }`} style={{width: `${mobile ? th[8].mobileWidth : th[8].width}%`}}>
                        <span
                            className={`alert-status-box 
                            ${item.tx_type === 'deposit' && 'alert-status-blue'} 
                            ${item.tx_type === 'withdraw' && 'alert-status-yellow'}
                            ${item.tx_type === 'transfer' && 'alert-status-green'}`}
                        >
                            {item.tx_type}
                        </span>
                    </div>
                </div>
                <div className="icon-place">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.299 1.33325L6.47141 5.16089C6.01937 5.61293 5.27968 5.61293 4.82764 5.16089L1 1.33325" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="table-mobile">
                    <div className="table-mobile-content">
                        <div className="td">
                            <div className="mobile-ttl">{th[4].name}</div>
                            <div>
                                <span>{item.tx_fee}</span>
                                <span className={`table-currency`}>{item.tx_fee_currency}</span>
                            </div>
                        </div>
                        <div className="td">
                            <div className="mobile-ttl">{th[5].name}</div>
                            <span>{item.domination}</span>
                        </div>
                        <div className="td">
                            <div className="mobile-ttl">{th[6].name}</div>
                            <span>{moment(item.createdAt).format('LL')}</span>
                        </div>
                        <div className="td">
                            <div className="mobile-ttl">{th[7].name}</div>
                            <span
                                className={`alert-status-box 
                                ${item.tx_status === 'active' && 'alert-status-blue'} 
                                ${item.tx_status === 'active1' && 'alert-status-yellow'}
                                ${item.tx_status === 'pending' && 'alert-status-green'}`}
                            >
                                {item.tx_status}
                            </span>
                        </div>
                        <div className="td">
                            <div className="mobile-ttl">{th[8].name}</div>
                            <span
                                className={`alert-status-box 
                                ${item.tx_type === 'deposit' && 'alert-status-blue'} 
                                ${item.tx_type === 'withdraw' && 'alert-status-yellow'}
                                ${item.tx_type === 'transfer' && 'alert-status-green'}`}
                            >
                                {item.tx_type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
      <div style={{width:'100%',display: 'flex', flexDirection: 'column'}}>
          <div>
              {tx_type}
              <select name="tx_type"
                      value={tx_type} // ...force the select's value to match the state variable...
                      onChange={e => setTx_type(e.target.value)}
                      style={{color: "#000"}}
              >
                  <option value="deposit">deposit</option>
                  <option value="withdraw">withdraw</option>
                  <option value="deposit">deposit</option>
                  <option value="transfer">transfer</option>
              </select>
              <input type="text" placeholder="from"  onChange={e => setFrom(e.target.value)} style={{color: "#000"}}/>
              <input type="text" placeholder="to" onChange={e => setTo(e.target.value)} style={{color: "#000"}}/>
              <input type="text" placeholder="amount" onChange={e => setAmount(e.target.value)} style={{color: "#000"}}/>
              <input type="text" placeholder="tx_currency" value={tx_currency} onChange={e => setTx_currency(e.target.value)} style={{color: "#000"}}/>
              <div onClick={() => {newTx()}}>add</div>
          </div>
          <AdminPanel
              tableData={tableData}
              pageLabel={'Transactions'}
              tableHead={th}
              mobile={mobile}
              tableHeader={1}
              tableFilter={true}
              tableFilterData={tableFilterData}
              setTableFilterOutcomingData={setTableFilterOutcomingData}
              paginationCurrent={pageNow}
              paginationTotal={pageAll}
              paginationEvent={page => setPageNow(page)}
          />
      </div>
    );
};

export default Transactions;
