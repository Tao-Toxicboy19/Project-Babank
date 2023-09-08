import { useState } from "react";
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
import SearchIcon from '@mui/icons-material/Search';
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Floating } from "../../../types/FloatingCrane.type";
import React from "react";
import { columns } from "./ColumnDataFloating";
import ModalPopup from "./Insert/InsertPage";
import EditPage from "./Edit/Page";
import DeletePage from "./Delete/Page";

type Props = {};

export default function FloatingCranePage({ }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const floatingData = useSelector((state: RootState) => state.floating.floating);
  const loading = useSelector((state: RootState) => state.floating.loading)
  const error = useSelector((state: RootState) => state.floating.error)

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
    fl_id: floating.fl_id,
    floating_name: floating.floating_name,
    NumberOfCranes: floating.NumberOfCranes,
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
            align={
              column.dataKey === "floating_name" || column.dataKey === "NumberOfCranes"
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

  const rowContent = (_index: number, row: Floating) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={
            column.dataKey === "floating_name"
              ? "left"
              : column.numeric || false
                ? "right"
                : "left"
          }
          className={column.className}
        >
          {column.dataKey === "editColumn" ? (
            <Box className="flex justify-end item-center">
              <EditPage Id={row.fl_id} />
              <DeletePage Id={row.fl_id} />
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
      <Typography className="text-xl">ทุ่น</Typography>
      <Box className="flex justify-between m-5 ">
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
            data={convertedFloating}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      )}
    </Box>
  );
}
