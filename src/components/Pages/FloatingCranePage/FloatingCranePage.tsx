import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  addfloating,
  deleteFloating,
} from "../../../store/slices/locationSlice";
import api from "../../../api/api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

type Props = {};

export default function FloatingCranePage({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const floatingData = useSelector((state: RootState) => state.floating.data);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchFloatingBySearch = async () => {
      try {
        const res = await api.get(`searchCarrier/${searchValue}`);
        dispatch(addfloating(res.data.result));
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };

    fetchFloatingBySearch();
  }, [searchValue]);

  const handleDelete = (id: number) => {
    dispatch(deleteFloating(id));
    api
      .delete(`deleteLocation/${id}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <>
      <div className="p-3">
        <h1>FloatingCranePage</h1>
        <div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        <div className="my-3 flex justify-end">
          <Button variant="outlined">
            <Link to={"/add-position"}>Add Data</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#95a8b6]">
              <tr className="text-[#333]">
                <th>ID</th>
                <th className="w-1/12">Name</th>
                <th className="w-3/12">Description</th>
                <th className="w-2/12">Latitude</th>
                <th className="w-2/12">Longitude</th>
                <th className="w-2/12">Setup Time</th>
                <th className="w-1/12">Speed</th>
                <th className="flex justify-center">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-[#EBEBEB] text-[#000]">
              {floatingData &&
                floatingData.map((floating) => (
                  <tr
                    key={floating.id}
                    className="border-b-[1px] border-[#333]"
                  >
                    <td>
                      <span className="flex justify-end px-3">
                        {floating.id}
                      </span>
                    </td>
                    <td className="">
                      <span className="flex justify-start px-3">
                        {floating.name}
                      </span>
                    </td>
                    <td className="">
                      <span className="flex justify-start px-3">
                        {floating.description}
                      </span>
                    </td>
                    <td className="">
                      <span className="flex justify-end px-3">
                        {floating.latitude}
                      </span>
                    </td>
                    <td className="">
                      <span className="flex justify-end px-3">
                        {floating.longitude}
                      </span>
                    </td>
                    <td className="">
                      <span className="flex justify-center px-3">
                        {floating.setuptime}
                      </span>
                    </td>
                    <td className="">
                      <span className="flex justify-end px-3">
                        {floating.speed}
                      </span>
                    </td>
                    <td className="flex justify-center gap-x-5 px-3">
                      <Link
                        to={`/update-position/${floating.id}`}
                        className="flex items-center transition-transform hover:scale-110"
                      >
                        <MdModeEditOutline className="text-2xl text-[#4BC375] hover:text-blue-700 transition-colors duration-300" />
                      </Link>
                      <div
                        className="flex items-center transition-transform hover:scale-110"
                        onClick={() => handleDelete(floating.id)}
                      >
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
