import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { addMonths, parseISO, formatISO } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const investment = await req.json();
    console.log("Received investment:", investment);

    const {
      investor_id,
      id,
      market_value,
      roi_percent,
      next_distribution_date,
    } = investment;

    if (!investor_id || !id || !next_distribution_date) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // 1. Fetch summary
    const { data: summary, error: summaryErr } = await supabase
      .from("investor_summary")
      .select("distributions_received")
      .eq("id", investor_id)
      .single();

    if (summaryErr || !summary) {
      console.error("Summary fetch error:", summaryErr);
      return NextResponse.json(
        { error: summaryErr?.message ?? "Summary not found" },
        { status: 500 }
      );
    }

    const payoutAmount = market_value * (roi_percent / 100);
    const newDistributions =
      (summary.distributions_received ?? 0) + payoutAmount;

    // 2. Update investor_summary (distributions_received)
    const { error: updateSummaryErr } = await supabase
      .from("investor_summary")
      .update({
        distributions_received: newDistributions,
      })
      .eq("id", investor_id);

    if (updateSummaryErr) {
      console.error("Error updating investor_summary", updateSummaryErr);
      return NextResponse.json(
        { error: updateSummaryErr.message },
        { status: 500 }
      );
    }

    // 3. Update investments (next_distribution_date)
    const newNextDate = formatISO(
      addMonths(parseISO(next_distribution_date), 1),
      {
        representation: "date",
      }
    );

    const { error: updateInvErr } = await supabase
      .from("investments")
      .update({
        next_distribution_date: newNextDate,
      })
      .eq("id", id);

    if (updateInvErr) {
      console.error("Error updating investment", updateInvErr);
      return NextResponse.json(
        { error: updateInvErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
