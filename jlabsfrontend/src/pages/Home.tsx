import { useAuth } from '../hooks/useAuth';
import { useMemo, useState } from 'react';
import { useGeo } from '../hooks/useGeo';
import {
  Button,
  Card,
  Alert,
} from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import GeoMap from '../components/GeoMap';
import { GeoMapContext } from '../hooks/useGeoMapContext';
import SearchForm from '../components/SearchForm';


export default function Home() {
  const { user, logout } = useAuth();
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

    const geoContextValue = useMemo(() => {
      if (!data) return null;

      return {
        location: data.loc,
        city: data.city,
        region: data.region,
        country: data.country,
      };
    }, [data]);

    return (
        <div className="max-w-xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-semibold">Welcome {user?.name}</h1>

            <div className="flex gap-2 items-center">
            <SearchForm
              onSearch={(ip) => {
                setCurrentIP(ip);
                setHistory((prev) => [...new Set([ip, ...prev])]);
                setError('');
              }}
              onClear={() => {
                setCurrentIP('');
                setError('');
              }}
            />
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

            {geoContextValue && (
              <Card>
                <h2 className="text-lg font-semibold mb-2">Map Location</h2>
                <GeoMapContext.Provider value={geoContextValue}>
                  <GeoMap />
                </GeoMapContext.Provider>
              </Card>
            )}         

            <Button className='cursor-pointer' color="red" onClick={logout}>Logout</Button>
        </div>
    );
}
