import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';


export default function FTSMaps() {
    const FTSReducer = useSelector((state: RootState) => state.FTS);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);

    const latitudes = FTSReducer.FTS.map((item) => item.lat);
    const longitudes = FTSReducer.FTS.map((item) => item.lng);

    const averageLat = latitudes.reduce((sum, current) => sum + current, 0) / latitudes.length;
    const averageLng = longitudes.reduce((sum, current) => sum + current, 0) / longitudes.length;

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
                    zoom={14}
                    center={{ lat: averageLat, lng: averageLng }}
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
