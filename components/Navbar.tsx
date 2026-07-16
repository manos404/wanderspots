"use client";
import Image from "next/image";
import compass from "../public/compass.png";
import plane from "../../public/flight.png";
import { LogOut, Plus, User } from "lucide-react";
import { useModalStore } from "@/app/store/useModalStore";
import { signOut, useSession } from "next-auth/react";
import Modal from "./Modal";
import Link from "next/link";

export default function Navbar() {
  const { openModal } = useModalStore();
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between shadow-xl pt-5 pb-2">
      {/* <Modal /> */}
      <div className="flex ml-30  row gap-5">
        <Image src={compass} alt="" className="w-12 h-12" />
        <div className="column text-center">
          <h1 className="text-2xl font-bold">Wanderspots </h1>
          <p className="text-base text-gray-500 font-semibold">
            Discover & share amazing places
          </p>
        </div>
      </div>
      {/* <Image src={plane} alt="" className="w-15 h-15" /> */}

      <div className=" flex gap-5 my-2 mr-30">
        {status === "loading" ? null : session ? ( // ή ένα skeleton/spinner
          // είναι logged in
          <div className="flex items-center gap-3">
            <button
              className="text-base  bg-blue-600 rounded-2xl items-center px-5 py-2 flex row gap-2 justify-center  hover:bg-blue-700 transition-colors text-white"
              onClick={() => openModal("addSpot")}
            >
              <Plus />
              Add a spot
            </button>
            <Link href="/profile">
              <span className="flex gap-2 items-center  border-l border-gray-300 pl-4 cursor-grab">
                {/* <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"> */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
                  <User size={15} />
                </div>
                {session.user?.name}
              </span>
            </Link>
            <button onClick={() => signOut()}>
              <LogOut />
            </button>
          </div>
        ) : (
          <>
            <button
              className="text-base  hover:opacity-80 transition-opacity"
              onClick={() => openModal("login")}
            >
              Log in
            </button>
            <button
              className="text-base  bg-blue-600 rounded-2xl items-center px-5 flex row gap-2 justify-center  hover:bg-blue-700 transition-colors text-white"
              onClick={() => openModal("signup")}
            >
              {/* <Image src={human} alt="" className="w-6 h-6" /> */}
              <User className="w-6 h-6" />
              <span>Sign up</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
