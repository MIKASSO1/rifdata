import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import rifData from '../../data/rif-regions.json';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface RifMapProps {
  onRegionClick: (regionName: string) => void;
}

const RifMap = ({ onRegionClick }: RifMapProps) => {
  const getRegionColor = (name: string) => {
    const colors: Record<string, string> = {
      'Western': '#FDD835', // Yellow
      'Central': '#1E88E5', // Blue
      'Eastern': '#8E24AA', // Purple
      'Beni Znassen': '#00897B' // Teal
    };
    return colors[name] || '#gray';
  };

  const regionStyle = (feature: any) => {
    return {
      fillColor: getRegionColor(feature.properties.name),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8
    };
  };

  const onEachRegion = (feature: any, layer: any) => {
    const regionName = feature.properties.name;

    layer.bindPopup(`<div style="text-align: center; font-family: sans-serif;"><h3 style="margin:0">${regionName}</h3></div>`);

    layer.on({
      mouseover: (e: any) => {
        e.target.setStyle({ weight: 4, color: '#333', fillOpacity: 0.95 });
      },
      mouseout: (e: any) => {
        e.target.setStyle(regionStyle(feature));
      },
      click: () => {
        onRegionClick(regionName);
      }
    });
  };

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer center={[35.0, -4.0]} zoom={7.5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>

        {/* Wikimedia Maps - نفس لون Positron النقي + بلا أسماء + بلا API Key نهائيا */}
        <TileLayer
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
        />

        <GeoJSON data={rifData as any} style={regionStyle} onEachFeature={onEachRegion} />

        {/* Legend مرفوعة 20px فقط */}
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar" style={{ background: 'rgba(255,255,255,0.95)', padding: '12px', margin: '10px', marginTop: '20px', borderRadius: '8px', boxShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>
            <h4 style={{margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold'}}>Rif Regions</h4>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '6px'}}>
              <span style={{background: '#FDD835', width: 18, height: 18, display: 'inline-block', marginRight: '8px', borderRadius: '3px'}}></span>
              <span style={{fontSize: '13px'}}>Western Rif</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '6px'}}>
              <span style={{background: '#1E88E5', width: 18, height: 18, display: 'inline-block', marginRight: '8px', borderRadius: '3px'}}></span>
              <span style={{fontSize: '13px'}}>Central Rif</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '6px'}}>
              <span style={{background: '#8E24AA', width: 18, height: 18, display: 'inline-block', marginRight: '8px', borderRadius: '3px'}}></span>
              <span style={{fontSize: '13px'}}>Eastern Rif</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{background: '#00897B', width: 18, height: 18, display: 'inline-block', marginRight: '8px', borderRadius: '3px'}}></span>
              <span style={{fontSize: '13px'}}>Beni Znassen</span>
            </div>
          </div>
        </div>
      </MapContainer>
    </div>
  );
};

export default RifMap;