import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { useState } from "react";
import { Order } from "../../../types/Order.type";
import { columns } from "./ColumnDataOrder";
import { Box, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ModalPopup from "./Insert/Page";
import SearchIcon from '@mui/icons-material/Search';

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const orders = useSelector((state: RootState) => state.order.orders);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  // search
  const filteredData = orders.filter((item) =>
    item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const VirtuosoTableComponents: TableComponents<Order> = {
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

  const convertedOrders: Order[] = filteredData.map((order) => ({
    order_id: order.order_id,
    carrier_name: order.carrier_name,
    carrier_id: order.carrier_id,
    cargo_name: order.cargo_name,
    cargo_id: order.cargo_id,
    load_status: order.load_status,
    category: order.category,
    arrival_date: order.arrival_date,
    arrival_time: order.arrival_time,
    deadline_date: order.deadline_date,
    deadline_time: order.deadline_time,
    latitude: order.latitude,
    longitude: order.longitude,
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

  const rowContent = (_index: number, row: Order) => (
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
          {column.dataKey === "arrival_time" ? (
            `${row.arrival_date} ${row.arrival_time}`
          ) : column.dataKey === "deadline_time" ? (
            `${row.deadline_date} ${row.deadline_time}`
          ) : column.dataKey === "editColumn" ? (
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
      <Typography className="text-xl">Order</Typography>
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
            data={convertedOrders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      )}
    </Box>
  );
}
