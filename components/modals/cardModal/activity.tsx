import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import React from "react";
import ActivityItem from "./ActivityItem";

type TActivity = {
  data: AuditLog[];
};

const Activity = ({ data }: TActivity) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-4 w-4 mt-1 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {data.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full bg-neutral-200 h-10" />
      </div>
    </div>
  );
};

export default Activity;
