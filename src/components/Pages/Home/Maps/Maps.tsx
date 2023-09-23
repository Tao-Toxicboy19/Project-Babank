import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';


export default function Maps() {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const mapStyles: React.CSSProperties = {
        height: '40vh',
        width: '100%'
    };

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    return (
        <div className="App">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={15}
                    center={{ lat: 13.184509, lng: 100.813714 }}
                >
                    {FTSReducer.FTS.map((item) => (
                        <Marker
                            key={`${item.lat}-${item.lng}`}
                            position={{ lat: item.lat, lng: item.lng }}
                            onClick={() => handleMarkerClick(item)}
                        />
                    ))}
                    {selectedMarker && (
                        <InfoWindow
                            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                            onCloseClick={() => setSelectedMarker(null)}
                        >
                            <div>
                                <h2>{selectedMarker.FTS_name}</h2>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
