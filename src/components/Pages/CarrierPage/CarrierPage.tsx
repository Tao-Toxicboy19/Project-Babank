import { useEffect, useState } from "react";
import axios from "axios";

export interface carrier {
  id: number;
  name: string;
  maxcapacity: number;
  power: string;
  burden: number;
}

const CarrierPage = () => {
  const [carriers, setCarriers] = useState([]);

  useEffect(() => {
    async function fetchCarriers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getCarriers"
        );
        setCarriers(response.data.Carriers);
      } catch (error) {
        console.error("Error fetching carriers:", error);
      }
    }

    fetchCarriers();
  }, []);

  return (
    <div>
      <h1>Carrier Page</h1>
      {carriers.map((carrier: carrier) => (
        <ul key={carrier.id}>
          <li>{carrier.id}</li>
          <li>{carrier.maxcapacity}</li>
          <li>{carrier.power}</li>
          <li>{carrier.burden}</li>
        </ul>
      ))}
    </div>
  );
};

export default CarrierPage;
