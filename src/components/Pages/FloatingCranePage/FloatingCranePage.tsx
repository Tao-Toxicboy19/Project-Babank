import { useContext, useEffect } from "react";
import axios from "axios";
import { TodoContext } from "../../../App";
import { Floating } from "../../../types/FloatingCrane.type";
import AddFloatingCranePage from "./AddFloatingCranePage/AddFloatingCranePage";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

type Props = {};

export default function FloatingCranePage({}: Props) {
  const { floating, setFloating } = useContext(TodoContext);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:8080/api/getLocations")
      .then((response) => {
        setFloating(response.data.floatingcrane);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
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
                <th className="flex justify-center">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-[#EBEBEB] text-[#000]">
              {floating.map((todo: Floating) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.name}</td>
                  <td>{todo.description}</td>
                  <td>{todo.latitude}</td>
                  <td>{todo.longitude}</td>
                  <td>{todo.setuptime}</td>
                  <td>{todo.speed}</td>
                  <td className="flex justify-center gap-x-10">
                    <div className="flex items-center transition-transform hover:scale-125">
                      <MdModeEditOutline className="text-2xl text-[#4BC375] hover:text-blue-700 transition-colors duration-300" />
                    </div>
                    <div className="flex items-center transition-transform hover:scale-125">
                      <BsFillTrashFill className="text-2xl text-[#000] hover:text-red-700 transition-colors duration-300" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
