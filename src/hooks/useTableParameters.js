const tableFilterData = {
    transactions: {
        head: [
            {
                title: 'All',
            }, {
                title: 'Pending',
            }, {
                title: 'Cenceled',
            }, {
                title: 'Approved',
            }, {
                title: 'Bonuses',
            }, {
                title: 'Claimed',
            },
        ],
        search: {
            options: [{
                name: 'Transaction'
            }, {
                name: 'Hash'
            }]
        },
        selects: [
            {
                name: 'Tranx Type',
                defaultOption: 'Any Type',
                options: [{
                    name: 'Transaction'
                }, {
                    name: 'Hash'
                }]
            },
            {
                name: 'Date Within',
                defaultOption: 'All Time',
                options: [{
                    name: 'Transaction'
                }, {
                    name: 'Hash'
                }]
            },
        ]
    },
    accounts: {
        head: false,
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
                },
        ]
        },
        selects: false,
    },
}

const th = {
    transactions: [
        {
            name: "Tranx ID",
            width: 15,
            mobileWidth: 25,
            id: 0,
        },
        {
            name: "From",
            width: 15,
            mobileWidth: 25,
            id: 1,
        },
        {
            name: "To",
            width: 15,
            mobileWidth: 25,
            id: 2,
        },
        {
            name: "Amount",
            width: 15,
            mobileSlide: true,
            id: 3,
        },
        {
            name: "Domination",
            width: 10,
            mobileSlide: true,
            id: 4,
        },
        {
            name: "Time",
            width: 10,
            mobileSlide: true,
            id: 5,
        },
        {
            name: "Tranx Type",
            width: 10,
            position: 'right',
            mobileSlide: true,
            id: 6,
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
            th: th.transactions,
        }
    }
}
