import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/style.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="container">
        <div className="login_dp">
          <div className="logo">
            <h1>O O C I</h1>
          </div>
          <div className="input_column">
            <input placeholder="ID" className="id" />
            <input placeholder="PW" className="passwd" />
          </div>
          <div>
            <button onClick={() => navigate("/main/dashboard")}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
