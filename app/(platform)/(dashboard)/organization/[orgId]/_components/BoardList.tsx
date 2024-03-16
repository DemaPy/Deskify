import FormPopover from "@/components/form/formPopover";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { HelpCircle, User } from "lucide-react";
import React from "react";

const BoardList = () => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <FormPopover sideOffset={10} side="right">
          <div className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition text-neutral-700">
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
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

export default BoardList;
