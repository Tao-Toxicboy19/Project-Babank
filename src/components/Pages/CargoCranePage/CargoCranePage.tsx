import { useEffect, useState } from "react";
import { CargoCrane } from "../../../types/CargoCrane.type";
import api from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setCargoCrane } from "../../../store/slices/cargocraneSlice";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
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
import { columns } from "./ColumnDataCargoCrane";

type Props = {};

export default function CargoCranePage({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const cargoCrane = useSelector(
    (state: RootState) => state.cargoCrane.cargoCrane
  );

  useEffect(() => {
    api.get("/cargocranes").then((res) => {
      console.log(res.data.cargocranes);
      dispatch(setCargoCrane(res.data.cargocranes));
    });
  }, []);

  // search
  const filteredData = cargoCrane.filter((item) =>
    item.floating_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const convertedCargo: CargoCrane[] = filteredData.map((CargoCrane) => ({
    floating_name: CargoCrane.floating_name,
    cargo_name: CargoCrane.cargo_name,
    consumption_rate: CargoCrane.consumption_rate,
    work_rate: CargoCrane.work_rate,
    category: CargoCrane.category,
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
  const rowContent = (_index: number, row: CargoCrane) => (
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
