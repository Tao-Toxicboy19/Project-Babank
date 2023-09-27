import { LoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

export default function Maps({ selectedValue }: any) {
    const SolutionscheduleReducer = useSelector((state: RootState) => state.Solutionschedule);

    const datav2 = SolutionscheduleReducer.solution_schedule
        .filter((items) => items.FTS_name === selectedValue)
        .map((item) => ({
            lat: item.lat,
            lng: item.lng,
        }));

    const mapStyles: React.CSSProperties = {
        height: '40vh',
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
