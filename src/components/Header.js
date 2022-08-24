import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AddModal from "./AddModal";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AuthContext from "../contextStore/auth-context";

const Header = () => {
  //로그인 되어있는지 판별해서 로그인 되어있으면 로그아웃을 보여줌

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const authCtx = useContext(AuthContext);

  // for header icons

  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  const [isopen, setIsopen] = useState(false);

  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    if (isLoggedIn) {
      setIsopen(true);
    } else {
      alert("로그인을 해주세요!");
      navigate("/signin");
    }
  };
  return (
    <Container>
      <Head>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
          Petagram
        </Logo>
        <Search type="text" placeholder="검색"></Search>
        <Right>
          <HomeOutlinedIcon
            fontSize="large"
            onClick={() => {
              navigate("/");
            }}
            style={IconStyle}
          />

          <AddBoxIcon fontSize="large" style={IconStyle} onClick={openModal} />
          <AccountCircleOutlinedIcon
            fontSize="large"
            onClick={() => {
              navigate(`/${user}/myposts`);
            }}
            style={IconStyle}
          />
          {isLoggedIn && <button onClick={authCtx.logout}>로그아웃</button>}
        </Right>
      </Head>
      {isopen && <AddModal closeModal={closeModal} />}
    </Container>
  );
};
export default Header;

const Container = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 20px;
`;
const Head = styled.div`
  width: 80%;
  margin: auto;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: "Dancing Script", cursive;
  font-size: 36px;
  cursor: pointer;
`;

const Search = styled.input`
  border: none;
  background-color: #eee;
  padding: 1em;
  border-radius: 2em;
  outline: none;
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const IconStyle = {
  margin: "0px 10px 0px",
};
