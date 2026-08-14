"use client";
import { useModalStore } from "@/app/store/useModalStore";
import AuthForm from "./forms/AuthForm";
import SpotForm from "./forms/SpotForm";
import { Dialog, DialogContent } from "./ui/dialog";
import SpotDetail from "./SpotDetail";
import { useRouter } from "next/navigation";

export default function Modal() {
  const { activeModal, closeModal } = useModalStore();
  const router = useRouter();
  return (
    <Dialog
      // open={true}

      open={
        activeModal === "login" ||
        activeModal === "signup" ||
        activeModal === "addSpot" ||
        activeModal === "spotDetail"
      }
      onOpenChange={(open) => !open && closeModal()}
    >
      <DialogContent
        className={`
    p-0 m-auto pb-5 rounded-4xl text-white max-h-[80%] overflow-y-auto scrollbar-thin
    ${activeModal === "spotDetail" && "max-w-175!"}
    ${activeModal === "addSpot" && "max-w-225!"}
    ${(activeModal === "login" || activeModal === "signup") && "max-w-150!"}
  `}
      >
        {(activeModal === "login" || activeModal === "signup") && <AuthForm />}
        {activeModal === "addSpot" && (
          <SpotForm
            onSuccess={() => {
              closeModal();
              router.refresh();
            }}
          />
        )}
        {activeModal === "spotDetail" && <SpotDetail />}
      </DialogContent>
    </Dialog>
  );
}
