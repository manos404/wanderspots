import { auth } from "@/auth";
import SpotList from "../components/SpotList";
import { getSpotsWithLikes } from "@/lib/getSpots";

export default async function Home() {
  const session = await auth();
  const spotsWithLikes = await getSpotsWithLikes(session?.user?.id);

  // console.log(spotsWithLikes[0]);
  return <SpotList initialSpots={spotsWithLikes} />;
}
