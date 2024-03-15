import { create } from "@/actions/create-boards";
import { db } from "@/lib/db";

const OrganizationId = async () => {
  const boards = await db.board.findMany();
  console.log(boards);

  return (
    <div>
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="enter title board"
          className="border-input border p-2"
        />
      </form>
    </div>
  );
};

export default OrganizationId;
