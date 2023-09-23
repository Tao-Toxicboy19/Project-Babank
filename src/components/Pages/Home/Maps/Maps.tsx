import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

type Props = {}

export default function Maps({ }: Props) {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    return (
        <MapContainer style={{ height: '40vh' }} center={[13.185009, 100.813714]} zoom={14} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {(FTSReducer.FTS).map((items, index) => (
                <Marker key={index} position={[items.lat, items.lng]} >
                    <Popup>{items.FTS_name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}