import React, { PropsWithChildren } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-200 h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
