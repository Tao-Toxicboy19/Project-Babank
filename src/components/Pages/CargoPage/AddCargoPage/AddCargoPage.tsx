import { useState } from "react";
import api from "../../../../api/api";
import { useDispatch } from "react-redux";
import { addCargo } from "../../../../store/slices/cargoSlice";
import { Cargo } from "../../../../types/Cargo.type";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function AddCargoPage({}: Props) {
  const naviage = useNavigate();
  const dispatch = useDispatch();
  const [cargo, setCargo] = useState<Cargo>({
    cargo_id: "",
    cargo_name: "",
    consumption_rate: 0,
    work_rate: 0,
    category: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCargo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.post("/cargo", cargo);
      naviage("/cargo");
      dispatch(addCargo(cargo));
    } catch (error) {
      console.log(`แม่ง ${error}`);
    }
  };

  return (
    <div>
      <h1>AddCargoPage</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="cargo_name"
            value={cargo.cargo_name}
            onChange={handleInputChange}
          />
        </div>{" "}
        <div>
          <label>consumption_rate</label>
          <input
            type="text"
            name="consumption_rate"
            value={cargo.consumption_rate}
            onChange={handleInputChange}
          />
        </div>{" "}
        <div>
          <label>work_rate</label>
          <input
            type="text"
            name="work_rate"
            value={cargo.work_rate}
            onChange={handleInputChange}
          />
        </div>{" "}
        <div>
          <label>category</label>
          <input
            type="text"
            name="category"
            value={cargo.category}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
