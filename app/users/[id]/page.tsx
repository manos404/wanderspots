import { auth } from "@/auth";
import { SpotWithAuthor } from "@/app/types/spot";
import { prisma } from "@/lib/prisma";
import ProfileContent from "@/components/ProfileContent";
import { SignInPrompt } from "@/components/SignInPrompt";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  console.log(id);
  console.log(session);

  const user = await prisma.user.findUnique({ where: { id } });

  const spots: SpotWithAuthor[] = await prisma.spot.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: { id: true, name: true },
      },
      likes: true,
    },
  });
  console.log(spots);
  const spotsWithLikes = spots.map((spot) => ({
    ...spot,
    likedByUser: spot.likes.some((like) => like.userId === session?.user?.id),
  }));
  const isOwnProfile = session?.user?.id === id;

  return (
    <ProfileContent
      spots={spotsWithLikes}
      userName={user?.name}
      isOwnProfile={isOwnProfile}
    />
  );
}
