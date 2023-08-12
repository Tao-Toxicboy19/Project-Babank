import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

interface Data {
  name: string;
  desc: string;
  lat: number;
  lng: number;
  setTime: number;
  speed: number;
}

export default function FloatingCranePage() {
  const initialData: Data = {
    name: "",
    desc: "",
    lat: 0,
    lng: 0,
    setTime: 0,
    speed: 0,
  };

  const [data, setData] = useState<Data>(initialData);
  const [submittedData, setSubmittedData] = useState<Data[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedData((prevData) => [...prevData, data]);
    setData(initialData);
    (window as any).my_modal_1.close();
  };

  return (
    <div className="bg-red- border-solid border-[1px] p-3">
      <button
        className="btn"
        onClick={() => (window as any).my_modal_1.showModal()}
      >
        Open Modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <form onSubmit={handleSubmit} className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="desc"
              value={data.desc}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="lat"
              value={data.lat}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="lng"
              value={data.lng}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="setTime"
              value={data.setTime}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="speed"
              value={data.speed}
              onChange={handleInputChange}
            />
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
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Setup Time</th>
              <th>Speed</th>
              <th className="flex justify-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((entry, index) => (
              <tr key={index}>
                <th>Id</th>
                <td>{entry.name}</td>
                <td>{entry.desc}</td>
                <td>{entry.lat}</td>
                <td>{entry.lng}</td>
                <td>{entry.setTime}</td>
                <td>{entry.speed}</td>
                <td className="flex justify-center gap-x-10">
                  <div className="flex justify-center gap-x-5 transition-transform hover:scale-125">
                    <MdModeEditOutline className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <div className="flex justify-center gap-x-5 transition-transform hover:scale-125">
                    <BsFillTrashFill className="text-2xl text-red-500 hover:text-red-700 transition-colors duration-300" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
