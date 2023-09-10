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
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import React from "react";
import { columns } from "./ColumnDataCargoCrane";
import SearchIcon from '@mui/icons-material/Search';
import { CargoCrane } from "../../../types/CargoCrane.type";
import CargoCraneInsertPage from "./Insert/CargoCraneInsertPage";
import CargoCraneEditPage from "./Edit/CargoCraneEditPage";
import CargoCraneDeletePage from "./Delete/CargoCraneDeletePage";

type Props = {};

export default function CargoCranePage({ }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const loading = useSelector((state: RootState) => state.cargoCrane.loading);
  const error = useSelector((state: RootState) => state.cargoCrane.error);
  const cargocrane = useSelector(
    (state: RootState) => state.cargoCrane.cargoCrane
  );

  // search
  const filteredData = cargocrane.filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const VirtuosoTableComponents: TableComponents<CargoCrane> = {
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

  const convertedCargoCrane: CargoCrane[] = filteredData.map((items) => ({
    cc_id: items.cc_id,
    fl_id: items.fl_id,
    ca_id: items.ca_id,
    crane: items.crane,
    cargo_name: items.cargo_name,
    floating_name: items.floating_name,
    consumption_rate: items.consumption_rate,
    work_rate: items.work_rate,
    category: items.category,
  }));

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={
              column.dataKey === "cargo_name"
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

  const rowContent = (_index: number, row: CargoCrane) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={
            column.dataKey === "cargo_name"
              ? "left"
              : column.numeric || false
                ? "right"
                : "left"
          }
        >
          {column.dataKey === "editColumn" ? (
            <Stack direction='row' spacing={1} className="flex justify-end">
              <CargoCraneEditPage id={row.cc_id} result={row} />
              <CargoCraneDeletePage id={row.cc_id} result={row.cargo_name} />
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
            <Typography className="text-2xl font-bold flex justify-center">เรือสินค้า</Typography>
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
          <CargoCraneInsertPage />
        </CardContent>
      </Card>
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
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <Paper sx={{ height: 600, width: "100%", marginBottom: 5 }}>
          <TableVirtuoso
            data={convertedCargoCrane}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      )}
    </Box>
  );
}
