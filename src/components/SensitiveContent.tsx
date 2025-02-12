"use client";

import React from "react";

interface SensitiveContentProps {
  fileId: string;
}

const SensitiveContent: React.FC<SensitiveContentProps> = ({ fileId }) => {
  const handleClickVisible = async (id: string) => {
    console.log("Clicked ID:", id);
    alert("You can not see the image , The content is Violent or graphic ");
  };
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
      onClick={() => handleClickVisible(fileId)} // Use the passed onClick handler
    >
      The content is Violent or graphic
    </div>
  );
};

export default SensitiveContent;
