"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import { Description } from "./description";
import { Actions } from "./Actions";
import { AuditLog } from "@prisma/client";
import Activity from "./activity";

export const CardModal = () => {
  const { id, isOpen, onClose, onOpen } = useCardModal();

  const { data, isLoading } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData, isLoading: auditLogsDataIsLoading } = useQuery<
    AuditLog[]
  >({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Header isLoading={isLoading} id={id!} title={data?.title!} />
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!data ? <Description.Skeleton /> : <Description data={data} />}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity data={auditLogsData} />
              )}
            </div>
          </div>
          {!data ? <Actions.Skeleton /> : <Actions data={data} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
