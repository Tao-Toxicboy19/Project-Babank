import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
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
  Typography,
} from "@mui/material";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Floating } from "../../../types/FloatingCrane.type";
import React from "react";
import { columns } from "./ColumnDataFloating";
import ModalPopup from "./AddFloatingCranePage/ModalPopup";

type Props = {};

export default function FloatingCranePage({}: Props) {
  const floatingData = useSelector((state: RootState) => state.floating.data);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // search
  const filteredData = floatingData.filter((item) =>
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
    floating_id: floating.floating_id,
    floating_name: floating.floating_name,
    description: floating.description,
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
  const rowContent = (_index: number, row: Floating) => (
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
      <Typography className="text-xl">Floating Crane</Typography>
      <Box className="flex justify-between m-5">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ModalPopup />
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
