import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@teszt.hu' && password === 'password') {
      navigate('/dashboard');
    } else {
      setError('Hibás email vagy jelszó.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Bejelentkezés</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Belépés
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
