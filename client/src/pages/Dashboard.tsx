import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../services/api';

type LeaderboardEntry = {
  product_id: number;
  product_name: string;
  type_number: string;
  count: number;
};

type Event = {
  id: number;
  machine: string;
  product: {
    product_name: string;
    type_number: string;
  };
  event_type: string;
  event_date: string;
};

function Dashboard() {
  const [from, setFrom] = useState('2025-01-01T10:00');
  const [to, setTo] = useState('2025-07-01T03:00');
  const [machine, setMachine] = useState('');
  const [machines, setMachines] = useState<string[]>([]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<LeaderboardEntry | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    api.get('/machines').then(res => setMachines(res.data));
  }, []);


  useEffect(() => {
    fetchLeaderboard();
  }, []);


  const fetchLeaderboard = () => {
    api.get('/leaderboard', {
      params: { from, to, machine },
    })
      .then(res => {
        setLeaderboard(res.data);
        console.log("Leaderboard betöltve:", res.data);
        if (res.data.length === 0) {
          setErrorMessage('Nincs megjeleníthető adat a kiválasztott szűrőkkel.');
        } else {
          setErrorMessage(null);
        }
      })
      .catch(err => {
        console.error("Hiba a leaderboard lekérésekor:", err);
        setErrorMessage('Hiba történt az adatok betöltése közben.');
      });
      api.get('/leaderboard', {
        params: { from, to, machine },
    }).then(res => {
        console.log("API válasz:", res.data);
        setLeaderboard(res.data);
    }).catch(err => {
        console.error("Hiba a leaderboard API hívásnál:", err);
  });
  };

  const fetchEventsForProduct = (productId: number) => {
    setEvents([]);
    api.get('/events', {
      params: { from, to, machine, product_id: productId },
    }).then(res => {
      setEvents(res.data);
    });
  };

  const handleBarClick = (entry: LeaderboardEntry) => {
    setSelectedProduct(entry);
    fetchEventsForProduct(entry.product_id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      {/* filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input type="datetime-local" value={from} onChange={e => setFrom(e.target.value)} className="p-2 border rounded" />
        <input type="datetime-local" value={to} onChange={e => setTo(e.target.value)} className="p-2 border rounded" />
        <select value={machine} onChange={e => setMachine(e.target.value)} className="p-2 border rounded">
          <option value="">Összes gép</option>
          {machines.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button onClick={fetchLeaderboard} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Frissítés
        </button>
      </div>

      {/* show diagram or error */}
      <div className="w-full h-[400px] bg-white p-4 rounded shadow mb-8">
        {leaderboard.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={leaderboard}
                margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                dataKey="product_name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar
                dataKey="count"
                fill="#60a5fa"
                onClick={(data) => handleBarClick(data)}
                />
            </BarChart>
            </ResponsiveContainer>
        ) : (
            <p className="text-gray-500">Nincs adat a kiválasztott szűrőkkel.</p>
        )}
       </div>

      {/* click events */}
      {selectedProduct && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Események: {selectedProduct.product_name} ({selectedProduct.type_number})
          </h2>
          {events.length === 0 ? (
            <p className="text-gray-500">Nincs esemény az adott szűrésre.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Dátum</th>
                  <th className="p-2">Gép</th>
                  <th className="p-2">Eredmény</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="border-t">
                    <td className="p-2">{new Date(ev.event_date).toLocaleString('hu-HU')}</td>
                    <td className="p-2">{ev.machine}</td>
                    <td className="p-2">{ev.event_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
