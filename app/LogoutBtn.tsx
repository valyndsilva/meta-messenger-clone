"use client";
import React from "react";

function LogoutBtn() {
  return (
    <button
      className="bg-blue-500 hover:gb-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => console.log("Sign out")}
    >
      Sign Out
    </button>
  );
}

export default LogoutBtn;
