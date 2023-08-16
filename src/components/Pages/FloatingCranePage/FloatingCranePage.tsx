import { useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { Floating } from "../../../types/FloatingCrane.type";
import AddFloatingCranePage from "./AddFloatingCranePage/AddFloatingCranePage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useGetLocationSliceQuery } from "../../../api";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "../../../store/slices/locationSlice";
import { Link } from "react-router-dom";

type Props = {};

export default function FloatingCranePage({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.locationSlice
  );

  const { data: apiData } = useGetLocationSliceQuery(); // ใช้ hook จาก createApi

  useEffect(() => {
    dispatch(fetchDataStart());

    if (apiData) {
      dispatch(fetchDataSuccess(apiData.result)); // ใช้ apiData.result เพื่อเข้าถึงอาร์เรย์ของสถานที่
    } else {
      dispatch(fetchDataFailure("Error loading data."));
    }
  }, [apiData, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-3">
        <div className="mb-3 flex justify-end">
          <Link to={"/add-position"} className="btn btn-active btn-neutral">Neutral</Link>
        </div>
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
              {data.map((items: Floating) => (
                <tr key={items.id}>
                  <td>{items.id}</td>
                  <td>{items.name}</td>
                  <td>{items.description}</td>
                  <td>{items.latitude}</td>
                  <td>{items.longitude}</td>
                  <td>{items.setuptime}</td>
                  <td>{items.speed}</td>
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
