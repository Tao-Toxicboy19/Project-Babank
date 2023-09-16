import { useState, useEffect } from "react";
import TreeTable from "./TreeTable/TreeTable";
import axios from "axios";
import { FTSCraneCargo } from "../../../types/CargoCrane.type";
import { Box, CircularProgress } from "@mui/material";

type Props = {}

export default function CargoCranePage({ }: Props) {
  const [data, setData] = useState<FTSCraneCargo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get('http://crane.otpzlab.com:7070/api/cargocrane')
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, []);

  return (
    <div>
      {/* ตรวจสอบสถานะการโหลด */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TreeTable data={data} />
      )}
    </div>
  );
}