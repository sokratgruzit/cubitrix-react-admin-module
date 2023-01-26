import { useState, useEffect } from 'react';

const tableFilterData = {
    transactions: {
        search: {
            options: [
                {
                    name: 'Account Owner',
                    value: 'account_owner'
                }, 
                {
                    name: 'Account Type Id',
                    value: 'account_type_id'
                },
                {
                    name: 'Address',
                    value: 'address'
                }
            ]
        },
        selects: [
            {
                name: 'Tranx Type',
                value: 'tx_type',
                options: [
                    {
                        name: 'Transaction',
                        value: 'transaction'
                    }, 
                    {
                        name: 'Hash',
                        value: 'hash'
                    }
                ]
            },
            {
                name: 'Date Within',
                value: 'createdAt',
                options: [
                    {
                        name: 'Transaction',
                        value: 'transaction'
                    }, 
                    {
                        name: 'Hash',
                        value: 'hash'
                    }
                ]
            },
            {
                name: 'Transaction Status',
                value: 'ts_status',
                options: [
                    {
                        name: 'All',
                        value: 'all'
                    }, 
                    {
                        name: 'Pending',
                        value: 'pending'
                    }, 
                    {
                        name: 'Cenceled',
                        value: 'canceled'
                    }, 
                    {
                        name: 'Approved',
                        value: 'approved'
                    }, 
                    {
                        name: 'Bonuses',
                        value: 'bonuses'
                    }, 
                    {
                        name: 'Claimed',
                        value: 'claimed'
                    }
                ]
            }
        ]
    },
    accounts: {
        search: {
            options: [
                {
                    name: 'Account Owner',
                    value: 'account_owner'
                }, 
                {
                    name: 'Account Type Id',
                    value: 'account_type_id'
                },
                {
                    name: 'Address',
                    value: 'address'
                }
            ]
        },
        selects: [
            {
                name: 'Tranx Type',
                value: 'tx_type',
                options: [
                    {
                        name: 'Transaction',
                        value: 'transaction'
                    }, 
                    {
                        name: 'Hash',
                        value: 'hash'
                    }
                ]
            },
            {
                name: 'Date Within',
                value: 'createdAt',
                options: [
                    {
                        name: 'Transaction',
                        value: 'transaction'
                    }, 
                    {
                        name: 'Hash',
                        value: 'hash'
                    }
                ]
            },
        ]
    },
    users: {
        search: {
            options: [
                {
                    name: 'Account Owner',
                    value: 'account_owner'
                }, 
                {
                    name: 'Account Type Id',
                    value: 'account_type_id'
                },
                {
                    name: 'Address',
                    value: 'address'
                }
            ]
        },
        selects: [
            {
                name: 'Tranx Type',
                value: 'tx_type',
                options: [
                    {
                        name: 'Transaction',
                        value: 'transaction'
                    }, 
                    {
                        name: 'Hash',
                        value: 'hash'
                    }
                ]
            },
            {
                name: 'Date Within',
                value: 'createdAt',
                options: [
                    {
                        name: 'Transaction',
                        value: 'transaction'
                    }, 
                    {
                        name: 'Hash',
                        value: 'hash'
                    }
                ]
            },
        ]
    },
}

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
            name: "Tx Fee",
            width: 11,
            id: 4,
        },
        {
            name: "Domination",
            width: 10,
            id: 5,
        },
        {
            name: "Time",
            width: 10,
            id: 6,
        },
        {
            name: "Tranx Status",
            width: 10,
            id: 7,
        },
        {
            name: "Tranx Type",
            width: 10,
            id: 8,
        },
    ],
    accounts: [
        {
            name: "Type ID",
            width: 15,
            mobileWidth: 33,
            id: 0,
        },
        {
            name: "Address",
            width: 15,
            mobileWidth: 33,
            id: 1,
        },
        {
            name: "Owner",
            width: 15,
            mobileWidth: 33,
            id: 2,
        },
        {
            name: "Balance",
            width: 15,
            id: 3,
        },
        {
            name: "Date",
            width: 15,
            id: 4,
        },
    ],
    users: [
        {
            name: "Name",
            width: 15,
            mobileWidth: 33,
            id: 0,
        },
        {
            name: "Address",
            width: 15,
            mobileWidth: 33,
            id: 1,
        },
        {
            name: "Email",
            width: 15,
            mobileWidth: 33,
            id: 2,
        },
        {
            name: "Mobile",
            width: 15,
            id: 3,
        },
        {
            name: "Nationality",
            width: 15,
            id: 4,
        },
        {
            name: "Date Of Birth",
            width: 15,
            id: 5,
        },
    ],
}


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

export const useTableParameters = (name) => {
    let [width, setWidth] = useState(getWidth());

    const [mobileExpand, setMobileExpand] = useState(null);

    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    let mobile = false;

    if(width <= 1300) {
        mobile = true;
    }

    let mobileExpandFunc = (id) => {
        if(width <= 1300) {
            if(id !== mobileExpand) {
                setMobileExpand(id);
            } else {
                setMobileExpand(null);
            }
        }
    }

    if (name.toLowerCase() === 'transactions') {
        return {
            tableFilterData: tableFilterData.transactions,
            th: th.transactions,
            mobileExpandFunc,
            mobileExpand,
            mobile
        }
    }
    if (name.toLowerCase() === 'accounts') {
        return {
            tableFilterData: tableFilterData.accounts,
            th: th.accounts,
            mobileExpandFunc,
            mobileExpand,
            mobile
        }
    }
    if (name.toLowerCase() === 'users') {
        return {
            tableFilterData: tableFilterData.users,
            th: th.users,
            mobileExpandFunc,
            mobileExpand,
            mobile
        }
    }
}
