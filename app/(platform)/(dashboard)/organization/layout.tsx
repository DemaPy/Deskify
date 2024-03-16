import React, { PropsWithChildren } from "react";
import Sidebar from "../_components/Sidebar";

const OrganizationLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="pt-20 md:pt-24 max-w-6xl 2xl:max-w-screen-xl px-4">
      <div className="flex gap-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
