// import 'leaflet/dist/leaflet.css';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import L, { LatLngExpression } from 'leaflet';
// import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store/store';

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// type Props = {}

// function getMarkerIcon() {
//   const icon = new L.Icon({
//     iconSize: [32, 37], // size of the icon
//     iconAnchor: [16, 37],
//     iconUrl: "leaflet/dist/images/marker-icon.png",
//   });
//   return icon;
// }

// export default function MapContainerPage({ }: Props) {
//   const [position, setpoSition] = useState<LatLngExpression | null>(null);
//   const floatingReducer = useSelector((state: RootState) => state.floating);

//   const LocationMarker = () => {
//     const map = useMapEvents({
//       click(e) {
//         // alert(e.latlng)
//         map.flyTo(e.latlng, 16)
//         setpoSition(e.latlng)
//       }
//     })

//     return position === null ? null : (
//       <Marker position={position}>
//         <Popup>
//           Hello
//         </Popup>
//       </Marker>
//     )
//   }


//   return (
//     <>
//       <MapContainer center={[13.181336, 100.813713]} zoom={14} style={{ height: '60vh', borderRadius: 3 }}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {(floatingReducer.floating).map((items, index) => (
//           <Marker key={index} position={[items.latitude, items.longitude]} icon={getMarkerIcon()}>
//             <Popup>{items.floating_name}</Popup>
//           </Marker>
//         ))}
//         <Polyline positions={[[13.18981747, 100.8146087], [13.187502, 100.810662]]} />
//       </MapContainer>
//     </>
//   )
// }