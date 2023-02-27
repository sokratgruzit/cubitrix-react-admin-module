import React from "react";
import { useState } from "react";
import styles from "./DevelopersApi.module.css";
import {AdminPanel} from "@cubitrix/cubitrix-react-ui-module";
import useAxios from "../../hooks/useAxios";

const DevelopersApi = () => {
    const axios = useAxios();
    const [devAppObject, setDevAppObject] = useState({});

    async function fetchData(data) {
        await axios.post("/api/data/filter", data)
            .then(res => {
              console.log(res)
            });
    }

    let changeDevObject = (key, name, clear) => {
        if(clear !== true) {
            let data = devAppObject;
            data[key] = name;
            console.log(data);
            setDevAppObject(data);
            console.log(devAppObject)
        }
    };

    let developerApiArray = [
        {
            title: 'Trade',
            items: [
                {
                    description: 'Get trade items from basdla bla bla',
                    route: 'api/trade/blaasd',
                    type: 'POST',
                    inputs: [
                        {
                            title: 'Name',
                            name: 'name',
                            description: 'Name of trade',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.name);
                                changeDevObject(e.target.name,e.target.value,false)
                            }
                        },
                        {
                            title: 'Last Name',
                            name: 'last_name',
                            description: 'Name of trade',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                                console.log(e.target.name);
                                changeDevObject(e.target.name,e.target.value,false)
                            }
                        }
                    ]
                },
                {
                    description: 'Get trade items from bla bla bla',
                    route: 'api/trade/blaaaaa',
                    type: 'GET',
                    inputs: [
                        {
                            title: 'Name',
                            name: 'last_nameqqqqqqqq',
                            description: 'Name of trade',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                            }
                        },
                        {
                            title: 'Last Name',
                            name: 'last_nameqqqqq',
                            description: 'Name of trade',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: 'Stake',
            items: [
                {
                    description: 'Get trade items from bla bla bla',
                    route: 'api/trade/baaaaala',
                    type: 'GET',
                    inputs: [
                        {
                            title: 'Name',
                            description: 'Name of trade',
                            name: 'last_nameqwa',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                            }
                        },
                        {
                            title: 'Last Name',
                            description: 'Name of trade',
                            name: 'last_namedsssss',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                            }
                        }
                    ]
                },
                {
                    description: 'Get trade items from bla bla bla',
                    route: 'api/trade/bla',
                    type: 'POST',
                    inputs: [
                        {
                            title: 'Name',
                            description: 'Name of trade',
                            name: 'last_nameaaa',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                            }
                        },
                        {
                            title: 'Last Name',
                            description: 'Name of trade',
                            name: 'last_nameasd',
                            value:'',
                            onChange: (e) => {
                                console.log(e.target.value);
                            }
                        }
                    ]
                }
            ]
        }
    ];
    return (
        <>
            <div onClick={fetchData({name: 'hii'})}>Trade</div>
            <AdminPanel
                adminPage={'developerApi'}
                developersApi={developerApiArray}
                developersApiValues={devAppObject}
            />
        </>
    );
};

export default DevelopersApi;
