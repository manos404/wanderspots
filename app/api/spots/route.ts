import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { name, category, description, location, imageUrl, lat, lon } = await req.json()

    const spot = await prisma.spot.create({
        data: {
            name,
            category,
            description,
            location,
            imageUrl,
            latitude: lat,
            longitude: lon,
            authorId: session.user.id
        }
    })

    return NextResponse.json({ success: true, spot })
}

export async function GET() {
  const spots = await prisma.spot.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(spots);
}