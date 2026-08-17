"use client";

import Image from "next/image";
import { Calendar, Heart, MapPin, Pencil } from "lucide-react";
import { SpotWithAuthor } from "@/app/types/spot";
import { useModalStore } from "@/app/store/useModalStore";
import { useEffect } from "react";
import { useLikesStore } from "@/app/store/useLikesStore";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CardProps {
  spot: SpotWithAuthor;
  editable?: boolean;
}

export default function Card({ spot, editable = false }: CardProps) {
  const { openModal } = useModalStore();
  const { likes, initLike, toggleLike } = useLikesStore();
  const { data: session } = useSession();

  useEffect(() => {
    initLike(spot.id, spot.likedByUser ?? false, spot.likesCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot.id]);

  const current = likes[spot.id] ?? {
    liked: spot.likedByUser ?? false,
    likeCount: spot.likesCount,
  };

  async function handleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation(); // Σταματάει το onClick του div
    if (!session) {
      toast.error("Please log in first");
      return;
    }

    const res = await fetch(`/api/spots/${spot.id}/like`, {
      method: "POST",
    });
    const data = await res.json();

    toggleLike(
      spot.id,
      data.liked,
      data.liked ? current.likeCount + 1 : current.likeCount - 1
    );
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
      lg:opacity-0
      lg:transition-opacity duration-200
      lg: group-hover:opacity-100
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
        <div className="flex flex-row justify-between mt-5 ">
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
            <Heart
              className={current.liked ? "fill-red-500 stroke-red-500" : ""}
            />
            <span>{current.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
