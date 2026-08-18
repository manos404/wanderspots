import { prisma } from "@/lib/prisma";
import { SpotWithAuthor } from "@/app/types/spot";

export async function getSpotsWithLikes(
    userId: string | undefined
): Promise<SpotWithAuthor[]> {
    const spots: SpotWithAuthor[] = await prisma.spot.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: { id: true, name: true },
            }, likes: true
        },
    });

    return spots.map((spot) => ({
        ...spot,
        likedByUser: spot.likes.some((like) => like.userId === userId),
    }));
}