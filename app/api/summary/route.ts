import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data: summaries, error } = await supabase
    .from("investor_summary")
    .select("*")
    .limit(1);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(summaries?.[0] ?? {});
}
