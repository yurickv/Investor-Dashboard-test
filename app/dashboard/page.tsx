import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabaseClient";
import Metrics from "@/conponents/Metrics";
import InvestmentTable from "@/conponents/InvestmentTable";

export default async function DashboardPage() {
  const cookieStore = await cookies(); // ✅ async
  const investorId = cookieStore.get("investor_id")?.value;

  if (!investorId) {
    return <div>No investor found</div>; // або редирект
  }

  const supabase = await createSupabaseServerClient();

  const { data: summaries } = await supabase
    .from("investor_summary")
    .select("*")
    .eq("id", investorId)
    .single();

  const { data: investments } = await supabase
    .from("investments")
    .select("*")
    .eq("investor_id", investorId);

  return (
    <main className='p-6 space-y-6'>
      <h1 className='text-3xl font-bold'>Investor Dashboard</h1>
      <Metrics summary={summaries ?? null} />
      <InvestmentTable data={investments ?? []} />
    </main>
  );
}
