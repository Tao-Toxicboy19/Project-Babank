import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function HomePage({}: Props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.username);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="w-full h-20"></div>
      <h1>Welcome {name}</h1>
    </div>
  );
}
