import { auth } from "@/auth";
import SpotList from "@/components/SpotList";
import { getSpotsWithLikes } from "@/lib/getSpots";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SpotPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const spotsWithLikes = await getSpotsWithLikes(session?.user?.id);

  return <SpotList initialSpots={spotsWithLikes} openSpotId={id} />;
}
