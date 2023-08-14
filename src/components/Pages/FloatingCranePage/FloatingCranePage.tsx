import { useState, useEffect } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import AddFloatingCranePage from "../AddFloatingCranePage/AddFloatingCranePage";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function FloatingCranePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch data from API using Axios
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to fetch data only once

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
            {currentItems.map((post) => (
              <tr className="border-b border-[#000]" key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>112.6456454</td>
                <td>465.545145</td>
                <td>20</td>
                <td>20</td>
                <td>
                  <div className="flex items-center justify-center transition-transform hover:scale-125">
                    <MdModeEditOutline className="text-2xl text-[#4BC375] hover:text-blue-700 transition-colors duration-300" />
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center transition-transform hover:scale-125">
                    <BsFillTrashFill className="text-2xl text-[#000] hover:text-red-700 transition-colors duration-300" />
                  </div>
                </td>
              </tr>
            ))}
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
