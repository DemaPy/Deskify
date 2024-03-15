"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const OrgControl = () => {
  const { setActive } = useOrganizationList();
  const params = useParams();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.orgId as string,
    });
  }, [setActive, params.orgId]);

  return <></>;
};

export default OrgControl;
