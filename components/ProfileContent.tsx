"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { ArrowLeft, Filter, User } from "lucide-react";
// import { useState } from "react";
import { SpotWithAuthor } from "@/app/types/spot";
import Link from "next/link";
import SpotList from "./SpotList";
import Map from "./Map";
import Card from "./Card";

type Props = {
  spots: SpotWithAuthor[];
  userName: string | null | undefined;
};

export default function ProfileContent({ spots, userName }: Props) {
  const [filter, setFilter] = useState("");

  const filteredSpots = filter
    ? spots.filter((spot) => spot.location === filter)
    : spots;
  return (
    <>
      <Link href="/" className="flex row mx-30 mt-10 text-gray-700">
        <ArrowLeft />
        <p>Back to Explore</p>
      </Link>
      <div className="mx-30 mt-10 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.15),0_0_4px_rgba(0,0,0,0.08)]">
        <Modal />
        <div className="rounded-xl   py-5 px-10">
          <div className=" gap-5 flex row mt-10 border-b-2 border-gray-200 pb-5">
            {/* <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"> */}
            <div className="w-15 h-15 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
              <User size={30} />
            </div>
            <span className="flex-col gap-5 items-center text-2xl">
              {userName + "'s Travel Map"}
              <p className="text-lg text-gray-500">
                {spots.length} spots discovered
              </p>
            </span>
          </div>
          <div className="flex row justify-between pt-5">
            <div className="flex col items-center gap-2">
              <Filter className="text-gray-400 w-7" />
              <select
                id="location"
                name="loacation"
                onChange={(e) => setFilter(e.target.value)}
                className="w-full h-10  mt-2  border-2 rounded-lg pl-2 text-black focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Locations</option>
                {spots.map((spot) => (
                  <option key={spot.id} value={spot.location}>
                    {spot.location}
                  </option>
                ))}
              </select>
            </div>
            <p>Showing {filteredSpots.length} of {spots.length} spots</p>
          </div>
        </div>
        {/* <SpotList initialSpots={filteredSpots} /> */}
      </div>
      <div className="mx-30 mt-10 rounded-2xl shadow-[-1px_10px_15px_rgba(0,0,0,0.15)]">
        <Map spots={filteredSpots} />
      </div>
      <div className="grid grid-cols-3 gap-10 my-10 mx-30">
        {filteredSpots.map((spot) => (
          <Card key={spot.id} spot={spot} />
        ))}
      </div>
    </>
  );
}
