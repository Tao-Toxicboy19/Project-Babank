import { useState } from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Order } from "../../../types/Order.type";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { Box, Card, CardContent, CircularProgress, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { columns } from "./ColumnDataOrder";
import SearchIcon from '@mui/icons-material/Search';
import OrderInsertPage from "./Insert/OrderInsertPage";
import OrderEditPage from "./Edit/OrderEditPage";
import OrderDeletePage from "./Delete/OrderDeletePage";

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const orders = useSelector((state: RootState) => state.order.orders);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  // search
  const filteredData = orders.filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const convertedCargoCrane: Order[] | any = filteredData.map((items) => ({
    or_id: items.or_id,
    carrier_name: items.carrier_name,
    cr_id: items.cr_id,
    cargo_name: items.cargo_name,
    ca_id: items.ca_id,
    load_status: items.load_status,
    category: items.category,
    arrival_time: items.arrival_time,
    deadline_time: items.deadline_time,
    latitude: items.latitude,
    longitude: items.longitude,
    bulks: items.bulks,
    maxFTS: items.maxFTS,
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

  const rowContent = (_index: number, row: Order) => (
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
            <Stack direction='row' spacing={1} className="flex justify-end">
              <OrderEditPage id={row.or_id} result={row} />
              <OrderDeletePage id={row.or_id} result={row.carrier_name} />
            </Stack>
          ) : (
            row[column.dataKey as keyof Order]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <Card sx={{ marginY: 1 }}>
        <CardContent className="flex justify-between">
          <Stack direction='row' spacing={3}>
            <Typography className="text-2xl font-bold flex justify-center">รายการโอนสินค้า</Typography>
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
          </Stack>
          <OrderInsertPage />
        </CardContent>
      </Card>
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
        <Paper sx={{ height: 600, width: "100%", marginBottom: 5 }}>
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