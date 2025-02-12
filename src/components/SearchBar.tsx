import React from "react";
import ImageKit from "./ImageKit";

const SearchBar = () => {
  return (
    <div className="flex bg-inputGray py-2 px-4 items-center gap-4 rounded-full ">
      <ImageKit src="/icons/explore.svg" alt="search" w={16} h={16} />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent outline-none  placeholder:text-textGray pr-4"
      />
    </div>
  );
};

export default SearchBar;
