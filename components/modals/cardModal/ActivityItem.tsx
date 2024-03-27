import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/lib/logMessage";
import { AuditLog } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

type TActivityItem = {
  data: AuditLog;
};

const ActivityItem = ({ data }: TActivityItem) => {
  return (
    <li className="flex items-start gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-sm">{format(new Date(data.createdAt), "MM d, yyyy 'at' h:mm a")}</p>
      </div>
    </li>
  );
};

export default ActivityItem;
