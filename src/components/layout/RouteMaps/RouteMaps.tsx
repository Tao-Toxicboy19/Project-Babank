import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Marker } from '@react-google-maps/api';

// const google = window.google;

// const blueMarkerIcon = {
//     url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//     scaledSize: new google.maps.Size(40, 40), // Adjust the size as needed
// };


export default function RouteMaps({ FTSsolutionSlice, value }: any) {
    const SolutionscheduleReducer = useSelector((state: RootState) => state.Solutionschedule);


    const datav2 = SolutionscheduleReducer.solution_schedule
        .filter((items) => items.FTS_name === FTSsolutionSlice[value]?.FTS_name)
        .map((item) => ({
            lat: item.lat,
            lng: item.lng,
        }));

    const mapStyles: React.CSSProperties = {
        height: '50vh',
        width: '100%'
    };


    return (
        <div className="App">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={{ lat: 13.177009, lng: 100.840662 }}
                >
                    {(datav2).map((item) => (
                        <Marker
                            key={`${item.lat}-${item.lng}`}
                            position={{ lat: item.lat, lng: item.lng }}
                        // icon={index === 0 ? blueMarkerIcon : undefined}
                        />
                    ))}
                    <Polyline
                        path={datav2}
                        options={{
                            strokeColor: '#FF0000', // สีของเส้น Polyline
                            strokeOpacity: 1.0, // ความโปร่งใสของเส้น Polyline
                            strokeWeight: 2, // ความหนาของเส้น Polyline
                        }}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}