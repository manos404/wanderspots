"use client";
import { useModalStore } from "@/app/store/useModalStore";
import AuthForm from "./forms/AuthForm";
import SpotForm from "./forms/SpotForm";
import { Dialog, DialogContent } from "./ui/dialog";
import SpotDetail from "./SpotDetail";

export default function Modal() {
  const { activeModal, closeModal } = useModalStore();
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
          p-0 m-auto rounded-4xl text-white
          ${activeModal === "spotDetail" ? "!w-[700px] !max-w-[700px] " : ""}
        `}
      >
        {(activeModal === "login" || activeModal === "signup") && <AuthForm />}
        {activeModal === "addSpot" && (
          <SpotForm onSuccess={() => closeModal()} />
        )}
        {activeModal === "spotDetail" && <SpotDetail />}
      </DialogContent>
    </Dialog>
  );
}
