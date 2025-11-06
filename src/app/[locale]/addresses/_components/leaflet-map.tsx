"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";

// Leaflet default icons (Next.js fix)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapPinHouse } from "lucide-react";
import { useTranslations } from "next-intl";

// Leaflet default icons (Next.js fix)
const DefaultIcon = L.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Types
type LeafletMapProps = {
  initialCenter?: Coordinates;
  zoom?: number;
  onChange?: (coords: Coordinates) => void;
  setStep: (step: number) => void;
  onSelect: (coords: Coordinates) => void;
};

export default function LeafletMap({
  initialCenter,
  zoom = 15,
  onChange,
  setStep,
  onSelect,
}: LeafletMapProps) {
  // Translations
  const t = useTranslations();

  // States
  // Selected position (shared between geolocation and click)
  const [selected, setSelected] = useState<Coordinates | null>(null);

  // Variables
  const fallbackCenter: Coordinates = { lat: 30.0444, lng: 31.2357 };
  const mapInitialCenter = initialCenter ?? fallbackCenter;
  const center: LatLngExpression = selected ?? mapInitialCenter;

  // Ref
  const mapRef = useRef<L.Map | null>(null);

  // Effects
  // Propagate to parent
  useEffect(() => {
    if (selected && onChange) onChange(selected);
  }, [selected, onChange]);

  // Pan map when selected changes
  useEffect(() => {
    if (!selected || !mapRef.current) return;
    mapRef.current.setView([selected.lat, selected.lng], zoom, { animate: true });
  }, [selected, zoom]);

  // Handle find location
  const handleFindLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setStep(1);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: Coordinates = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setSelected(coords); // This triggers marker + pan
        onSelect(coords);
      },
      () => setStep(1),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  return (
    <div className="relative mt-4 border border-zinc-200 rounded-lg w-full h-80 overflow-hidden">
      {/* Find location button */}
      <div className="top-4 right-4 z-[1000] absolute flex items-center gap-2 bg-zinc-50 hover:bg-zinc-100 px-3 py-2 border border-maroon-600 rounded-md text-maroon-600">
        <MapPinHouse className="w-5 h-5" />
        <button
          type="button"
          onClick={handleFindLocation}
          className="bg-transparent border-none font-medium text-maroon-600 hover:text-maroon-700 cursor-pointer"
        >
          {t("find-your-location")}
        </button>
      </div>

      {/* Map container */}
      <MapContainer center={center} zoom={zoom} className="w-full h-full" ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pass selected position to LocationMarker */}
        <LocationMarker
          selected={selected}
          onSelect={(coords) => {
            setSelected(coords);
            onSelect(coords);
          }}
        />
      </MapContainer>
    </div>
  );
}

// Updated LocationMarker: uses both click and external selected position
function LocationMarker({
  selected,
  onSelect,
}: {
  selected: Coordinates | null;
  onSelect: (c: Coordinates) => void;
}) {
  useMapEvents({
    click(e) {
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
      onSelect(coords);
    },
  });

  // Show marker if selected exists (from geolocation OR click)
  return selected ? (
    <Marker position={selected}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}
