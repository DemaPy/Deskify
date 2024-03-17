"use client";

import { Button } from "@/components/ui/button";
import ListWrapper from "./ListWrapper";
import { Plus } from "lucide-react";

const ListForm = () => {
  return (
    <ListWrapper>
      <form
        action=""
        className="w-full p-2 rounded-md bg-white space-y-4 shadow-md"
      >
        <Button className="text-black w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex justify-start font-medium text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add list
        </Button>
      </form>
    </ListWrapper>
  );
};

export default ListForm;
