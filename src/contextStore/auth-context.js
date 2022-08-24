import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (data, user) => {},
  logout: () => {},
  user: {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("accessToken");

  const [accessToken, setAccessToken] = useState(initialToken);
  const [user, setUser] = useState();
  //!! 참거짓 값을 부울로 바꿔줌
  //토큰이 빈 문자열이면 fasle를
  //토큰이 빈 문자열이 아니면 true를

  const userIsLoggedIn = !!accessToken;

  const loginHandler = (data) => {
    console.log(data.username);
    setUser(data.username);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("isLoggedIn", !!data.accessToken);
    localStorage.setItem("user", data.username);
    setAccessToken(data.accessToken);
    console.log("loveyou");
  };
  const logoutHandler = () => {
    setAccessToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  const contextValue = {
    accessToken: accessToken,

    //일단 임시로 treu로 해놓음
    //isLoggedIn: true,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user: user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
