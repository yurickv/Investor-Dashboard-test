# Investor Dashboard App

A secure, server-rendered investment dashboard built with Next.js and Supabase. It allows investors to log in, view their investment portfolio, and simulate payouts using real-time database updates. AI-assisted tooling was used to accelerate development and logic design.

## 🧰 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org)
- **Backend-as-a-Service:** [Supabase](https://supabase.com) (PostgreSQL, Auth, API)
- **UI Styling:** Tailwind CSS
- **Type Checking:** TypeScript
- **Authentication:** Supabase Auth with `investor_id` stored in secure cookies
- **AI Tools:**
  - **OpenAI ChatGPT**: Prompt-driven design, logic validation, and error resolution
  - **GitHub Copilot** (optional): In-editor code suggestions

---

## ⚙️ Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yurickv/Investor-Dashboard-test.git
   cd Investor-Dashboard-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env.local**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. **Run locally**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

## 🛠 Features

- Secure login and session via cookies
- Protected dashboard using server-side checks and middleware
- Investor portfolio table with:
  - ROI% and next distribution date sorting
  - Payout simulation: adds calculated value to distributions_received and updates next_distribution_date
- Supabase integration

## 🚀 Simulate Payout Logic

Each investment row includes a button to simulate a monthly payout:

- Payout = market_value \* roi_percent / 100
- Updates:
  - distributions_received in investor_summary
  - next_distribution_date in both investor_summary and investments

Supabase RPC or API endpoints handle this securely.
