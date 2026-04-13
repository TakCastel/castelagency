import { NextResponse } from "next/server";

import { searchTrainingEntries } from "@/lib/training/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const results = await searchTrainingEntries(query);

  return NextResponse.json({ results });
}
