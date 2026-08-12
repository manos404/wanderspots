"use client";
import Card from "./Card";
import Modal from "./Modal";
import {
  LayoutGrid,
  Map as MapIcon,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import dynamic from "next/dynamic";
import { SpotWithAuthor } from "@/app/types/spot";
import { useEffect, useMemo, useState } from "react";
import { useModalStore } from "@/app/store/useModalStore";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function SpotList({
  initialSpots,
  openSpotId,
}: {
  initialSpots: SpotWithAuthor[];
  openSpotId?: string;
}) {
  const [activeButton, setActiveButton] = useState("map");
  // const [filteredSpots, setFilteredSpots] = useState(initialSpots);
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { openModal } = useModalStore();
  useEffect(() => {
    if (!openSpotId) return;
    const spot = initialSpots.find((s) => s.id === openSpotId);
    if (spot) openModal("spotDetail", spot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSpotId]);
  const categories = [
    "All",
    "Food & Drink",
    "Nature",
    "Art & Culture",
    "Architecture",
    "Entertainment",
    "Shopping",
    "Sports & Recreation",
  ];

  const filteredSpots = useMemo(() => {
    return initialSpots.filter((spot) => {
      const search = searchValue.toLowerCase();

      const matchesSearch =
        search === "" ||
        spot.name.toLowerCase().includes(search) ||
        spot.city.toLowerCase().includes(search) ||
        spot.country.toLowerCase().includes(search) ||
        spot.searchLocation.toLowerCase().includes(search) ||
        spot.category.toLowerCase().includes(search) ||
        spot.description.toLowerCase().includes(search) ||
        spot.author.name.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" || spot.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialSpots, searchValue, selectedCategory]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <div className="mx-2 md:mx-15 lg:mx-30  my-5 md:mt-15">
        <div className="border rounded-md  p-5">
          <div className=" flex col gap-3">
            <div className="relative w-full">
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
            <button
              className={`flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer ${
                showFilters ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
          </div>
          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                  className={`px-3 py-2 rounded-full text-sm transition
          ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }
        `}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between gap-5 my-10 items-center">
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
        {activeButton === "map" && <Map spots={filteredSpots} />}
        {activeButton === "grid" && (
          <div className="grid md:grid-cols-3 gap-5 md:gap-10">
            {filteredSpots.map((spot) => (
              <Card key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
