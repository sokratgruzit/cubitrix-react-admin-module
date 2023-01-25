import { useState, useEffect } from 'react';

const defaultOutcomingData = {
    head: 'All',
    search: {
        option: 'Transaction'
    }
};

const tableFilterData = {
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
};

let th = [
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
];


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

export const useTableParameters = (name) => {
    // save current window width in the state object
    let [width, setWidth] = useState(getWidth());

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
        // prevent execution of previous setTimeout
        clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
    }, [])
    
    let mobile = false;
    if(width <= 1300) {
        mobile = true;
    }

    if (name === 'Transactions') {
        return { defaultOutcomingData, tableFilterData, th, mobile }
    }
    if (name === 'Accounts') {
        return { defaultOutcomingData, tableFilterData, th, mobile }
    }
}
