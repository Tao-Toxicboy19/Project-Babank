import { useEffect } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import TreeTable from "./TreeTable/TreeTable";
import { useDispatch, useSelector } from "react-redux";
import { loadFTScraneCargo } from "../../../store/slices/FTSCraneCargo.slice";
import { RootState } from "../../../store/store";

type Props = {}

export default function CargoCranePage({ }: Props) {
  const dispatch = useDispatch<any>();
  const FTScraneCargoReducer = useSelector((state: RootState) => state.FTSCraneCargo);

  useEffect(() => {
    dispatch(loadFTScraneCargo())
  }, []);

  return (
    <Card sx={{ minHeight: '90vh' }}>
      <CardContent>
        {FTScraneCargoReducer.loading ? (
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
          <TreeTable FTScraneCargoReducer={(FTScraneCargoReducer.result)} />
        )}
      </CardContent>
    </Card >
  );
}