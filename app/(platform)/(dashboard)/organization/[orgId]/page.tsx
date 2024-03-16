import { Separator } from "@/components/ui/separator";
import Info from "./_components/Info";
import BoardList from "./_components/BoardList";

const OrganizationId = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator />
      <div className="my-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationId;
