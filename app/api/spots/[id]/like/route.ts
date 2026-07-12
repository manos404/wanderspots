import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { id: spotId } = await params  // ← εδώ το await

    // ελέγχουμε αν υπάρχει ήδη like
    const existing = await prisma.like.findUnique({
        where: { userId_spotId: { userId, spotId } }
    })

    if (existing) {
        // αφαίρεσε like
        await prisma.like.delete({
            where: { userId_spotId: { userId, spotId } }
        })
        await prisma.spot.update({
            where: { id: spotId },
            data: { likesCount: { decrement: 1 } }
        })
        return NextResponse.json({ liked: false })
    } else {
        // πρόσθεσε like
        await prisma.like.create({
            data: { userId, spotId }
        })
        await prisma.spot.update({
            where: { id: spotId },
            data: { likesCount: { increment: 1 } }
        })
        return NextResponse.json({ liked: true })
    }
}