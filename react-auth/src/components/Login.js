import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const configuration = {
    method: "post",
    url: "http://localhost:8080/login",
    data: {
      email,
      password,
    },
  };

  // useEffect(() => {
  const handleSubmit = (e) => {
    
      validate(configuration)
      e.preventDefault();
      axios(configuration)
      .then((result) => {
        console.log(result,"reshkjfd00");
        if (result) {
          setLogin(true);
          navigate('/home')
         
        }
      })
      .catch((error) => {
        error = new Error();
      });
    
  };

  const validate=(email,password) => {
    if(email===""){
      alert("Please enter your email")
      return false;
    }
    if(password===""){
      alert("Please enter your password")
    return false;
    }
    return true;
  }


  // useEffect(() => handleSubmit(),[])
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h1> Login Page</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
              {/* email */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              {/* password */}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>

              {/* submit button */}
              {/* <Link to="/home"> */}
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
              {login ? (
                <p className="text-success">You Are Logged in Successfully</p> &&
                <Link to={'/home'}/>
              )  : (
                <p className="text-danger">You Are Not Logged in</p>
              )}
              {/* </Link> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
