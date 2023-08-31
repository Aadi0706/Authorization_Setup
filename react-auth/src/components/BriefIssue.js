import React from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

export const BriefIssue = () => {
  // const {Data} = (props.location && props.location.state) || {};
  const location = useLocation();
  // console.log(location.state);
  const data = location.state;
  return (
    <>
    <div className="container1">
      <div className="boxes">{data.brandName}</div>

      <div className="boxes">{data.caseId}</div>

      <div className="boxes">{data.issue}</div>

      <div className="boxes">{data.modelNumber}</div>

      <div className="boxes">{data.productGroup}</div>

      
    </div>
    <div>
    <h1>{data.issue}</h1>
    </div>
    </>
  );
};
