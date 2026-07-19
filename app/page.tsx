import { prisma } from "@/lib/prisma";
import SpotList from "../components/SpotList";
import { Spot, User } from "@/lib/generated/prisma/client";
import { SpotWithAuthor } from "@/app/types/spot";

// export type SpotWithAuthor = Spot & {
//   author: User;
// };
export default async function Home() {
  const spots: SpotWithAuthor[] = await prisma.spot.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  // console.log(spots);
  return <SpotList initialSpots={spots} />;
}
