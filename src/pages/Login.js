import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { apis } from "../api/axios";
import AuthContext from "../contextStore/auth-context";

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwrodRef = useRef();

  const authCtx = useContext(AuthContext);
  const goSignup = () => {
    navigate("/signup");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwrodRef.current.value;
    const userobj = { username, password };

    const res = await apis.login(userobj);
    console.log(res.data.result.accessToken);
    alert("로그인 되었습니다.");
    // res 에서 토큰을 받은뒤 로컬에 저장

    console.log(res.data.result);
    authCtx.login(res.data.result);
    console.log("로그인페이지", res);
    navigate("/");
  };
  return (
    <>
      <Title>Petagram</Title>

      <FormBox>
        <h3>로그인</h3>
        <form onSubmit={submitHandler}>
          <input ref={usernameRef} placeholder="id" />
          <input ref={passwrodRef} type="password" placeholder="password" />
          <div>
            <button type="button" onClick={goSignup}>
              회원가입
            </button>
            <button>로그인</button>
          </div>
        </form>
      </FormBox>
    </>
  );
};
export default Login;
const Title = styled.h1`
  margin-top: 100px;
  text-align: center;
`;
const FormBox = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
  form {
    border: 1px soild black;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  form input {
    margin: auto;
    margin-bottom: 10px;
    width: 400px;
    height: 50px;
  }
  form div {
    width: 400px;

    display: flex;
    justify-content: space-around;
  }
  form div button {
    margin-top: 50px;
    width: 100px;
    height: 50px;
  }
`;
