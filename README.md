# 🥊 UFCRealStats

**See the fight before it happens.**  
UFCRealStats is a high-performance, real-time analytics engine and dashboard that transforms raw octagon data into elite fight intelligence. Compare fighters, decode matchups, and forecast outcomes with a precision-built React application.

---

## ✨ Key Features

- **🔮 Predictive Matchup Engine**  
  Forecasts fight outcomes and statistical edges using historical fighter data such as Striking Accuracy, Takedown Defense, and SLpM.

- **📊 Live P4P Rankings**  
  Real-time display of the Men’s Pound-for-Pound top fighters, pulled directly from a self hosted API hosted using Kaggle datasets.

- **🔥 Trending Fighters Tracking**  
  Highlights high-output fighters sorted by Significant Strikes Landed per Minute (SLpM).

- **🌓 Seamless Dual-Theme**  
  Flawless Light and Dark mode implementation powered by Tailwind CSS `class` strategy.

- **📱 Mobile-First Design**  
  Fully responsive UI with intelligent scaling, custom gradients, and touch-friendly navigation.

- **🛡️ Smart Image Proxy**  
  Bypasses strict CDN hotlink protections using `wsrv.nl` and falls back gracefully to custom UI avatars if an image fails to load.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 (Functional Components, Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom themes, native keyframe animations)
- **Routing:** React Router v6
- **API Hosting:** Supabase (REST API)
- **Deployment / Hosting:** Vercel 

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn installed

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/UFCRealStats.git
   cd UFCRealStats
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a file named exactly `.env.local` in the root directory of the project and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port Vite provides) to view the dashboard.

---

## 📂 Project Structure

A quick look at the core structure of the app:

```text
ufcrealstats/
├── .env.local
├── .git/
├── .gitignore
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── ufc-hero.jpg
├── README.md
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── fighters/
│   │   │   └── FighterCard.jsx
│   │   └── layout/
│   │       ├── AppLayout.jsx
│   │       ├── Navbar.jsx
│   │       └── ThemeToggle.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── CompareEngine.jsx
│   │   ├── Dashboard.jsx
│   │   └── FighterExplorer.jsx
│   ├── services/
│   │   └── api.js
│   └── store/
│       ├── fighterSlice.js
│       └── store.js
├── tailwind.config.js
└── vite.config.js
```

---

## 💡 Technical Highlights for Reviewers

- **No Redux / Heavy Libraries**  
  State is managed cleanly using native React hooks (`useState`, `useEffect`) to adhere strictly to core React principles.

- **Secure Data Fetching**  
  Utilizes the native Fetch API to communicate securely with Supabase, pulling fighter statistics through environment variables.

- **CSS Mastery**  
  Replicates a premium, complex design using pure Tailwind utility classes, custom CSS variables for theme toggling, and native CSS keyframe animations.

---

## 🤝 Contributors

**Prabhat Bhatia**  
2501410006
