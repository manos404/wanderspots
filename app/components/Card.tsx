import Image from "next/image";
import { Spot } from "../types/spot";
import { Calendar, Heart, MapPin } from "lucide-react";

interface CardProps {
  spot: Spot;
}

export default function Card({ spot }: CardProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* IMAGE */}
      <div className="relative w-full h-64">
        <Image
          src={spot.imageUrl}
          alt={spot.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 mt-3">
        {/* TITLE + CATEGORY */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">{spot.title}</h2>

          <span className="bg-blue-50 px-2 text-blue-700 rounded-2xl text-sm">
            {spot.category}
          </span>
        </div>

        {/* LOCATION */}
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <MapPin size={16} />
          {spot.location}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-3">{spot.description}</p>

        {/* AUTHOR */}
        <div className="flex flex-row justify-between mt-5">
          <div className="flex  items-center gap-2 ">
            {/* AVATAR */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
              {spot.author.avatar}
            </div>
            {/* NAME + DATE */}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{spot.author.name}</span>

              <span className="flex items-center text-xs gap-1 text-gray-500">
                <Calendar size={12} />
                {new Date(spot.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2 hover:text-red-500 transition-colors ">
            <Heart className="" />
            <span>{spot.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
