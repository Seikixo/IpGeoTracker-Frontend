import { useAuth } from '../hooks/useAuth';
import { useMemo, useState } from 'react';
import { useGeo } from '../hooks/useGeo';
import {
  Button,
  Card,
  TextInput,
  Alert,
} from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import GeoMap from '../components/GeoMap';

const isValidIP = (ip: string) =>
  /^(?!0)(?!.*\.$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);


export default function Home() {
  const { user, logout } = useAuth();
  const [searchIP, setSearchIP] = useState('');
  const [currentIP, setCurrentIP] = useState<string | null>(''); 
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');

  const { data, isLoading, isError } = useGeo(currentIP);

    const formattedGeo = useMemo(() => {
    if (!data) return null;
    return [
        { label: 'IP', value: data.ip },
        { label: 'City', value: data.city },
        { label: 'Region', value: data.region },
        { label: 'Country', value: data.country },
        { label: 'Location', value: data.loc },
        { label: 'Org', value: data.org },
        { label: 'Timezone', value: data.timezone },
    ];
    }, [data]);

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
            <h1 className="text-2xl font-semibold">Welcome {user?.name}</h1>

            <div className="flex gap-2 items-center">
            <TextInput
                type="text"
                placeholder="Enter IP address..."
                value={searchIP}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchIP(e.target.value)}
                className="w-full"
            />
            <Button className='cursor-pointer' onClick={handleSearch}>Search</Button>
            <Button className='cursor-pointer' color="gray" onClick={handleClear}>Clear</Button>
            </div>

            {error && (
            <Alert color="failure" icon={HiInformationCircle}>
                {error}
            </Alert>
            )}

            {isLoading ? (
            <p>Loading geolocation...</p>
            ) : isError ? (
            <Alert color="failure" icon={HiInformationCircle}>
                Failed to fetch geolocation.
            </Alert>
            ) : (
            <Card>
                <h2 className="text-xl font-bold">Geolocation Info</h2>
                <ul className="mt-2 space-y-1 text-sm">
                    {formattedGeo?.map((item, index) => (
                        <li key={index}><strong>{item.label}:</strong> {item.value}</li>
                    ))}
                </ul>
            </Card>
            )}

            {history.length > 0 && (
            <Card>
                <h2 className="text-lg font-semibold mb-2">Search History</h2>
                <ul className="list-disc list-inside text-sm">
                {history.map((ip, index) => (
                    <li key={index}>{ip}</li>
                ))}
                </ul>
            </Card>
            )}

            {data?.loc && (
            <Card>
                <h2 className="text-lg font-semibold mb-2">Map Location</h2>
                <GeoMap
                location={data.loc}
                city={data.city}
                region={data.region}
                country={data.country}
                />
            </Card>
            )}            

            <Button className='cursor-pointer' color="red" onClick={logout}>Logout</Button>
        </div>
    );
}
