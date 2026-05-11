import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: any) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/notebook/:path*", "/login"],
};
