"use client";
import { useModalStore } from "@/app/store/useModalStore";
import AuthForm from "./forms/AuthForm";
import AddSpot from "./forms/AddSpot";
import { Dialog, DialogContent } from "./ui/dialog";

export default function Modal() {
  const { activeModal, closeModal } = useModalStore();
  return (
    <Dialog
      // open={true}
      open={
        activeModal === "login" ||
        activeModal === "signup" ||
        activeModal === "addspot"
      }
      onOpenChange={(open) => !open && closeModal()}
    >
      <DialogContent className="p-0 m-auto w-100 pb-5   rounded-4xl text-white   ">
        {(activeModal === "login" || activeModal === "signup") && <AuthForm />}
        {activeModal === "addspot" && <AddSpot />}
      </DialogContent>
    </Dialog>
  );
}
