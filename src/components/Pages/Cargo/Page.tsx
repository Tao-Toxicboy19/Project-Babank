import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
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
import { Cargo } from "../../../types/Cargo.type";
import { columns } from "./ColumnDataCargo";
import ModalPopup from "./Insert/Page";
import SearchIcon from '@mui/icons-material/Search';
import DeletePage from "./Delete/Page";
import CircularProgress from '@mui/material/CircularProgress';
import EditPageV2 from "./Edit/Page";

type Props = {};

export default function CargoPage({ }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const setCargo = useSelector((state: RootState) => state.cargo.cargo);
  const loading = useSelector((state: RootState) => state.cargo.loading);
  const error = useSelector((state: RootState) => state.cargo.error);

  // search
  const filteredData = setCargo.filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const VirtuosoTableComponents: TableComponents<Cargo> = {
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

  const convertedCargo: Cargo[] = filteredData.map((Cargo) => ({
    cargo_id: Cargo.cargo_id,
    cargo_name: Cargo.cargo_name,
    consumption_rate: Cargo.consumption_rate,
    work_rate: Cargo.work_rate,
    category: Cargo.category,
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

  const rowContent = (_index: number, row: Cargo) => (
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
              <EditPageV2 Id={row.cargo_id} />
              <DeletePage Id={row.cargo_id} />
            </Box>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography className="text-xl">Cargo</Typography>
      <Box className="flex justify-between m-5">
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
        <ModalPopup />
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
            data={convertedCargo}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      )}
    </Box>
  );
}
