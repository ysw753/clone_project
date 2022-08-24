import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../api/axios";

const SignUp = () => {
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const SIGNUP_URL = "/api/auth/signup";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  const [usernamevalidity, setUsernameValidity] = useState(true);
  const [pwvalidity, setPWValidity] = useState(true);
  const [pwmatch, setPWMatch] = useState(true);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // submit action
  const onSubmit = async () => {
    // username validation

    // Alphanumeric string that may include _ and – having a length of 3 to 16 characters –
    const username_regex = /^[a-z0-9_-]{3,16}$/;
    if (!username_regex.test(username)) {
      console.log("Invalid username! Try again");
      setUsernameValidity(false);
      return;
    }
    // 1.format check
    // Minimum eight characters, at least one letter and one number:
    const pw_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!pw_regex.test(password)) {
      console.log("Invalid password! Try again");
      setPWValidity(false);
      return;
    }

    // 2.match password
    if (password !== pwdCheck) {
      console.log("Password does not match! Try again");
      setPWMatch(false);
      return;
    }

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ username, password, passwordCheck: pwdCheck }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUsername(username);
      setPassword(password);
      setPassword(pwdCheck);
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      console.log(JSON.stringify(response));
      window.alert("Sign up successful");
      navigate("/signin");
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else if (err.response?.status === 409) {
        console.log("User name taken");
      } else {
        console.log("Sign up failed");
      }
    }
  };

  return (
    <Background>
      <Container>
        {/* username, password, password check */}
        <LogoImg
          src="https://freesvg.org/img/1592397220spartan-helmet-silhouette-freesvg.org.png"
          alt="sparta-helmet"
          width="200"
          height="200"
        />
        <br />
        <StyledInput
          type="text"
          placeholder="Enter username"
          ref={usernameRef}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameValidity(true);
          }}
        />
        <br />
        {!usernamevalidity && (
          <ValidityDesc>
            올바른 형식의 아이디가 아닙니다.
            <br />
            '-'와 '_'가 허용된 3~16자리수 문자 혹은 숫자만으로 구성
          </ValidityDesc>
        )}
        <StyledInput
          type="password"
          placeholder="Enter password"
          ref={passwordRef}
          onChange={(e) => {
            setPassword(e.target.value);
            setPWValidity(true);
          }}
        />
        <br />
        {!pwvalidity && (
          <ValidityDesc>
            올바른 형식의 비밀번호가 아닙니다.
            <br />
            최소 8자리 적어도 한개의 문자와 숫자
          </ValidityDesc>
        )}
        <StyledInput
          type="password"
          placeholder="Enter password again"
          ref={passwordCheckRef}
          onChange={(e) => {
            setPwdCheck(e.target.value);
            setPWMatch(true);
          }}
        />
        <br />
        {!pwmatch && (
          <ValidityDesc>
            비밀 번호가 일치하지 않습니다. 다시 확인하십시오
          </ValidityDesc>
        )}

        <StyledButton onClick={onSubmit}>회원가입</StyledButton>

        <p>이미 회원이신가요?</p>
        <Link to="/signin" style={{ textDecoration: "none", color: "skyblue" }}>
          로그인
        </Link>
      </Container>
    </Background>
  );
};

export default SignUp;

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
  border: 1px solid #ccc;
  border-radius: 10px;
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
