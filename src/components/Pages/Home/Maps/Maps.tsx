import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';


export default function Maps() {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [infoWindowPosition, setInfoWindowPosition] = useState<{ lat: number; lng: number } | null>(null);
    const mapStyles: React.CSSProperties = {
        height: '40vh',
        width: '100%'
    };

    const toggleInfoWindow = () => {
        setShowInfoWindow(!showInfoWindow);
    };

    const handleMarkerClick = (item: { lat: number; lng: number }) => {
        setInfoWindowPosition(item);
        setShowInfoWindow(true);
    };

    return (
        <div className="App">
            <h1>React Google Map ตัวอย่าง</h1>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={14}
                    center={{ lat: 13.186509, lng: 100.813714 }}
                >
                    {FTSReducer.FTS.map((item) => (
                        <React.Fragment key={`${item.lat}-${item.lng}`}>
                            <Marker
                                position={{ lat: item.lat, lng: item.lng }}
                                onClick={() => handleMarkerClick(item)}
                            />
                            {showInfoWindow && infoWindowPosition && (
                                <InfoWindow position={infoWindowPosition} onCloseClick={toggleInfoWindow}>
                                    <div>
                                        <p>{item.FTS_name}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </React.Fragment>
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}