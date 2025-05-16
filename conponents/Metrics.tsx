interface SummaryProps {
  summary: {
    total_invested_amount: number;
    portfolio_value: number;
    distributions_received: number;
    outstanding_commitments: number;
  } | null;
}

export default function Metrics({ summary }: SummaryProps) {
  if (!summary) {
    return (
      <div className='text-gray-500 bg-white p-4 rounded shadow'>
        Loading summary...
      </div>
    );
  }

  const metrics = [
    { label: "Total Invested", value: `$${summary.total_invested_amount}` },
    { label: "Portfolio Value", value: `$${summary.portfolio_value}` },
    {
      label: "Distributions Received",
      value: `$${summary.distributions_received}`,
    },
    {
      label: "Outstanding Commitments",
      value: `$${summary.outstanding_commitments}`,
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-800'>
      {metrics.map((m, i) => (
        <div key={i} className='bg-white p-4 rounded shadow'>
          <div className='text-sm'>{m.label}</div>
          <div className='text-xl font-bold'>{m.value}</div>
        </div>
      ))}
    </div>
  );
}
