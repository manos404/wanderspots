import { auth } from "@/auth";
import SpotList from "@/components/SpotList";
import { getSpotsWithLikes } from "@/lib/getSpots";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const spot = await prisma.spot.findUnique({ where: { id } });

  return {
    title: spot?.name,
    description: spot?.description,
    openGraph: {
      title: spot?.name,
      description: spot?.description,
      images: [spot?.imageUrl ?? ""],
    },
  };
}
export default async function SpotPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const spotsWithLikes = await getSpotsWithLikes(session?.user?.id);

  return <SpotList initialSpots={spotsWithLikes} openSpotId={id} />;
}
