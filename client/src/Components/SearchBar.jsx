import { List } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { SearchTwoTone } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { publicRequest } from "../requestMethod";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState(" ");
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (err) {}
    };
    fetchedProducts();
  }, []);

  const handleSearchInput = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);
    setIsOpen(true);
    const newFilter = products.filter((product) => {
      return product.title.toLowerCase().includes(inputText.toLowerCase());
    });
    if (inputText === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const closeSearchBox = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };
  return (
    <div className="flex-1 relative ">
      <div
        className="hidden sm:flex items-center h-10 rounded-md  bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer "
        onBlur={closeSearchBox}
      >
        <input
          className=" float-none p-2 h-full w-6 flex-grow flex-shrink rounded-l-md px-4 focus:outline-none "
          type="text"
          value={searchText}
          onChange={handleSearchInput}
        />

        <SearchTwoTone style={{ fontSize: "2.5rem", padding: 5 }} />
      </div>

      {filteredData.length !== 0 && isOpen && (
        <div
          className="  absolute  mt-2 w-full overflow-auto border font-bold"
          style={{
            background: "#ffff",
            color: "#000",
            zIndex: 100,
            height: "300px",
          }}
        >
          {filteredData?.map((product) => {
            return (
              <Link
                to={`/details/${product._id}`}
                key={product._id}
                className="flex justify-between items-center p-3 hover:bg-amazonBg-bgColor"
              >
                <p className="">{product.title}</p>
                <img src={product.image} alt="" className="w-8 h-8" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
