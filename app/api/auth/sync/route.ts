import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);

    const user = await prisma.user.upsert({
      where: { id: decoded.uid },
      update: {
        email: decoded.email ?? "",
        name: decoded.name ?? null,
      },
      create: {
        id: decoded.uid,
        email: decoded.email ?? "",
        name: decoded.name ?? null,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}