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
import { useState } from "react";
import { carrier } from "../../../types/Carrier.type";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import React from "react";
import { columns } from "./ColumnDataCarrier";
import SearchIcon from '@mui/icons-material/Search';
import Page from "./Insert/Page";
import EditPage from "./Edit/Page";
import DeletePage from "./Delete/Page";

type Props = {};

export default function CarrierPage({ }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const carrier = useSelector((state: RootState) => state.carrier.carrier);
  const loading = useSelector((state: RootState) => state.carrier.loading);
  const error = useSelector((state: RootState) => state.carrier.error);

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

  const convertedCarrier: carrier[] = filteredData.map((items) => ({
    cr_id: items.cr_id,
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
            align={
              column.dataKey === "carrier_name" || column.dataKey === "ower"
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

  const rowContent = (_index: number, row: carrier) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={
            column.dataKey === "carrier_name" || column.dataKey === "ower"
              ? "left"
              : column.numeric || false
                ? "right"
                : "left"
          }
        >
          {column.dataKey === "editColumn" ? (
            <Box className="flex justify-end item-center">
              <EditPage Id={row.cr_id} />
              <DeletePage Id={row.cr_id} />
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
      <Typography className="text-xl">Carrier Page</Typography>
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
        <Page />
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
            data={convertedCarrier}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      )}
    </Box>
  );
}
