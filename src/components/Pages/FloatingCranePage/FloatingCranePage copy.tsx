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

      <div className="grid grid-cols-7">
        <label className="flex justify-start my-3">Name</label>
        <label className="flex justify-start my-3">Description</label>
        <label className="flex justify-start my-3">Lat</label>
        <label className="flex justify-start my-3">Lng</label>
        <label className="flex justify-start my-3">Setup Time</label>
        <label className="flex justify-start my-3">Speed</label>
        <label className="flex justify-center my-3">Edit</label>
      </div>
      {submittedData.map((entry, index) => (
        <div key={index} className="grid grid-cols-7">
          <div>
            <div className="">
              <span>{entry.name}</span>
            </div>
          </div>
          <div className="w-full">
            <div className="">
              <span>{entry.desc}</span>
            </div>
          </div>
          <div>
            <div className="">
              <span>{entry.lat}</span>
            </div>
          </div>
          <div>
            <div className="">
              <span>{entry.lng}</span>
            </div>
          </div>
          <div>
            <div className="">
              <span>{entry.setTime}</span>
            </div>
          </div>
          <div>
            <div className="">
              <span>{entry.speed}</span>
            </div>
          </div>
          <div className="flex justify-center gap-x-10">
            <div className="flex justify-center gap-x-5 transition-transform hover:scale-125">
              <MdModeEditOutline className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-300" />
            </div>
            <div className="flex justify-center gap-x-5 transition-transform hover:scale-125">
              <BsFillTrashFill className="text-2xl text-red-500 hover:text-red-700 transition-colors duration-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
