"use client";
import Card from "../components/Card";
import { Spot } from "./types/spot";
import { mockSpots } from "./data";
import Modal from "../components/Modal";
import { LayoutGrid, Map as MapIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { GET } from "./api/spots/route";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

// import Map from "../components/Map";
export default function Home() {
  const [activeButton, setActiveButton] = useState("map");
  const [allSpots, setAllSpots] = useState(mockSpots);
  const [filteredSpots, setFilteredSpots] = useState(mockSpots);

  useEffect(() => {
    async function loadSpots() {
      const res = await fetch("/api/spots");
      const data = await res.json();

      setAllSpots(data);
      setFilteredSpots(data);
    }

    loadSpots();
  }, []);

  const handleSearch = (e) => {
    console.log("sss");
    const value = e.target.value;
    const filtered = allSpots.filter((spot) =>
      spot.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSpots(filtered);
    console.log(filtered);
  };
  return (
    <>
      <Modal />
      <div className="mx-30 ">
        <div className=" flex justify-between   items-center">
          <div className="flex gap-5  my-10 items-center">
            <p>{filteredSpots.length} amazing spots discovered</p>
            <div className="flex flex-row gap-3   px-1 rounded-lg bg-gray-100 text-sm p-1">
              <button
                className={`flex gap-1 items-center rounded-md  px-2 py-1.5 ${
                  activeButton === "map" ? "text-blue-500 bg-white" : ""
                }`}
                onClick={() => setActiveButton("map")}
              >
                <MapIcon size={18} /> <span>Map</span>
              </button>
              <button
                className={`flex gap-1 items-center rounded-md px-2 py-1.5 ${
                  activeButton === "grid" ? "text-blue-500 bg-white" : ""
                }`}
                onClick={() => setActiveButton("grid")}
              >
                <LayoutGrid size={18} /> <span>Grid</span>
              </button>
            </div>
          </div>
          <div className="relative w-full max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search city or location..."
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 outline-none  focus:border-2 focus:border-blue-500"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        {activeButton === "map" && <Map spots={filteredSpots} />}

        {activeButton === "grid" && (
          <div className=" grid grid-cols-3 gap-10">
            {filteredSpots.map((spot) => (
              <Card key={spot.id} spot={spot} />
            ))}

            {/* <Card spot={mockSpots[1]} />
          <Card spot={mockSpots[2]} />
          <Card spot={mockSpots[3]} />
          <Card spot={mockSpots[4]} />
          <Card spot={mockSpots[5]} /> */}
          </div>
        )}
      </div>
    </>
  );
}
