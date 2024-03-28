import { auth } from "@clerk/nextjs";

import { db } from "./db";
import { MAX_BOARDS } from "@/constance/boards";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const currLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  let newLimit;
  if (currLimit) {
    newLimit = await db.orgLimit.update({
      data: {
        count: currLimit?.count + 1,
      },
      where: {
        orgId,
      },
    });
  } else {
    newLimit = await db.orgLimit.create({
      data: {
        count: 1,
        orgId,
      },
    });
  }
};

export const decrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const currLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  let newLimit;
  if (currLimit) {
    newLimit = await db.orgLimit.update({
      data: {
        count: currLimit?.count > 0 ? currLimit?.count - 1 : 0,
      },
      where: {
        orgId,
      },
    });
  } else {
    newLimit = await db.orgLimit.update({
      data: {
        count: 0,
      },
      where: {
        orgId,
      },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit || orgLimit.count < MAX_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  console.log(orgLimit);

  if (!orgLimit) {
    return 0;
  }

  return orgLimit?.count;
};
