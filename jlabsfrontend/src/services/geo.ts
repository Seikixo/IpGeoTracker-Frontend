import axios from 'axios';

export const fetchGeoData = async (ip: string = '') => {
  const url = `https://ipinfo.io/${ip}/geo`;
  const response = await axios.get(url);
  return response.data;
};
