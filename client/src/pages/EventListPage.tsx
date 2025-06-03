import { useEffect, useState } from 'react';
import api from '../services/api';

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

function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [from, setFrom] = useState('2025-03-01');
  const [to, setTo] = useState('2025-03-31');
  const [machine, setMachine] = useState('');
  const [machines, setMachines] = useState<string[]>([]);

  useEffect(() => {
    // gépek lekérése dropdownhoz
    api.get('/machines')
      .then(res => setMachines(res.data))
      .catch(console.error);
  }, []);

  const fetchEvents = () => {
    api.get('/events', {
      params: {
        from,
        to,
        machine,
      },
    })
      .then(res => setEvents(res.data))
      .catch(console.error);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Események</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="p-2 border rounded" />
        <select value={machine} onChange={e => setMachine(e.target.value)} className="p-2 border rounded">
          <option value="">Összes gép</option>
          {machines.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button onClick={fetchEvents} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Keresés
        </button>
      </div>

      {events.length > 0 ? (
        <table className="w-full bg-white border rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Dátum</th>
              <th className="p-2">Termék</th>
              <th className="p-2">Típus</th>
              <th className="p-2">Gép</th>
              <th className="p-2">Eredmény</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev.id} className="border-t">
                <td className="p-2">{new Date(ev.event_date).toLocaleString('hu-HU')}</td>
                <td className="p-2">{ev.product?.product_name || '-'}</td>
                <td className="p-2">{ev.product?.type_number || '-'}</td>
                <td className="p-2">{ev.machine}</td>
                <td className="p-2">{ev.event_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Nincs találat.</p>
      )}
    </div>
  );
}

export default EventListPage;
