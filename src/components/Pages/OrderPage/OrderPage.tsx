import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { useEffect, useState } from "react";
import { Data, Order } from "../../../types/Order.type";
import api from "../../../api/api";
import { columns } from "./ColumnData";

export default function ReactVirtualizedTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api
      .get("/orders")
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const VirtuosoTableComponents: TableComponents<Data> = {
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

  const convertedOrders: Data[] = orders.map((order) => ({
    order_id: order.order_id,
    carrier_name: order.carrier_name,
    cargo_name: order.cargo_name,
    load_status: order.load_status,
    category: order.category,
    arrival_time: order.arrival_time,
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
              backgroundColor: "background.paper",
            }}
          >
            {column.label === "longitude" ? "Edit" : column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  const rowContent = (_index: number, row: Data) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {column.dataKey === "editColumn" ? (
            <button>Edit</button>
          ) : column.dataKey === "arrival_time" ||
            column.dataKey === "deadline_time" ? (
            new Date(row[column.dataKey]).toLocaleString()
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Paper sx={{ height: 600, width: "100%", marginTop: 3 }}>
      <TableVirtuoso
        data={convertedOrders}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
