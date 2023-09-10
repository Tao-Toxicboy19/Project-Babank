import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
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
import { Carrier } from "../../../types/Carrier.type";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import React from "react";
import { columns } from "./ColumnDataCarrier";
import SearchIcon from '@mui/icons-material/Search';
import CarrierEditPage from "./Edit/CarrierEditPage";
import CarrierInsertPage from "./Insert/CarrierInsertPage";
import CarrierDeletePage from "./Delete/CarrierDeletePage";

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

  const VirtuosoTableComponents: TableComponents<Carrier> = {
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

  const convertedCarrier: Carrier[] = filteredData.map((items) => ({
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

  const rowContent = (_index: number, row: Carrier) => (
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
            <Stack direction='row' spacing={1} className="flex justify-end">
              <CarrierEditPage id={row.cr_id} result={row} />
              <CarrierDeletePage id={row.cr_id} result={row.carrier_name} />
            </Stack>
          ) : (
            row[column.dataKey]
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
            <Typography className="text-2xl font-bold flex justify-center">เรือสินค้า</Typography>
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
          <CarrierInsertPage />
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
