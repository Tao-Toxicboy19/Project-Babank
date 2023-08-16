import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addfloating } from "../../../store/slices/locationSlice";
import api from "../../../api/api";
import { Link } from "react-router-dom";

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
        <div className="my-1 flex justify-end">
          <Link to={"/add-position"} className="btn btn-active btn-neutral">
            Neutral
          </Link>
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
              {floatingData &&
                floatingData.map((floating) => (
                  <tr key={floating.id}>
                    <td>{floating.id}</td>
                    <td>{floating.name}</td>
                    <td>{floating.description}</td>
                    <td>{floating.latitude}</td>
                    <td>{floating.longitude}</td>
                    <td>{floating.setuptime}</td>
                    <td>{floating.speed}</td>
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
