"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default AppProvider;
