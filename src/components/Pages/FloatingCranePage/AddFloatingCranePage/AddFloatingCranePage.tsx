import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  useAddLocationMutation,
  useGetLocationSliceQuery,
} from "../../../../api";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "../../../../store/slices/locationSlice";

type Props = {};

export default function AddFloatingCranePage({}: Props) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.locationSlice
  );

  const { data: apiData } = useGetLocationSliceQuery();

  const [addLocation, { isLoading: isAdding, isError: addError }] =
    useAddLocationMutation();

  const [newLocation, setNewLocation] = useState({
    id: 0,
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    setuptime: "",
    speed: 0,
  });

  useEffect(() => {
    dispatch(fetchDataStart());

    if (apiData) {
      dispatch(fetchDataSuccess(apiData.result));
    } else {
      dispatch(fetchDataFailure("Error loading data."));
    }
  }, [apiData, dispatch]);

  const handleAddLocation = () => {
    addLocation(newLocation)
      .unwrap()
      .then(() => {
        // Handle success
        setNewLocation({
          id: 0,
          name: "",
          description: "",
          latitude: 0,
          longitude: 0,
          setuptime: "",
          speed: 0,
        });
      })
      .catch((error: unknown) => {
        // Handle error
        console.log(`ส้นตีน ${error}`);
      });
  };

  if (loading || isAdding) {
    return <div>Loading...</div>;
  }

  if (error || addError) {
    return <div>Error: {error || addError}</div>;
  }

  return (
    <div>
      <div>
        <h2>Add New Location</h2>
        <input
          type="text"
          value={newLocation.name}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
          placeholder="Name"
        />
        <input
          type="text"
          value={newLocation.description}
          onChange={(e) =>
            setNewLocation({ ...newLocation, description: e.target.value })
          }
          placeholder="Description"
        />
        {/* Add more input fields for other properties */}
        <button onClick={handleAddLocation}>Add Location</button>
      </div>
    </div>
  );
}
