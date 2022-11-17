import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import amazon from "../images/amazonLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../ReduxStore/authenticationApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  if (currentUser) {
    alert("Your Login Is Successfull");
    navigate("/");
  }
  return (
    <div
      className="flex flex-col items-center bg-white"
      style={{ height: "100vh" }}
    >
      <img
        loading="lazy"
        src={amazon}
        alt=""
        className="mt-5 mb-5 object-contain w-28 mr-auto ml-auto"
      />
      <div
        className="flex flex-col border border-gray-400 rounded-md p-5 h-fit"
        style={{ width: "350px" }}
      >
        <h1
          className="text-3xl mb-3"
          style={{ fontWeight: 400, lineHeight: 1.2 }}
        >
          Sign in
        </h1>
        <form>
          <h5 className="mb-2 font-bold">Username</h5>
          <input
            type="text"
            // value={username}
            placeholder="John Doe"
            onChange={(e) => setUsername(e.target.value)}
            className="h-8 mb-2  p-2 bg-white border rounded-sm border-black w-full"
          />
          <h5 className="mb-2 font-bold">Password</h5>
          <input
            type="password"
            // value={password}
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            className="h-8 mb-2 p-2 rounded-sm bg-white border border-black w-full"
          />
          <button
            onClick={handleLogin}
            disabled={isFetching}
            className="bg-amazon_blue-btn hover:bg-amazon_blue-btnHover  w-full mt-2 p-1 rounded-sm "
          >
            Login
          </button>
        </form>
        {error && (
          <span className="text-red-500 ">Something Went Wrong...</span>
        )}
        <p className="mt-3 text-xs">
          By continuing, you agree to Amazon Clones's Conditions of Use and
          Privacy Notice.
        </p>
      </div>
      <div className="mt-5 mb-7 text-center ">
        <h5 className="text-xs text-gray-500 ">New To Amazon?</h5>
        <div>
          <button
            className="bg-amazonBg-bgColor p-2 border rounded-sm border-gray-500 mt-2 hover:bg-gray-200"
            style={{ width: "350px" }}
          >
            <Link to="/register">Create your Amazon Account</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
