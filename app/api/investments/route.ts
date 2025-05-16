import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from("investments").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
