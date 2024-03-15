import {GoogleMap, Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { Marker } from '@react-google-maps/api';
import { sulutionScheduelSelector } from "../../../store/slices/Solution/sollutionScheduleSlice"
import { SolutionCrane } from "../../../store/slices/Solution/ftsSolutionTableSlice";

type Props ={
    ftsSolutionReducer:SolutionCrane[]
    value:number
}

export default function RouteMaps({ ftsSolutionReducer, value }: Props) {
    const solutionscheduleReducer = useSelector(sulutionScheduelSelector)

    const datav2 = solutionscheduleReducer.result
        .filter((items) => items.FTS_name === ftsSolutionReducer[value]?.fts.FTS_name)
        .map((item) => ({
            lat: item.lat,
            lng: item.lng,
        }));
    const mapStyles: React.CSSProperties = {
        height: '50vh',
        width: '100%'
    };


    return (
        // <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={{ lat: 13.177009, lng: 100.840662 }}
            >
                {(datav2).map((item: any) => (
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
        // </LoadScript>
    );
}