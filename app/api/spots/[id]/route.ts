import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {

    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;
      console.log("PUT SPOT ID:", id);
    const {
        name,
        category,
        description,
        location,
        imageUrl,
        lat,
        lon,
    } = await req.json();

    const spot = await prisma.spot.update({
        where: {
            id,
        },
        data: {
            name,
            category,
            description,
            location,
            imageUrl,
            latitude: lat,
            longitude: lon,
        },
    });

    return NextResponse.json({ success: true, spot });
}