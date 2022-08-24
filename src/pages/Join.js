import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apis } from "../api/axios";
const Join = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const idRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  const submitHandler = async (e) => {
    setIsLoading(() => true);
    e.preventDefault();

    const inputId = idRef.current.value;
    const inputPassword = passwordRef.current.value;
    const inputPasswordCheck = passwordCheckRef.current.value;

    console.log("회원가입페이지", inputId, inputPassword, inputPasswordCheck);

    const userObj = {
      username: inputId,
      password: inputPassword,
      passwordCheck: inputPasswordCheck,
    };

    const res = await apis.join(userObj);

    setIsLoading(() => false);
    goBack();
  };
  const goBack = () => {
    navigate("/signin");
  };

  return (
    <>
      {console.log("inreturn")}
      <Title>Petagram</Title>

      <FormBox>
        <h3>회원가입</h3>
        <form onSubmit={submitHandler}>
          <input ref={idRef} placeholder="아이디" />
          <input ref={passwordRef} placeholder="비밀번호" />
          <input ref={passwordCheckRef} placeholder="비밀번호 확인" />
          <div>
            <button type="button" onClick={goBack}>
              뒤로
            </button>
            <button>가입하기</button>
          </div>
        </form>
        {isLoading ? <p>회원가입중...</p> : null}
      </FormBox>
    </>
  );
};
export default Join;

const Title = styled.h1`
  margin-top: 100px;
  text-align: center;
`;
const FormBox = styled.div`
  background-color: #cdc7ee;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
  form {
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
