import React, { useState } from "react";
import { Form, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLogin,
  userLogin,
  userRegister,
} from "../Redux/Authentication/action";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { styled } from "styled-components";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const dispatch = useDispatch();

  const isAuthAdmin = useSelector((store) => store.authReducer.isAuthAdmin);
  const isAuth = useSelector((store) => store.authReducer.isAuth);

  console.log(isAuthAdmin);

  const handleSwitchForm = () => {
    setShowAdmin(false);
    setShowLogin(!showLogin);
  };

  const handleSubmit = (e) => {
    let user = {
      email,
      password,
    };
    let newUser = {
      name,
      email,
      password,
    };
    e.preventDefault();
    if (showLogin) {
       if(user.password.length>4){
         dispatch(userLogin(user));
       }else{
        alert("check password")
       }
    } else {
        if(password===confirmPassword && newUser.password.length>4){
          dispatch(userRegister(newUser));
        }else{
          alert("check password")
        }
    }
  };

  const handleAdmin = () => {
    setShowAdmin(true);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();

    let obj = {
      email: adminEmail,
      password: adminPassword,
    };
    if(obj.password.length>4){
      dispatch(adminLogin(obj));
    }else{
      alert("at lest 4 character required for password")
    }
  };

  if (isAuthAdmin) {
    return <Navigate to={"/admin"} />;
  }
  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Div>
      <Containers className="login-container">
        {" "}
        <br />
        <br />
        <br />
        {showAdmin ? (
          <>
            <Container padding="50px" boxShadow=" 0 0 10px rgba(0, 0, 0, 0.1)">
              <form className="login-form" onSubmit={handleAdminSubmit}>
                <Text fontWeight="bold">Admin Login</Text>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    placeholder="Email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    variant="outline"
                    colorScheme="teal"
                    border="1px solid teal"
                  />{" "}
                  <br /> <br />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    border="1px solid teal"
                  />
                </FormControl>{" "}
                <br />
                <br />
                <Button type="submit" bg="teal" color="white" width="300px">
                  Login
                </Button>{" "}
                <br />
                <br />
                <Link onClick={handleSwitchForm} colorScheme="teal">
                  {showLogin
                    ? "New user? Register here"
                    : "Already registered? Login here"}
                </Link>
                <Link onClick={handleAdmin}>Admin Login</Link>
              </form>
            </Container>
          </>
        ) : (
          <>
            <Container padding="50px" boxShadow=" 0 0 10px rgba(0, 0, 0, 0.1)">
              <form className="login-form" onSubmit={handleSubmit}>
                <Text fontWeight="bold">
                  {showLogin ? "User Login" : "User Registeration"}
                </Text>{" "}
                <br />
                {!showLogin && (
                  <div>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        border="1px solid teal"
                      />
                    </FormControl>{" "}
                    <br />
                  </div>
                )}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    border="1px solid teal"
                  />
                </FormControl>{" "}
                <br />
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    border="1px solid teal"
                  />
                </FormControl>{" "}
                <br />
                {!showLogin && (
                  <div>
                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        border="1px solid teal"
                      />
                    </FormControl>{" "}
                    <br />
                  </div>
                )}
                <Button type="submit" bg="teal" color="white" width="270px">
                  {showLogin ? "Login" : "Register"}
                </Button>{" "}
                <br /> <br />
                <Link onClick={handleSwitchForm}>
                  {showLogin
                    ? "New user? Register here"
                    : "Already registered? Login here"}
                </Link>{" "}
                <Link onClick={handleAdmin}>Admin Login</Link>
              </form>
            </Container>
          </>
        )}
      </Containers>{" "}
      <br />
      <br />
    </Div>
  );
};

const Div = styled.div`
  align-items: center;

  background-image: url("https://media.istockphoto.com/id/1181331535/photo/natural-background-blurring-warm-colors-and-bright-sun-light-bokeh-or-christmas-background.jpg?s=612x612&w=0&k=20&c=1l8wZuFmwlGHH0v4j2O1hxxIwuis33v1KyiJ3qu5n0c=");


 
  height: 700px;
  background-repeat: no-repeat;
  background-size: cover;


  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
  }
  * {
    font-family: "Trirong", serif;
  }
`;

export default Login;
