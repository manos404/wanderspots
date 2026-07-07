"use client";

import { Spot } from "../app/types/spot";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { divIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { MapPin } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  spots: Spot[];
}
const customIcon = divIcon({
  html: renderToString(<MapPin color=" #0284c7" size={32} />),
  className: "",
  iconAnchor: [16, 32],
});
export default function Map({ spots = [] }: MapProps) {
  return (
    <MapContainer
      center={[40.015, -105.2705]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          icon={customIcon}
          position={[spot.latitude, spot.longitude]}
        >
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
