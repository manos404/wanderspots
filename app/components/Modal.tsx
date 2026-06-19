"use client";
import { Lock, Mail, X, User } from "lucide-react";
import { useActionState } from "react";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import AuthForm from "./Forms/AuthForm";

export default function Modal() {
  return (
    <dialog open className="m-auto w-100 pb-5 mt-30   rounded-4xl text-white">
      <AuthForm />
    </dialog>
  );
}
