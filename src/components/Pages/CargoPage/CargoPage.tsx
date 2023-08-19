import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setCargo } from "../../../store/slices/cargoSlice";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { Cargo } from "../../../types/Cargo.type";
import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { columns } from "./ColumnDataCargo";

type Props = {};

export default function CargoPage({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const cargo = useSelector((state: RootState) => state.cargo.cargo);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/cargos")
      .then((res) => {
        dispatch(setCargo(res.data.cargo));
      })
      .catch((err) => console.log(err));
  }, []);

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

  const convertedCargo: Cargo[] = filteredData.map((cargo) => ({
    cargo_id: cargo.cargo_id,
    cargo_name: cargo.cargo_name,
    consumption_rete: cargo.consumption_rete,
    work_rate: cargo.work_rate,
    category: cargo.category,
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
          ) : column.dataKey === "work_rate" ||
            column.dataKey === "category" ? (
            new Date(row[column.dataKey]).toLocaleString()
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Paper sx={{ height: 600, width: "100%", marginTop: 3 }}>
        <TableVirtuoso
          data={convertedCargo}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
}
