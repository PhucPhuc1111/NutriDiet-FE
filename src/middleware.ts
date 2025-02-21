import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const role = req.cookies.get("userRole")?.value;

  // Nếu không có token hoặc không phải admin → Redirect về trang chủ
  if (!token || role !== "Admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các route bắt đầu với "/admin/"
export const config = {
  matcher: "/admin/:path*",
};
