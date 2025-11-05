import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  console.log("Form Data Received:", data);

  // Example: you could save to DB here

  return NextResponse.json({ message: "Form received successfully!" });
}
