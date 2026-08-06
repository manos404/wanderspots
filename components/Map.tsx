"use client";
import { SpotWithAuthor } from "@/app/types/spot";

// import { Spot } from "@/lib/generated/prisma/client";
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
import { useModalStore } from "@/app/store/useModalStore";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  spots?: SpotWithAuthor[];
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
  const { openModal } = useModalStore();
  return (
    <MapContainer
      center={[37.8165449, 20.8642323]}
      zoom={4}
      style={{ height: "600px", width: "100%" }}
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
            <div className="flex flex-col">
              <h1 className="text-base">{spot.name}</h1>
              <h2 className="text-sm">{spot.description}</h2>

              <button
                className="self-end text-blue-600"
                onClick={() => openModal("spotDetail", spot)}
              >
                Click to view
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
