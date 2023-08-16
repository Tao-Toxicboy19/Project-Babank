// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // ต้องการใช้ useParams ในการรับค่า id จาก URL
// import {
//   useGetLocationSliceQuery,
//   useUpdateLocationMutation,
// } from "../../../../api";

// type Props = {};

// export default function EditFloatingCranePage({}: Props) {
//   const { id } = useParams<{ id: any }>(); // รับค่า id จาก URL
//   const locationId = parseInt(id, 10);

//   const { data: locationData } = useGetLocationSliceQuery();

//   const [updateLocation, { isLoading, isError, isSuccess }] =
//     useUpdateLocationMutation();

//   const [updatedLocation, setUpdatedLocation] = useState({
//     id: locationId,
//     name: "",
//     description: "",
//     latitude: 0,
//     longitude: 0,
//     setuptime: "",
//     speed: 0,
//   });

//   useEffect(() => {
//     if (locationData) {
//       const location = locationData.find((loc) => loc.id === locationId);

//       if (location) {
//         setUpdatedLocation(location);
//       }
//     }
//   }, [locationData, locationId]);

//   const handleUpdateLocation = () => {
//     updateLocation({ id: locationId, updatedLocation })
//       .unwrap()
//       .then(() => {
//         alert("OK");
//       })
//       .catch((error: unknown | any) => {
//         alert(`${error} error`);
//       });
//   };

//   if (!updatedLocation) {
//     return <div>Loading...</div>;
//   }

//   if (isSuccess) {
//     return <div>Location updated successfully!</div>;
//   }

//   return (
//     <div>
//       <h2>Edit Floating Crane Location</h2>
//       <input
//         type="text"
//         value={updatedLocation.name}
//         onChange={(e) =>
//           setUpdatedLocation({ ...updatedLocation, name: e.target.value })
//         }
//         placeholder="Name"
//       />
//       <input
//         type="text"
//         value={updatedLocation.description}
//         onChange={(e) =>
//           setUpdatedLocation({
//             ...updatedLocation,
//             description: e.target.value,
//           })
//         }
//         placeholder="Description"
//       />
//       {/* Add more input fields for other properties */}
//       <button onClick={handleUpdateLocation}>Update Location</button>
//       {isLoading && <div>Loading...</div>}
//       {isError && <div>Error updating location.</div>}
//     </div>
//   );
// }
