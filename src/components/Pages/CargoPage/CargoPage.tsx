import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import api from "../../../api/api";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import React from "react";
import { Cargo } from "../../../types/Cargo.type";
import { columns } from "./ColumnDataCargo";
import { setCargo } from "../../../store/slices/cargoSlice";
import { Link } from "react-router-dom";

type Props = {};

export default function CargoPage({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   api.get("/cargos").then((res) => dispatch(setCargo(res.data.cargo)));
  // }, []);

  // search
  const filteredData = cargo.filter((item) =>
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

  const convertedFloating: Cargo[] = filteredData.map((Cargo) => ({
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
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
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
          align={column.numeric || false ? "right" : "left"}
        >
          {column.dataKey === "editColumn" ? (
            <button>Edit</button>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <h1>Cargo Page</h1>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          component={Link}
          to={"/cargo/add-crago"}
          sx={{ mt: 1, mx: 5, textTransform: "none" }}
          variant="outlined"
        >
          เพิ่ม Cargo
        </Button>
      </Box>
      <Paper sx={{ height: 600, width: "100%", marginTop: 1 }}>
        <TableVirtuoso
          data={convertedFloating}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
}
