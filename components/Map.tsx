"use client";

import { Spot } from "../app/types/spot";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
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
  spots?: Spot[];
  pickable?: boolean;
  onPick?: (lat: number, lng: number) => void;
  pickedPosition?: { lat: number; lng: number } | null;
}

const customIcon = divIcon({
  html: renderToString(<MapPin color=" #0284c7" size={32} />),
  className: "",
  iconAnchor: [16, 32],
});

function ClickHandler({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function Map({
  spots = [],
  pickable = false,
  onPick,
  pickedPosition,
}: MapProps) {
  return (
    <MapContainer
      center={[37.8165449, 20.8642323]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
      className="rounded-2xl "
    >
      {pickable && onPick && <ClickHandler onPick={onPick} />}

      {pickedPosition && (
        <Marker
          icon={customIcon}
          position={[pickedPosition.lat, pickedPosition.lng]}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              onPick?.(lat, lng);
            },
          }}
        />
      )}
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          icon={customIcon}
          position={[spot.latitude, spot.longitude]}
        >
          <Popup>
            <h1>{spot.name}</h1>
            <h2>{spot.description}</h2>
          </Popup>
        </Marker>
      ))}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
