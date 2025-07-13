import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from('message_log')
        .select('*')
        .order('date', { ascending: false });

      if (error) console.error(error);
      else setLogs(data);

      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#2e2257] text-white p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-purple-300">📊 Message Log Viewer</h1>
        <p className="text-purple-400 mt-1 text-sm">Real-time transparency powered by Supabase</p>
      </header>

      {loading ? (
        <div className="text-center text-purple-300">Loading logs...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-purple-700 bg-[#3a2e67]">
          <table className="min-w-full table-auto text-sm text-purple-100">
            <thead className="bg-[#4c3b87] text-purple-200">
              <tr>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Guild ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className={`hover:bg-[#554189] ${
                    index % 2 === 0 ? 'bg-[#3a2e67]' : 'bg-[#352a5c]'
                  }`}
                >
                  <td className="px-4 py-2">{log.user_id}</td>
                  <td className="px-4 py-2">{log.guild_id}</td>
                  <td className="px-4 py-2">{log.date}</td>
                  <td className="px-4 py-2">{log.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
