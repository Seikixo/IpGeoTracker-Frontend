import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useGeo } from '../hooks/useGeo';

const isValidIP = (ip: string) =>
  /^(?!0)(?!.*\.$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);


export default function Home() {
  const { user, logout } = useAuth();
  const [searchIP, setSearchIP] = useState('');
  const [currentIP, setCurrentIP] = useState<string | null>(''); 
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');

  const { data, isLoading, isError } = useGeo(currentIP);

  const handleSearch = () => {
    if(!isValidIP(searchIP)) {
      setError('Invalid IP address.');
      return;        
    }

    setCurrentIP(searchIP);
    setHistory((prev) => [...new Set([searchIP, ...prev])]);
    setError('');
  }

  const handleClear = () => {
    setSearchIP('');
    setCurrentIP('');
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1>Welcome {user?.name}</h1>
        <div className="flex gap-2 items-center">
            <input
            type="text"
            className="form-input px-3 py-2 border rounded w-full"
            placeholder="Enter IP address..."
            value={searchIP}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchIP(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
            Search
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
            Clear
            </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {isLoading ? (
            <p>Loading geolocation...</p>
        ) : isError ? (
            <p className="text-red-500">Failed to fetch geolocation.</p>
        ) : (
            <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Geolocation Info</h2>
            <ul className="mt-2 space-y-1">
                <li><strong>IP:</strong> {data.ip}</li>
                <li><strong>City:</strong> {data.city}</li>
                <li><strong>Region:</strong> {data.region}</li>
                <li><strong>Country:</strong> {data.country}</li>
                <li><strong>Location:</strong> {data.loc}</li>
                <li><strong>Org:</strong> {data.org}</li>
                <li><strong>Timezone:</strong> {data.timezone}</li>
            </ul>
            </div>
        )}

        {history.length > 0 && (
            <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Search History</h2>
            <ul className="list-disc list-inside">
                {history.map((ip, index) => (
                <li key={index} className="text-sm">{ip}</li>
                ))}
            </ul>
            </div>
        )}
        <button className="text-blue-500 underline" onClick={logout}>Logout</button>
    </div>    
  );
}
