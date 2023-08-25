import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import api from "../../../api/api";
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
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import React from "react";
import { Cargo } from "../../../types/Cargo.type";
import { CargoCrane } from "../../../types/CargoCrane.type";
import { columns } from "./ColumnDataCargoCrane";
import { setCargoCrane } from "../../../store/slices/cargocraneSlice";
import ModalPopUp from "./AddCargoCranePage/ModalPopUp";

type Props = {};

export default function CargoCranePage({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const cargocrane = useSelector(
    (state: RootState) => state.cargoCrane.cargoCrane
  );

  useEffect(() => {
    api.get("/cargocranes").then((res) => {
      dispatch(setCargoCrane(res.data.cargocranes));
    });
  }, []);

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
  const convertedFloating: CargoCrane[] = cargocrane.map((items) => ({
    cargo_crane_id: items.cargo_crane_id,
    floating_id: items.floating_id,
    cargo_id: items.cargo_id,
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
            row[column.dataKey as keyof Cargo]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <h1>Cargo Crane Page</h1>
      <Box className="mx-5 flex justify-between">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ModalPopUp />
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
