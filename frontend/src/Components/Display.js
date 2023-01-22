import React, {  useState } from "react";
import "./Display.css";

const Display = ({ account, contract }) => {
  const [data, setData] = useState("");
  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (error) {
      alert("You don't have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            />
          </a>
        );
      });
      setData(images);
    } else {
      alert("No Image to display");
    }
  };

  return (
    <div>
      <div className="image-list">{data}</div>
      <input type="text" className="address" placeholder="Enter Address" />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </div>
  );
};

export default Display;
