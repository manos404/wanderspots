"use client";
import Card from "./Card";
import Modal from "./Modal";
import { LayoutGrid, Map as MapIcon, Search } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SpotWithAuthor } from "@/app/types/spot";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function SpotList({
  initialSpots,
}: {
  initialSpots: SpotWithAuthor[];
}) {
  const [activeButton, setActiveButton] = useState("map");
  const [filteredSpots, setFilteredSpots] = useState(initialSpots);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = initialSpots.filter(
      (spot) =>
        spot.name.toLowerCase().includes(value) ||
        spot.location.toLowerCase().includes(value) ||
        spot.category.toLowerCase().includes(value) ||
        spot.description.toLowerCase().includes(value)||
        spot.author.name.toLowerCase().includes(value)
    );

    setFilteredSpots(filtered);
  };
  return (
    <>
      <Modal />
      <div className="mx-30">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 my-10 items-center">
            <p>{filteredSpots.length} amazing spots discovered</p>
            <div className="flex flex-row gap-3 px-1 rounded-lg bg-gray-100 text-sm p-1">
              <button
                className={`flex gap-1 items-center rounded-md px-2 py-1.5 ${
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
              placeholder="Search spots, cities, categories, users..."
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-2 focus:border-blue-500"
              onChange={handleSearch}
            />
          </div>
        </div>
        {activeButton === "map" && <Map spots={filteredSpots} />}

        {activeButton === "grid" && (
          <div className="grid grid-cols-3 gap-10">
            {filteredSpots.map((spot) => (
              <Card key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
