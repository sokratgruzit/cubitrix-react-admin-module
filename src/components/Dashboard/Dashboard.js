import React from "react";
import { AdminPanel } from "@cubitrix/cubitrix-react-ui-module";
import styles from "./Dashboard.module.css";

const Dashboard = (props) => {
  console.log(props.sideBarActive, 'sidebar')
  return (
    <>
      <AdminPanel adminPage={"dashboard"} animate={props.animate} />
    </>
  );
};

export default Dashboard;
