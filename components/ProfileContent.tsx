"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { ArrowLeft, Filter, User } from "lucide-react";
// import { useState } from "react";
import { SpotWithAuthor } from "@/app/types/spot";
import Link from "next/link";
import Card from "./Card";
import dynamic from "next/dynamic";

type Props = {
  spots: SpotWithAuthor[];
  userName: string | null | undefined;
};
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function ProfileContent({ spots, userName }: Props) {
  const [filter, setFilter] = useState("");

  const filteredSpots = filter
    ? spots.filter((spot) => spot.country === filter)
    : spots;
  return (
    <>
      <Link
        href="/"
        className="flex row mx-3 md:mx-15  mt-5 md:mt-10 text-gray-700"
      >
        <ArrowLeft />
        <p>Back to Explore</p>
      </Link>
      <div className=" mx-3 md:mx-15 mt-5 md:mt-10 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.15),0_0_4px_rgba(0,0,0,0.08)]">
        <div className="rounded-xl py-2 px-2 md:py-5 md:px-10">
          <div className=" gap-5 flex row mt-10 border-b-2 border-gray-200 pb-5">
            {/* <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"> */}
            <div className="size-10 md:size-15 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
              <User className="md:size-10" />
            </div>
            <span className="flex-col gap-5 items-center text-lg md:text-2xl">
              {userName + "'s Travel Map"}
              <p className="text-base md:text-lg text-gray-500">
                {spots.length} spots discovered
              </p>
            </span>
          </div>
          <div className="flex row justify-between items-center pt-5">
            <div className="flex col items-center gap-2 text-base md:text-lg">
              <Filter className="text-gray-400 size-7" />
              <select
                id="country"
                name="country"
                onChange={(e) => setFilter(e.target.value)}
                className="w-full h-10  mt-2  border-2 rounded-lg pl-2 text-black focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Locations</option>
                {spots.map((spot) => (
                  <option key={spot.id} value={spot.country}>
                    {spot.country}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-base md:text-lg">
              Showing {filteredSpots.length} of {spots.length} spots
            </p>
          </div>
        </div>
        {/* <SpotList initialSpots={filteredSpots} /> */}
      </div>
      <div className=" mx-3 md:mx-15 mt-10 rounded-2xl shadow-[-1px_10px_15px_rgba(0,0,0,0.15)]">
        {filteredSpots.length > 0 && <Map spots={filteredSpots} />}
      </div>
      <div className="grid md:grid-cols-3 gap-10 my-10  mx-3 md:mx-15">
        {filteredSpots.map((spot) => (
          <Card key={spot.id} spot={spot} editable />
        ))}
      </div>
    </>
  );
}
