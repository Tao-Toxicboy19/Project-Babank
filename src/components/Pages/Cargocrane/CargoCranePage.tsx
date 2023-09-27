import { useEffect } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import TreeTable from "./TreeTable/TreeTable";
import { useDispatch, useSelector } from "react-redux";
import { loadFTScraneCargo } from "../../../store/slices/FTSCraneCargo.slice";
import { RootState } from "../../../store/store";
import Loading from "../../layout/Loading/Loading";

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
          <Loading />
        ) : (
          <TreeTable FTScraneCargoReducer={(FTScraneCargoReducer.result)} />
        )}
      </CardContent>
    </Card >
  );
}