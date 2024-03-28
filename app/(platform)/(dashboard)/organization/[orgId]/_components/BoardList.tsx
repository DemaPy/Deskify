import FormPopover from "@/components/form/formPopover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_BOARDS } from "@/constance/boards";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }
  const boards = await db.board.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const avCount = await getAvailableCount();
  console.log(avCount);
  
  return (
    <div className="space-y-4 ">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
            className="group relative aspect-video rounded-sm  bg-no-repeat bg-center bg-cover bg-sky-700 h-full w-full p-2 overflow-hidden"
            href={`/board/${board.id}`}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition text-neutral-700">
            <p className="text-sm">Create new board</p>
            <span className="text-xs">{MAX_BOARDS - avCount} remaining</span>
            <Hint
              description={`Free WorkSpaces can have up to 5 open boards. For unlimited boards upgrade to pro.`}
              sideOffset={50}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-18 w-18" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};

export default BoardList;
