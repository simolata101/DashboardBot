import React from "react";
import './assets/style.css';

export default function App() {
  return (
    <div className="dashboard">
      <header>
        <h1>🌙 Kawaii Discord Dashboard 🎀</h1>
        <p>Welcome to your super cute and stylish server dashboard! 💖</p>
      </header>
      <main>
        <section className="card">
          <h2>👥 Total Members</h2>
          <p>1234</p>
        </section>
        <section className="card">
          <h2>💬 Active Channels</h2>
          <p>#general, #music</p>
        </section>
        <section className="card">
          <h2>🧚‍♀️ Boost Level</h2>
          <p>Level 2 ✨</p>
        </section>
      </main>
    </div>
  );
}
