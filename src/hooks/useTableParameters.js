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
}

export const useTableParameters = (name) => {
    if (name.toLowerCase() === 'transactions') {
        return {
            tableFilterData: tableFilterData.transactions,
            th: th.transactions,
        }
    }
    if (name.toLowerCase() === 'accounts') {
        return {
            tableFilterData: tableFilterData.accounts,
            th: th.accounts,
        }
    }
    if (name.toLowerCase() === 'users') {
        return {
            tableFilterData: tableFilterData.users,
            th: th.users,
        }
    }
}
