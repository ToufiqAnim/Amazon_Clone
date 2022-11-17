import React, { useCallback } from "react";

import {
  ShoppingCartOutlined,
  SearchTwoTone,
  MenuOutlined,
} from "@material-ui/icons";

import amazon from "../images/amazon.png";
import { Link } from "react-router-dom";

import { auth } from "../Firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../ReduxStore/basketSlice";
import SearchBar from "./SearchBar";
import { logout } from "../ReduxStore/userSlice";

const Header = () => {
  const items = useSelector(selectItems);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <>
      <div className=" flex items-center static float-none bg-amazon_blue text-white p-1  py-2">
        <Link
          to="/"
          className="mt-2 flex items-center flex-grow sm:flex-grow-0"
        >
          <img
            src={amazon}
            alt="logoImage"
            className="cursor-pointer md:px-5 pl-1 object-contain "
            style={{ width: "150px", height: "40px" }}
          />
        </Link>
        <SearchBar />
        <div className="flex  text-white space-x-6 mx-6 whitespace-nowrap">
          <div onClick={handleLogout}>
            <Link to={!user && "/login"} className=" link ">
              <p className="text-sm">{!user ? "Guest" : user?.username}</p>
              <p className="font-extrabold text-sm">
                {user ? "Sign Out" : "Sign In"}
              </p>
            </Link>
          </div>
          <div className=" link ">
            <p className="text-sm">Return </p>
            <p className="font-extrabold text-sm"> & Orders</p>
          </div>
          <div className=" link ">
            <p className="text-sm">Your </p>
            <p className="font-extrabold text-base"> Prime</p>
          </div>
          <div className="relative flex items-center">
            <Link to="/cart">
              <span className="absolute top-0 right-0 md:right-12 text-xs h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {items.length}
              </span>
              <ShoppingCartOutlined style={{ fontSize: "2rem" }} />
              <p className="font-extrabold hidden md:inline mt-2">Basket</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-amazon_blue-light p-2 pl-6 space-x-2  text-white">
        <p className="link flex items-center">
          <MenuOutlined className="h-6 mr-1" />
          All
        </p>
        <p className="link ">Prime Video</p>
        <p className="link ">Amazon Business</p>
        <p className="link ">Today's Deal</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocerry</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </>
  );
};

export default Header;
