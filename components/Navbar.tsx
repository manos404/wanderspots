"use client";
import Image from "next/image";
import compass from "../public/compass.png";
import { LogOut, Plus, User } from "lucide-react";
import { useModalStore } from "@/app/store/useModalStore";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { openModal } = useModalStore();
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between shadow-xl pt-5 pb-2">
      <div className="flex ml-1 md:ml-15 lg:ml-30  row gap-2 md:gap-5">
        <Image src={compass} alt="" className="size-8 md:size-12 lg:size-13" />
        <div className="text-center">
          <h1 className="font-bold text-base md:text-2xl lg:text-2xl ">
            Wanderspots
          </h1>
          <p className="text-xs md:text-base lg:text-lg text-gray-500 font-semibold">
            Discover & share amazing places
          </p>
        </div>
      </div>

      <div className="flex gap-5 my-2 mr-1 md:mr-15 lg:mr-30">
        {status === "loading" ? null : session ? ( // ή ένα skeleton/spinner
          // είναι logged in
          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="flex row gap-1 md:5 bg-blue-600 rounded-2xl items-center px-2 md:px-5 py-2  gap-1md:gap-5 justify-center  hover:bg-blue-700 transition-colors text-white text-xs md:text-base"
              onClick={() => openModal("addSpot")}
            >
              <Plus className="hidden md:block" />
              Add a spot
            </button>
            <Link href="/profile">
              <span className="flex gap-1 md:gap-5 items-center border-l border-gray-300 pl-1 md:pl-3 cursor-grab text-sm md:text-lg">
                {/* <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"> */}
                <div className="size-7 md:size-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
                  <User className="size-4 md:size-5 lg:size-5" />
                </div>
                {session.user?.name}
              </span>
            </Link>
            <button onClick={() => signOut()}>
              <LogOut className="size-4 md:size-6 md:ml-2" />
            </button>
          </div>
        ) : (
          <>
            <button
              className="text-xs md:text-base font-semibold hover:opacity-80 transition-opacity"
              onClick={() => openModal("login")}
            >
              Log in
            </button>
            <button
              className="text-xs md:text-base font-semibold bg-blue-600 rounded-2xl items-center px-2 md:px-5 flex row gap-1 md:gap-2 justify-center  hover:bg-blue-700 transition-colors text-white"
              onClick={() => openModal("signup")}
            >
              {/* <Image src={human} alt="" className="w-6 h-6" /> */}
              <User className="size-4 md:size-6" />
              <span>Sign up</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
