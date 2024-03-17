import React, { PropsWithChildren } from "react";

type TListWrapper = {};

const ListWrapper = ({ children }: TListWrapper & PropsWithChildren) => {
  return <li className="shrink-0 h-full w-[272px] select-none">{children}</li>;
};

export default ListWrapper;
