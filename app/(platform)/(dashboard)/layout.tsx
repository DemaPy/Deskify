import React, { PropsWithChildren } from "react";
import Navbar from "./_components/Navbar";

const OrganizationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default OrganizationLayout;
