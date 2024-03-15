import React, { PropsWithChildren } from "react";
import OrgControl from "./_components/OrgControl";

const OrgIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgIdLayout;
