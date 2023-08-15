import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetfetchFloating,
  selectFloating,
} from "../../../store/slices/GetFloatingCraneSlice";
import { AppDispatch } from "../../../store/store";
import { Floating } from "../../../types/FloatingCrane.type";
import AddFloatingCranePage from "./AddFloatingCranePage/AddFloatingCranePage";

export default function FloatingCranePage() {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(selectFloating);

  useEffect(() => {
    dispatch(GetfetchFloating());
  }, [dispatch]);

  return (
    <div>
      <h1>Floating Crane Locations</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Setup Time</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location: Floating) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.description}</td>
              <td>{location.latitude}</td>
              <td>{location.longitude}</td>
              <td>{location.setuptime}</td>
              <td>{location.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <AddFloatingCranePage />
      <hr />
    </div>
  );
}
