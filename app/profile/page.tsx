import { auth } from "@/auth";
import { SpotWithAuthor } from "../types/spot";
import { prisma } from "@/lib/prisma";
import ProfileContent from "@/components/ProfileContent";
import { SignInPrompt } from "@/components/SignInPrompt";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    return <SignInPrompt />;
  }

  const spots: SpotWithAuthor[] = await prisma.spot.findMany({
    where: {
      authorId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      likes: true,
    },
  });
  const spotsWithLikes = spots.map((spot) => ({
    ...spot,
    likedByUser: spot.likes.some((like) => like.userId === session?.user?.id),
  }));
  //   console.log(spots);
  return (
    <ProfileContent spots={spotsWithLikes} userName={session.user?.name} />
  );
}
