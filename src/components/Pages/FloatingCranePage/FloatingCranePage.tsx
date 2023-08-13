import { useState, useEffect } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import TextField from "@mui/material/TextField";

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
      <div className="w-full h-[4.5rem]"></div>
      <div className="flex justify-end">
        <button
          className="btn btn-outline border-2 mb-3 "
          onClick={() => (window as any).my_modal_1.showModal()}
        >
          Add Data
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add Data</h3>
          <p className="py-4">
            <div className="grid grid-cols-3 gap-x-3 gap-y-4">
              <TextField id="outlined-basic" label="Name" variant="outlined" />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Latitude"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Longitude"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Setup Time"
                variant="outlined"
              />
              <TextField id="outlined-basic" label="Speed" variant="outlined" />
            </div>
          </p>
          <div className="modal-action">
            <button type="submit" className="btn">
              Submit
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (window as any).my_modal_1.close()}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#d4d4d4]">
            <tr className="">
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
