import axios from 'axios';

export const fetchGeoData = async (ip: string = ''): Promise<Geo> => {
  const url = `https://ipinfo.io/${ip}/geo`;
  const response = await axios.get(url);
  return response.data;
};

type Geo = {
  ip: string,
  city: string,
  region: string,
  country: string,
  loc: string,
  org: string,
  postal: string,
  timezone: string,
}
