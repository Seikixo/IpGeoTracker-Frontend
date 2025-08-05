import { Card } from "flowbite-react";

type FormattedGeoItem = {
  label: string;
  value: string;   
}

interface GeoInfoProps {
  formattedGeo: FormattedGeoItem[] | null;
}

export default function GeoInfo({ formattedGeo }: GeoInfoProps)
{
    if (!formattedGeo) return null;
    return(
        <Card>
            <h2 className="text-xl font-bold">Geolocation Info</h2>
            <ul className="mt-2 space-y-1 text-sm">
                {formattedGeo.map((item: FormattedGeoItem, index: number) => (
                    <li key={index}><strong>{item.label}:</strong> {item.value}</li>
                ))}
            </ul>
        </Card>
    )


}