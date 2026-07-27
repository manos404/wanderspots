"use client";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

type LocationMarkerProps = {
  position: LatLng | null;
  setPosition: (pos: LatLng) => void;
};

export default function LocationMarker({
  position,
  setPosition,
}: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      console.log(e.latlng);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng());
        },
      }}
    />
  ) : null;
}
