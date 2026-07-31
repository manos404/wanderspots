"use client";
import { useModalStore } from "@/app/store/useModalStore";
import { User } from "lucide-react";
import React from "react";
import Modal from "./Modal";

export function SignInPrompt() {
  const { openModal } = useModalStore();

  return (
    <>
     
      <div className="flex items-center justify-center mt-30  flex-col gap-2">
        <User size={50} />
        <h1 className="text-lg">Please sign in</h1>
        <p className="text-sm">You need to be signed in to view your profile</p>
        <button
          onClick={() => openModal("login")}
          className="mt-2 px-5 py-2 rounded-xl bg-blue-600 text-white"
        >
          Sign In
        </button>
      </div>
    </>
  );
}
