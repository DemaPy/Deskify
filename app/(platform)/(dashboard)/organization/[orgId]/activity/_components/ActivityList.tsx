import ActivityItem from "@/components/modals/cardModal/ActivityItem";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const logs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
        createdAt: "desc"
    }
  });
  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {logs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

export default ActivityList;
