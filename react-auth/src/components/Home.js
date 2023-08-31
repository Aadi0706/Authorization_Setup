import React,{useState} from 'react'
import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Link, useNavigate } from 'react-router-dom';

export const Home = () => {

  const [brandName,setBrandName]=useState("");
  const [productGroup,setProductGroup]=useState("");
  const [modelNumber,setModelNumber]=useState("");
  const [caseId,setCaseId]=useState("");
  const [issue,setIssue]=useState("");

  const navigate = useNavigate();
  // const [object,setObject]=useState({});

 const handleBrandNameChange = (event) => {

  const value=event.target.value;
  setBrandName(value);
 }

 const handleProductGroupChange = (event) => {

  const value=event.target.value;
  setProductGroup(value);
 }

 const handleIssueChange = (event) => {

  const value=event.target.value;
  setIssue(value);
 }
//  console.log("Brand",brandName);

const handleModelNumberChange=(event) => {
const value=event.target.value;
setModelNumber(value);
}

const handleCaseIdChange=(event) => {
  const value=event.target.value;
  setCaseId(value);
}

const handleData = () => {
  const info={
    brandName:brandName,
    productGroup:productGroup,
    modelNumber:modelNumber,
    caseId:caseId,
    issue:issue,
  }

  // const openIssue=()=>{
  //   navigate(`/briefIssue/:${caseId}`,{state})
  // }
  const configuration = {
    method: "post",
    url: "http://localhost:8080/issue",
    data: info
  };
  axios(configuration)
  .then((result) => {
    if (result) {
      // console.log(result,"result.....");
      // <Link to={{
      //   pathname:`/briefIssue/:${caseId}`,
      //   state:result.data
      // }} />
      // navigate("/home");
      navigate(`/briefIssue/:${caseId}`,{state:result.data});
    }
  })
  .catch((error) => {
    if(error){
      error = new Error();
    }
   
  });
}

  return (
    <>
    <div>

    <div className="cont1">
      <h5 className="text_box">Brand Name</h5>
      <select onChange={handleBrandNameChange} className="select_tag">
    <option defaultValue>Choose...</option>
    <option value="Dell">Dell</option>
    <option value="Hp">Hp</option>
   </select>
    </div>

    <div className="cont1">
      <h5 className="text_box">Product Group</h5>
      <select onChange={handleProductGroupChange} className="select_tag">
      <option defaultValue>Choose...</option>
        <option value="Inspiron Desktop">Inspiron Desktop</option>
        <option value="Inspiron Notebook">Inspiron Notebook</option>
        <option value="Vostro Desktop">Vostro Desktop</option>
        <option value="Vostro Notebook">Vostro Notebook</option>
      </select>
    </div>

<div className="cont1">
  <h5 className="text_box">Model Number</h5>
  <input onChange={handleModelNumberChange} className="select_tag"/>
</div>

<div className="cont1">
  <h5 className="text_box">Case ID</h5>
  <input onChange={handleCaseIdChange} className="select_tag" />
</div>

<div className="cont1">
      <h5 className="text_box">Issue</h5>
      <select onChange={handleIssueChange} className="select_tag">
      <option defaultValue>Choose...</option>
        <option value="No power">No power</option>
        <option value="No power Desktop">No power Desktop</option>
        <option value="Touchpad Issue">Touchpad Issue</option>
        <option value="Mouse Issue">Mouse Issue</option>
      </select>
    </div>
<br/>
<br/>
<div>
  <Button onClick={handleData}>Go with the Basic Support</Button>
</div>

    </div>

    </>
  )
}

export default Home