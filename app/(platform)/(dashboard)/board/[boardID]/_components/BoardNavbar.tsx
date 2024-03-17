import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardOptions from "./BoardOptions";
import BoarTitleForm from "./BoarTitleForm";

type TBoardNavbar = {
  id: string;
};

const BoardNavbar = async ({ id }: TBoardNavbar) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findFirst({
    where: {
      id: id,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-12 flex items-center px-6 gapx-4 text-white">
      <BoarTitleForm title={board.title} />
      <div className="ml-auto">
        <BoardOptions id={id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
