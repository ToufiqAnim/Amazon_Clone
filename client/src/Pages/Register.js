import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig";

import { useNavigate } from "react-router-dom";

import amazon from "../images/amazonLogo.png";
import { register } from "../ReduxStore/authenticationApi";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      register(dispatch, { username, email, password });
      navigate("/");
    },
    [username, password, email]
  );
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
          Create account
        </h1>
        <form>
          <h5 className="mb-2 mt-2 font-bold text-sm">Your Name</h5>
          <input
            type="text"
            value={username}
            placeholder="Your Name"
            onChange={(e) => setUsername(e.target.value)}
            className="h-8 mb-1  p-2 bg-white border rounded-sm border-black w-full"
          />

          <h5 className="mb-1 mt-2 font-bold text-sm">Email</h5>
          <input
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 mb-2  p-2 bg-white border rounded-sm border-black w-full"
          />
          <h5 className="mb-1 mt-2 font-bold text-sm">Password</h5>
          <input
            type="password"
            value={password}
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            className="h-8 mb-2 p-2 rounded-sm bg-white border border-black w-full"
          />
          {/*   <h5 className="mb-1 mt-2 font-bold">Re-enter password</h5>
          <input
            type="password"
            name="passowrd2"
            onChange={(e) => setPassword(e.target.value)}
            className="h-8 mb-2 p-2 rounded-sm bg-white border border-black w-full"
          /> */}
          <button
            type="submit"
            onClick={handleRegister}
            disabled={isFetching}
            className="bg-amazon_blue-btn hover:bg-amazon_blue-btnHover  w-full mt-2 p-1 rounded-sm "
          >
            Continue
          </button>
        </form>
        <p className="mt-3 text-xs">
          By creating an account, you agree to Amazon's Conditions of Use and
          Privacy Notice.
        </p>
        <hr
          className="my-6 h-px"
          style={{
            border: 0,
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0))`,
          }}
        />
        <div>
          <p className="text-sm ">
            Already have an account?
            <Link to="/login" className="text-blue-700">
              Sign in
            </Link>
          </p>
          <p className="text-sm ">
            Buying for work?
            <Link to="/login" className="text-blue-700">
              Create a free business account
            </Link>
          </p>
        </div>
        {error && (
          <span className="text-red-500 block ">Something Went Wrong...</span>
        )}
      </div>
    </div>
  );
};

export default Register;
