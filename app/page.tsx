import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import SpotList from "../components/SpotList";
import { SpotWithAuthor } from "@/app/types/spot";

export default async function Home() {
  const session = await auth();
  const spots: SpotWithAuthor[] = await prisma.spot.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, likes: true },
  });
  const spotsWithLikes = spots.map((spot) => ({
    ...spot,
    likedByUser: spot.likes.some((like) => like.userId === session?.user?.id),
  }));
  // console.log(spotsWithLikes[0]);
  return <SpotList initialSpots={spotsWithLikes} />;
}
