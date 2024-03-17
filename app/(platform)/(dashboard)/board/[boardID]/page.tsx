import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";
import ListContainer from "./_components/ListContainer";

type TBoardIDPage = {
  params: {
    boardID: string;
  };
};

const BoardIDPage = async ({ params }: TBoardIDPage) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardID,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer data={lists} boardId={params.boardID} />
    </div>
  );
};

export default BoardIDPage;
