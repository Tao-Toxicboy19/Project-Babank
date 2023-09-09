import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Floating } from "../../../types/FloatingCrane.type";
import React from "react";
import { columns } from "./ColumnDataFloating";
import ModalPopup from "./Insert/FloatingInsertPage";
import FloatingEditPage from "./Edit/FloatingEditPage";
import DeleteFloatingPage from "./Delete/DeleteFloatingPage";

type Props = {};

export default function FloatingCranePage({ }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const floatingReducer = useSelector((state: RootState) => state.floating);

  // search
  const filteredData = (floatingReducer.floating).filter((item) =>
    item.floating_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const VirtuosoTableComponents: TableComponents<Floating> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const convertedFloating: Floating[] = filteredData.map((floating) => ({
    fl_id: floating.fl_id,
    floating_name: floating.floating_name,
    NumberOfCranes: floating.NumberOfCranes,
    latitude: floating.latitude,
    longitude: floating.longitude,
    setuptime: floating.setuptime,
    speed: floating.speed,
  }));

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={
              column.dataKey === "floating_name" || column.dataKey === "NumberOfCranes"
                ? "center"
                : column.numeric || false
                  ? "right"
                  : "left"
            }
            style={{ width: column.width }}
            sx={{
              width: column.width,
              fontSize: "17px", // เพิ่มขนาด font label
              fontWeight: "normal",
              backgroundColor: "background.paper",
              borderBottom: 1
            }}
          >
            {column.label === "longitude" ? "Edit" : column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  const rowContent = (_index: number, row: Floating) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={
            column.dataKey === "floating_name"
              ? "left"
              : column.numeric || false
                ? "right"
                : "left"
          }
          className={column.className}

        >
          {column.dataKey === "editColumn" ? (
            <Stack direction='row' spacing={1} className="flex justify-end">
              <FloatingEditPage id={row.fl_id} result={row} />
              <DeleteFloatingPage id={row.fl_id} result={row.floating_name} />
            </Stack>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <Card sx={{ marginY: 1 }}>
        <CardContent className="flex justify-between">
          <Stack direction='row' spacing={3}>
            <Typography className="text-2xl font-bold flex justify-center">ทุ่น</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    Search
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <ModalPopup />
        </CardContent>
      </Card>
      {
        floatingReducer.loading ? (
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
        ) : floatingReducer.error ? (
          <Typography>Error: {floatingReducer.error}</Typography>
        ) : (
          <Paper sx={{ height: 600, width: "100%", marginBottom: 5 }}>
            <TableVirtuoso
              data={convertedFloating}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        )
      }
    </Box >
  );
}
