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
import { useState } from "react";
import { carrier } from "../../../types/Carrier.type";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import React from "react";
import { columns } from "./ColumnDataCarrier";
import ModalPopup from "./AddCarrierPage/ModalPopup";

type Props = {};

export default function CarrierPage({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const carrier = useSelector((state: RootState) => state.carrier.carrier);

  // search
  const filteredData = carrier.filter((item) =>
    item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const VirtuosoTableComponents: TableComponents<carrier> = {
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

  const convertedFloating: carrier[] = filteredData.map((items) => ({
    carrier_id: items.carrier_id,
    carrier_name: items.carrier_name,
    maxcapacity: items.maxcapacity,
    ower: items.ower,
    burden: items.burden,
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

  const rowContent = (_index: number, row: carrier) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={
            column.dataKey === "carrier_name"
              ? "left"
              : column.numeric || false
              ? "right"
              : "left"
          }
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
      <Typography className="text-xl">Carrier Page</Typography>
      <Box className="flex justify-between my-3">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ModalPopup />
      </Box>
      <Paper sx={{ height: 600, width: "100%", marginTop: 3 }}>
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
