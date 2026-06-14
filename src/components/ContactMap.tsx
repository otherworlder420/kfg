import { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyBrHgXcP3zume0wzswXnIvUcQ8AtiIolnA";

const MILL_LOCATIONS = [
  {
    id: "kampongspeu",
    name: "Khmer Foods Group (Kampong Speu)",
    address:
      "#9021, National Road No.3, Prey Totueng Village, Preah Nipean Commune, Kong Pisei District, Kampong Speu Province, Cambodia",
    lat: 11.3995738,
    lng: 104.7748663,
    mapUrl: "https://maps.app.goo.gl/6mzU837Chiu1Nn9a8",
    color: "default",
  },
  {
    id: "battambang",
    name: "Khmer Foods Group (Battambang)",
    address: "Battambang Province, Cambodia",
    lat: 13.3065953,
    lng: 103.0692492,
    mapUrl: "https://maps.app.goo.gl/iYj3MJ8LZFSsC54eA",
    color: "green",
  },
];

export default function ContactMap() {
  const wrapperRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const infoWindowsRef = useRef<Record<string, any>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Lazy-load map when it scrolls into view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load Google Maps and initialize map
  useEffect(() => {
    if (!isVisible || !mapRef.current) return;

    const initMap = () => {
      if (!mapRef.current || !(window as any).google?.maps) return;

      const google = (window as any).google;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 12.5, lng: 105 },
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      MILL_LOCATIONS.forEach((loc) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.name,
          icon: loc.color === "green" ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png" : undefined,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 160px; font-family: inherit;">
              <strong style="font-size: 14px; color: #1a1a1a;">${loc.name}</strong>
              <div style="margin-top: 6px;">
                <a href="${loc.mapUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #c9a227; text-decoration: none;">
                  View on Google Maps →
                </a>
              </div>
            </div>
          `,
          disableAutoPan: true,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        markersRef.current[loc.id] = marker;
        infoWindowsRef.current[loc.id] = infoWindow;
      });

      setIsMapLoaded(true);
    };

    if ((window as any).google?.maps) {
      initMap();
      return;
    }

    (window as any).initGoogleMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      delete (window as any).initGoogleMap;
    };
  }, [isVisible]);

  const openInfoWindow = (id: string) => {
    const marker = markersRef.current[id];
    const infoWindow = infoWindowsRef.current[id];
    const map = mapInstanceRef.current;
    if (marker && infoWindow && map) {
      infoWindow.open(map, marker);
    }
  };

  return (
    <section ref={wrapperRef} className="bg-cream-200">
      <div className="h-[400px] w-full bg-dark-200 relative">
        {isVisible && <div ref={mapRef} className="w-full h-full" />}

        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-200">
            <p className="text-cream-100/60 text-sm">{isVisible ? "Loading map…" : "Scroll to view map"}</p>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex flex-col gap-2 max-w-xs">
          {MILL_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => openInfoWindow(loc.id)}
              className="text-left bg-cream-100 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <p className="font-medium text-dark-800 text-sm">{loc.name}</p>
              <p className="text-dark-500 text-xs mt-1 line-clamp-2">{loc.address}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
