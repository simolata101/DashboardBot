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
  const [date, setDate] = useState('');
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchLogs = async () => {
      let query = supabase
        .from('message_log')
        .select('*')
        .order('date', { ascending: false });

      if (date) query = query.eq('date', date);

      const { data, error } = await query;
      if (error) console.error(error);
      else {
        setLogs(data);
        fetchUsernames(data.map(log => log.user_id));
      }
      setLoading(false);
    };

    const fetchUsernames = async (userIds) => {
      const uniqueIds = [...new Set(userIds)];
      const usernamesObj = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const res = await fetch(`https://discord.com/api/users/${id}`, {
              headers: {
                Authorization: `Bot ${import.meta.env.VITE_DISCORD_BOT_TOKEN}`
              }
            });
            if (res.ok) {
              const json = await res.json();
              usernamesObj[id] = `${json.username}#${json.discriminator}`;
            } else {
              usernamesObj[id] = id;
            }
          } catch {
            usernamesObj[id] = id;
          }
        })
      );
      setUsernames(usernamesObj);
    };

    fetchLogs();
  }, [date]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Message Log Viewer</h1>

      <div className="mb-4">
        <label className="block mb-1">Filter by Date:</label>
        <input
          type="date"
          className="text-black px-2 py-1 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-purple-600">
            <thead>
              <tr className="bg-purple-800">
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="even:bg-purple-800">
                  <td className="px-4 py-2">{usernames[log.user_id] || log.user_id}</td>
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
