import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Props = {};

interface Carrier {
  // Define the structure of your Carrier object here
  id: number;
  name: string;
  maxcapacity: number;
  power: string;
  burden: number;
  // ... other properties
}

export default function CarrierPage({}: Props) {
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  useEffect(() => {
    // Fetch data from the API using axios when the component mounts
    axios
      .get("http://localhost:7070/api/carriers")
      .then((response) => {
        setCarriers(response.data.Carriers);
        console.log(response.data.Carriers);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div>
      <h1>CarrierPage</h1>
      {carriers.map((carrier) => (
        <ul key={carrier.id}>
          <li>{carrier.id}</li>
          <li>{carrier.name}</li>
          <li>{carrier.maxcapacity}</li>
          <li>{carrier.power}</li>
          <li>{carrier.burden}</li>
          <li>
            <Link to={`/editcarrierpage/${carrier.id}`}>Edit</Link>
          </li>
        </ul>
      ))}
      <Link to={"/addcarrierpage"}>Add</Link>
    </div>
  );
}
