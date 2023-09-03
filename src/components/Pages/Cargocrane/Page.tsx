import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
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
import PageInsert from "./Insert/Page";
import EditPage from "./Edit/Page";
import DeletePage from "./Delete/Page";

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

  const convertedCargoCrane: CargoCrane[] | any = filteredData.map((items) => ({
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
              ? "center"
              : column.numeric || false
                ? "right"
                : "left"
          }
        >
          {column.dataKey === "editColumn" ? (
            <Box className="flex justify-end item-center">
              <EditPage Id={row.cc_id} />
              <DeletePage Id={row.cc_id} />
            </Box>
          ) : (
            row[column.dataKey as keyof CargoCrane]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );


  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography className="text-xl">Cargo crane</Typography>
      <Box className="m-5 flex justify-between">
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
        <PageInsert />
      </Box>
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
        <Paper sx={{ height: 600, width: "100%", marginTop: 3, marginBottom: 5 }}>
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
