import { db } from "@/lib/db";
import Form from "./form";

const OrganizationId = async () => {
  const boards = await db.board.findMany();
  console.log(boards);

  return (
    <div>
      <Form />
    </div>
  );
};

export default OrganizationId;
