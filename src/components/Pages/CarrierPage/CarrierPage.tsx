import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {};

interface Carrier {
  // Define the structure of your Carrier object here
  id: number;
  name: string;
  // ... other properties
}

export default function CarrierPage({}: Props) {
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  useEffect(() => {
    // Fetch data from the API using axios when the component mounts
    axios
      .get("http://localhost:8080/api/getCarriers")
      .then((response) => {
        setCarriers(response.data.Carriers);
        console.log(response.data.Carriers);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div>
      <h1>CarrierPage</h1>
      <ul>
        {carriers.map((carrier) => (
          <li key={carrier.id}>{carrier.name}</li>
          // Render other carrier properties as needed
        ))}
      </ul>
    </div>
  );
}
