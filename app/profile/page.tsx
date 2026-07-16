import { auth } from "@/auth";
import { SpotWithAuthor } from "../types/spot";
import { prisma } from "@/lib/prisma";
import ProfileContent from "@/components/ProfileContent";

export default async function Profile() {
  const session = await auth();

  if (!session) return null;

  const spots: SpotWithAuthor[] = await prisma.spot.findMany({
    where: {
      authorId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  //   console.log(spots);
  return <ProfileContent spots={spots} userName={session.user?.name} />;
}
