import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const SIGNIN_URL = "api/auth/signin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernamevalidity, setUsernameValidity] = useState(true);
  const [pwvalidity, setPWValidity] = useState(true);

  useEffect(() => {
    //usernameRef.current.focus();
  }, []);

  const onSubmit = async () => {
    // username validation
    // Alphanumeric string that may include _ and – having a length of 3 to 16 characters –
    const username_regex = /^[a-z0-9_-]{3,16}$/;
    if (!username_regex.test(username)) {
      console.log("Invalid username! Try again");
      setUsernameValidity(false);
      return;
    }

    // password validation
    // Minimum eight characters, at least one letter and one number:
    const pw_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!pw_regex.test(password)) {
      console.log("Invalid password! Try again");
      setPWValidity(false);
      return;
    }
    try {
      const response = await axios.post(
        SIGNIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.result?.accessToken;
      setAuth({ username, accessToken });
      setUsername("");
      setPassword("");
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      console.log(JSON.stringify(response));
      console.log(auth?.username);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
        window.alert("No server response");
      } else if (err.response?.status === 400) {
        console.log("Missing username or password");
        window.alert("Missing username or password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
        window.alert("Unauthorized");
      } else if (err.response?.status === 404) {
        console.log("No such account");
        window.alert("No such account");
        navigate("/signup");
      } else {
        console.log("Sign in failed", err.response.status);
        window.alert("Sign in failed");
      }
    }
  };
  return (
    <Background>
      <Container>
        {/* username, password */}
        <LogoImg
          src="https://freesvg.org/img/1592397220spartan-helmet-silhouette-freesvg.org.png"
          alt="sparta-helmet"
          width="200"
          height="200"
        />
        <br />
        <StyledInput
          type="text"
          placeholder="username"
          ref={usernameRef}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameValidity(true);
          }}
        />
        <br />
        {!usernamevalidity && (
          <ValidityDesc>
            올바른 형식의 아이디가 아닙니다. 다시 확인하세요.
          </ValidityDesc>
        )}
        <StyledInput
          type="password"
          placeholder="password"
          ref={passwordRef}
          onChange={(e) => {
            setPassword(e.target.value);
            setPWValidity(true);
          }}
        />
        <br />
        {!pwvalidity && (
          <ValidityDesc>
            올바른 형식의 비밀번호가 아닙니다. 다시 확인하세요.
          </ValidityDesc>
        )}

        <StyledButton onClick={onSubmit}>로그인</StyledButton>
        <br />

        <p>아직 회원이 아니신가요?</p>
        <Link to="/signup" style={{ textDecoration: "none", color: "skyblue" }}>
          회원가입
        </Link>
      </Container>
    </Background>
  );
};

export default SignIn;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 300px;
`;

const LogoImg = styled.img`
  width: 200px;
  height: 200px;
  border: 2px solid skyblue;
  border-radius: 50%;
  object-fit: contain;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  padding: 0 10px 0;
  margin: 10px 0 0 0;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  margin: 10px 0 0 0;
  background-color: skyblue;
  color: white;
  border-radius: 10px;
  border: none;
`;

const ValidityDesc = styled.p`
  box-sizing: border-box;
  text-align: left;
  font-size: 10px;
  color: red;
  width: 100%;
  padding: 0;
  margin: 0;
`;
