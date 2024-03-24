import QueryProvider from "@/components/QueryProvider";
import ModalProvider from "@/components/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
