"use client";

import Image from "next/image";
import { Calendar, Heart, MapPin, Pencil } from "lucide-react";
import { SpotWithAuthor } from "@/app/types/spot";
import { useState } from "react";
import { useModalStore } from "@/app/store/useModalStore";
import Modal from "./Modal";

interface CardProps {
  spot: SpotWithAuthor;
  editable?: boolean;
}

export default function Card({ spot, editable = false }: CardProps) {
  const [liked, setLiked] = useState(spot.likedByUser ?? false);
  const [likeCount, setLikeCount] = useState(spot.likesCount);
  const { openModal, selectedSpot } = useModalStore();

async function handleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation(); // Σταματάει το onClick του div
    const res = await fetch(`/api/spots/${spot.id}/like`, {
      method: "POST",
    });
    const data = await res.json();

    if (data.liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => {
        openModal("spotDetail", spot);
      }}
    >
      {editable && (
        <button
          className="
      flex
      flex-row
      gap-1.5
      absolute left-3 top-3 z-10
      rounded-md bg-gray-600 text-white px-3 py-1
      text-sm shadow
      items-center
      opacity-0
      transition-opacity duration-200
      group-hover:opacity-100
    "
          onClick={(e) => {
            e.stopPropagation();
            openModal("addSpot", spot);
          }}
        >
          <Pencil size={13} />
          Edit
        </button>
      )}
      {/* IMAGE */}
      <div className="relative w-full h-64">
        <Image
          src={spot.imageUrl}
          alt={spot.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 mt-3">
        {/* Name + CATEGORY */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">{spot.name}</h2>

          <span className="bg-blue-50 px-2 text-blue-700 rounded-2xl text-sm">
            {spot.category}
          </span>
        </div>

        {/* LOCATION */}
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <MapPin size={16} />
          {spot.city + ", " + spot.country}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-3">{spot.description}</p>

        {/* AUTHOR */}
        <div className="flex flex-row justify-between mt-5">
          <div className="flex  items-center gap-2 ">
            {/* AVATAR */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
              {/* {spot.author.avatar} */}
            </div>
            {/* NAME + DATE */}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{spot.author.name}</span>

              <span className="flex items-center text-xs gap-1 text-gray-500">
                <Calendar size={12} />
                {new Date(spot.createdAt).toLocaleDateString("el-GR")}
              </span>
            </div>
          </div>
          <div
            className="flex flex-row gap-2 hover:text-red-500 transition-colors "
            onClick={(e) => handleLike(e)}
          >
            <Heart className={liked ? "fill-red-500 stroke-red-500" : ""} />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
