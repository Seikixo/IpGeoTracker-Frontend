import { createContext, useContext } from "react";

type GeoData = {
  location: string;
  city: string;
  region: string;
  country: string;
};

export const GeoMapContext = createContext<GeoData | undefined>(undefined);

export const useGeoMap = () => {
  const context = useContext(GeoMapContext);
  if (!context) throw new Error('useGeoMap must be used inside GeoMapContext.Provider');
  return context;
}

