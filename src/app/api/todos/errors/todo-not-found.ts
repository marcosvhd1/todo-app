import { NextResponse } from "next/server";

export function TodoNotFound() {
  return NextResponse.json({ message: "Todo Not Found" });
}
