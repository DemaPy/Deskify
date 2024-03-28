import { Separator } from "@/components/ui/separator";
import Info from "./_components/Info";
import BoardList from "./_components/BoardList";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";

const OrganizationId = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator />
      <div className="my-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationId;
