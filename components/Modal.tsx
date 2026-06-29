"use client";
import { useModalStore } from "@/app/store/useModalStore";
import AuthForm from "./forms/AuthForm";
import { Dialog, DialogContent } from "./ui/dialog";

export default function Modal() {
  const { activeModal, closeModal } = useModalStore();
  return (
   
      <Dialog
        open={activeModal === "login" || activeModal === "signup"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="p-0 m-auto w-100 pb-5   rounded-4xl text-white   ">
          <AuthForm />
        </DialogContent>
      </Dialog>
    
  );
}
