import { useModalStore } from "@/app/store/useModalStore";
import { Calendar, Heart, MapPin, User } from "lucide-react";
import Image from "next/image";

export default function SpotDetail() {
  const { selectedSpot } = useModalStore();
  console.log(selectedSpot);
  if (!selectedSpot) return;

  return (
    <div className="w-full rounded-2xl  max-h-[90vh] overflow-y-auto   text-black">
      <div className="relative w-full h-100">
        <Image
          src={selectedSpot.imageUrl}
          alt={selectedSpot.name}
          fill
          sizes="100%"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-2xl  ">{selectedSpot.name}</h1>
            <p className="text-lg text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={20} />
              {selectedSpot.city + ", " + selectedSpot.country}
            </p>
          </div>
          <div
            className="flex flex-col border-2 rounded-lg  px-3 py-2 items-center gap-2 hover:text-red-500 transition-colors text-lg"
            // onClick={handleLike}
          >
            <Heart
              className={"fill-red-500 stroke-red-500"}
              onClick={(e) => e.stopPropagation()}
            />
            <span>{selectedSpot.likesCount}</span>
          </div>
        </div>
        <span className="bg-blue-50 px-2 text-blue-700 rounded-2xl text-base p-1  ">
          {selectedSpot.category}
        </span>
        <p className="mt-2">{selectedSpot.description}</p>
        <div className="flex  items-center gap-2 mt-2">
          {/* AVATAR */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
            {/* {spot.author.avatar} */}
          </div>
          {/* NAME + DATE */}
          <div className="flex flex-col">
            <span className="flex  row gap-1 items-baseline text-sm font-medium">
              <User size={13} className="text-gray-500" />
              {selectedSpot.author.name}
            </span>

            <span className="flex items-center text-xs gap-1 text-gray-500">
              <Calendar size={12} />
              {new Date(selectedSpot.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
