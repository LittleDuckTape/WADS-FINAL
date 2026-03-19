import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Create user in Firebase
    const firebaseUser = await adminAuth.createUser({
      email,
      password,
      displayName: name ?? undefined,
    });

    // Sync to Prisma
    const user = await prisma.user.upsert({
      where: { id: firebaseUser.uid },
      update: {
        email: firebaseUser.email ?? "",
        name: name ?? null,
      },
      create: {
        id: firebaseUser.uid,
        email: firebaseUser.email ?? "",
        name: name ?? null,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    console.error("Register error:", error);

    // Handle Firebase specific errors
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
