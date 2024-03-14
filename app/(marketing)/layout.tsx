import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full bg-slate-100">
      {/* {NAVBAR} */}
      <main className="pt-40 pb-20 bg-slate-200">{children}</main>
      {/* {FOOTER} */}
    </div>
  );
};

export default layout;
