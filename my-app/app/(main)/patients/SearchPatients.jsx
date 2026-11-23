"use client";
import React, { useState } from "react";

const SearchPatients = ({ patients }) => {
  let [curr, setCurr] = useState("");
  console.log(curr);

  let filterData = patients.filter((itme) =>
    itme.name.toLowerCase().includes(curr.toLocaleLowerCase()),
  );
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={curr}
        onChange={(e) => setCurr(e.target.value)}
      />

      {filterData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default SearchPatients;
