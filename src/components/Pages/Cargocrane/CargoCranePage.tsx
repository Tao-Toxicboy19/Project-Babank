import { useState, useEffect } from "react";
import axios from "axios";
import { FTSCraneCargo } from "../../../types/CargoCrane.type";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import TreeTable from "./TreeTable copy/TreeTable";

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
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, []);

  return (
    <Card sx={{ minHeight: '90vh' }}>
      <CardContent>
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
      </CardContent>
    </Card >
  );
}