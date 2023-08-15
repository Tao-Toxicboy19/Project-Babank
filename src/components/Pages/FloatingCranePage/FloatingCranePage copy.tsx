import { useState, useEffect } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import AddFloatingCranePage from "./AddFloatingCranePage/AddFloatingCranePage";
import DeleteFloatingCranePage from "./DeleteFloatingCranePage/DeleteFloatingCranePage";

type Location = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  setuptime: string;
  speed: number;
};

export default function FloatingCranePage() {
  const [posts, setPosts] = useState<Location[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const [locationsArray, setLocationsArray] = useState<Location[]>([]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteLocation/${id}`);
      console.log(`Item with ID ${id} deleted successfully`);
      // อัพเดตข้อมูลหลังจากการลบ
      const updatedLocations = locationsArray.filter(
        (location) => location.id !== id
      );
      setLocationsArray(updatedLocations);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getLocations"
        );
        setLocationsArray(response.data.floatingcrane);
        // console.log(response.data.floatingcrane);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3">
      <AddFloatingCranePage />
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#95a8b6]">
            <tr className="text-[#333]">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Setup Time</th>
              <th>Speed</th>
              <th>Edit</th>
              <th>Detele</th>
            </tr>
          </thead>
          <tbody className="bg-[#EBEBEB] text-[#000]">
            {locationsArray.length > 0 ? (
              locationsArray.map((location) => (
                <tr className="border-b border-[#000]" key={location.id}>
                  <td>{location.id}</td>
                  <td>{location.name}</td>
                  <td>{location.description}</td>
                  <td>{location.latitude}</td>
                  <td>{location.longitude}</td>
                  <td>{location.setuptime}</td>
                  <td>{location.speed}</td>
                  <td>
                    <div className="flex items-center justify-center transition-transform hover:scale-125">
                      <MdModeEditOutline className="text-2xl text-[#4BC375] hover:text-blue-700 transition-colors duration-300" />
                    </div>
                  </td>
                  <td>
                    {/* <DeleteFloatingCranePage id={location.id} /> */}
                    <DeleteFloatingCranePage
                      id={location.id}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination buttons */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn mx-2 ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
