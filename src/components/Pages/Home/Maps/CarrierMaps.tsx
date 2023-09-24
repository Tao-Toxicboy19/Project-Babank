import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';


export default function CarrierMaps() {
    const OrderReducer = useSelector((state: RootState) => state.order);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);

    const latitudes = OrderReducer.orders.map((order) => order.latitude);
    const longitudes = OrderReducer.orders.map((order) => order.longitude);

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
                    zoom={12}
                    center={{ lat: averageLat, lng: averageLng }}
                >
                    {OrderReducer.orders.map((item) => (
                        <Marker
                            key={`${item.latitude}-${item.longitude}`}
                            position={{ lat: item.latitude, lng: item.longitude }}
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
