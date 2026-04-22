import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Marker de marca — Pantone 303 C (#022A3A) sobre contorno plateado (Pantone 877 C)
const hubMarker = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 20px; height: 20px;
      background: #022A3A;
      border: 2px solid #C7C8CA;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(2,42,58,0.25), 0 0 16px rgba(2,42,58,0.45);
      position: relative;
    ">
      <div style="
        position: absolute; inset: 3px;
        background: #C7C8CA;
        border-radius: 50%;
        opacity: 0.95;
      "></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -14],
})

export default function ProjectMap({ project }) {
  if (!project.coords) return null

  const [lat, lng] = project.coords
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

  return (
    <div className="relative">
      <MapContainer
        center={[lat, lng]}
        zoom={14.6}
        scrollWheelZoom={false}
        style={{ height: '320px', width: '100%' }}
        className="z-0"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={[lat, lng]} icon={hubMarker}>
          <Popup
            className="hub-map-popup"
            closeButton={false}
            offset={[0, -8]}
          >
            <div style={{
              background: '#022A3A',
              border: '1px solid rgba(199,200,202,0.30)',
              padding: '12px 14px',
              minWidth: '180px',
              fontFamily: 'Roboto, sans-serif',
            }}>
              <p style={{ color: '#C7C8CA', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>
                HUB · {project.status}
              </p>
              <p style={{ color: '#E5E6E8', fontSize: '13px', fontWeight: 700, marginBottom: '2px', fontFamily: 'Archivo, sans-serif', letterSpacing: '0.06em' }}>
                {project.name.toUpperCase()}
              </p>
              <p style={{ color: '#87888A', fontSize: '11px', marginBottom: '10px' }}>
                {project.address || project.location}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '6px 10px',
                  background: 'rgba(199,200,202,0.12)',
                  border: '1px solid rgba(199,200,202,0.35)',
                  color: '#C7C8CA',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Ver en Google Maps →
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
