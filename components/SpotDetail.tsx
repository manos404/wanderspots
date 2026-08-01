import { useModalStore } from "@/app/store/useModalStore";
import { Calendar, Heart, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLikesStore } from "@/app/store/useLikesStore";

export default function SpotDetail() {
  const { selectedSpot } = useModalStore();
  const { likes, initLike, toggleLike } = useLikesStore();

  useEffect(() => {
    if (!selectedSpot) return;
    initLike(
      selectedSpot.id,
      selectedSpot.likedByUser ?? false,
      selectedSpot.likesCount
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpot?.id]);

  if (!selectedSpot) return null;
  const spot = selectedSpot;

  const current = likes[spot.id] ?? {
    liked: spot.likedByUser ?? false,
    likeCount: spot.likesCount,
  };

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation();
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
    <div className="w-full rounded-2xl  max-h-[90vh] overflow-y-auto   text-black">
      <div className="relative w-full h-100">
        <Image
          src={spot.imageUrl}
          alt={spot.name}
          fill
          sizes="100%"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-2xl  ">{spot.name}</h1>
            <p className="text-lg text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={20} />
              {spot.city + ", " + spot.country}
            </p>
          </div>
          <div
            className="flex flex-col border-2 rounded-lg  px-3 py-2 items-center gap-2 hover:text-red-500 transition-colors text-lg"
            onClick={handleLike}
          >
            <Heart
              className={current.liked ? "fill-red-500 stroke-red-500" : ""}
            />
            <span>{current.likeCount}</span>
          </div>
        </div>
        <span className="bg-blue-50 px-2 text-blue-700 rounded-2xl text-base p-1  ">
          {spot.category}
        </span>
        <p className="mt-2">{spot.description}</p>
        <Link href={`/users/${spot.authorId}`}>
          <div className="flex  items-center gap-2 mt-2">
            {/* AVATAR */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 text-white flex items-center justify-center font-semibold">
              {/* {spot.author.avatar} */}
            </div>
            {/* NAME + DATE */}
            <div className="flex flex-col">
              <span className="flex  row gap-1 items-baseline text-sm font-medium">
                <User size={13} className="text-gray-500" />
                {spot.author.name}
              </span>

              <span className="flex items-center text-xs gap-1 text-gray-500">
                <Calendar size={12} />
                {new Date(spot.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
