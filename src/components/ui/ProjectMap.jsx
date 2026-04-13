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

// Custom branded marker: blue  circle with glow
const hubMarker = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 20px; height: 20px;
      background: #1e5cd4;
      border: 2px solid #4a87f5;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(30,92,212,0.25), 0 0 16px rgba(30,92,212,0.5);
      position: relative;
    ">
      <div style="
        position: absolute; inset: 3px;
        background: #fff;
        border-radius: 50%;
        opacity: 0.9;
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
              background: '#0f1117',
              border: '1px solid rgba(30,92,212,0.3)',
              padding: '12px 14px',
              minWidth: '180px',
              fontFamily: 'Inter, sans-serif',
            }}>
              <p style={{ color: '#4a87f5', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>
                HUB · {project.status}
              </p>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700, marginBottom: '2px', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em' }}>
                {project.name.toUpperCase()}
              </p>
              <p style={{ color: '#718096', fontSize: '11px', marginBottom: '10px' }}>
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
                  background: 'rgba(30,92,212,0.15)',
                  border: '1px solid rgba(30,92,212,0.35)',
                  color: '#4a87f5',
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
