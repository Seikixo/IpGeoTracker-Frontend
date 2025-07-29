import { useQuery } from '@tanstack/react-query';
import { fetchGeoData } from '../services/geo';

export const useGeo = (ip: string | null) => {
  return useQuery({
    queryKey: ['geo', ip],
    queryFn: () => fetchGeoData(ip ?? ''),
    enabled: !!ip || ip === '',
    retry: false,
  });
};
