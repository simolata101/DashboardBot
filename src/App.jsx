// File: src/App.jsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">📊 Message Log Viewer</h1>

      {loading ? (
        <p className="text-gray-300">Loading data...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="min-w-full text-sm">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Guild ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="even:bg-gray-800 odd:bg-gray-900 border-t border-gray-700">
                  <td className="px-4 py-2 font-mono">{log.user_id}</td>
                  <td className="px-4 py-2 font-mono">{log.guild_id}</td>
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
