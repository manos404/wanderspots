import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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
  const existingSpot = await prisma.spot.findUnique({
    where: { id },
  });
  if (!existingSpot) {
    return NextResponse.json(
      { error: "Spot not found" },
      { status: 404 }
    );
  }
  if (existingSpot.authorId !== session.user.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  const {
    name,
    category,
    description,
    city,
    country,
    searchLocation,
    imageUrl,
    imageId,
    latitude,
    longitude,
  } = await req.json();

  const spot = await prisma.spot.update({
    where: {
      id,
    },
    data: {
      name,
      category,
      description,
      city,
      country,
      searchLocation,
      imageUrl,
      imageId,
      latitude,
      longitude,
    },
  });

  return NextResponse.json({ success: true, spot });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const existingSpot = await prisma.spot.findUnique({
    where: { id },
  });
  if (!existingSpot) {
    return NextResponse.json(
      { error: "Spot not found" },
      { status: 404 }
    );
  }
  if (existingSpot.authorId !== session.user.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  if (existingSpot.imageId) {
    await cloudinary.uploader.destroy(existingSpot.imageId);
  }

  await prisma.spot.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
}