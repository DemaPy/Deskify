import React from "react";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/ActivityList";

type Props = {};

const ActivityPage = (props: Props) => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <ActivityList />
    </div>
  );
};

export default ActivityPage;
