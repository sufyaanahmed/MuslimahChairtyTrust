import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WorldMap = ({ location = { lat: 13.0246, lng: 77.5946, label: 'We are here' } }) => {
  return (
    <div className="relative w-full h-full bg-gray-100">
      <ComposableMap
        projectionConfig={{
          scale: 1500, // Increased scale to zoom in on India
          center: [location.lng, location.lat], // Centered on Bangalore
        }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#9CA3AF"
                stroke="#6B7280"
                strokeWidth={0.3}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        <Marker coordinates={[location.lng, location.lat]}>
          <g>
            {/* Outer glow */}
            <circle
              r={12}
              fill="#22c55e"
              opacity={0.3}
              className="animate-ping"
            />
            {/* Middle pulse */}
            <circle
              r={8}
              fill="#22c55e"
              opacity={0.6}
              className="animate-pulse"
            />
            {/* Inner dot */}
            <circle
              r={4}
              fill="#22c55e"
            />
            {/* Line to label */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={-30}
              stroke="#6B7280"
              strokeWidth={1}
              opacity={0.5}
            />
            {/* Label */}
            <g transform="translate(0, -45)">
              <rect
                x={-40}
                y={-10}
                width={80}
                height={20}
                fill="#1F2937"
                rx={4}
                opacity={0.9}
              />
              <text
                textAnchor="middle"
                fill="#ffffff"
                fontSize={10}
                fontWeight={500}
              >
                {location.label}
              </text>
            </g>
          </g>
        </Marker>
      </ComposableMap>
    </div>
  )
}

export default WorldMap

