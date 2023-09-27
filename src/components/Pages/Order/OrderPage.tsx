import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { Box, Button, CircularProgress, InputAdornment, Stack, TableCell, TextField, Tooltip, Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Search from '@mui/icons-material/Search';
import { Order } from '../../../types/Order.type';
import { columns } from './ColumnDataOrder';
import { Link } from 'react-router-dom';


function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
            fontWeight: 'Bold',
            fontSize: 16
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Order) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'editColumn' ? (
            <Stack direction='row' className="flex justify-end">
              {/* <OrderEditPage id={row.or_id} result={row} /> */}
              {/* <OrderDeletePage id={row.or_id} result={row.cargo_name} /> */}
            </Stack>
          ) : (
            column.dataKey === 'arrival_time' || column.dataKey === 'deadline_time' ? (
              row[column.dataKey].toLocaleString()
            ) : (
              row[column.dataKey]
            )
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}



export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const orderReducer = useSelector((state: RootState) => state.order);

  // search
  const filteredData = (orderReducer.orders).filter((item) =>
    item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: Order[] = filteredData.map((items) => ({
    or_id: items.or_id,
    carrier_name: items.carrier_name,
    category: items.category,
    cargo_name: items.cargo_name,
    load: items.load,
    bulk: items.bulk,
    arrival_time: items.arrival_time,
    deadline_time: items.deadline_time,
    latitude: items.latitude,
    longitude: items.longitude,
    maxFTS: items.maxFTS,
    penalty_rate: items.penalty_rate,
    reward_rate: items.reward_rate,
  }));

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


  return (
    <>
      {
        orderReducer.loading ? (
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
        ) : orderReducer.error ? (
          <Typography>Error: {orderReducer.error}</Typography>
        ) : (
          <>
            <Paper sx={{ height: '70vh', width: "100%", marginBottom: 1 }}>
              <Box className='flex justify-between m-5'>
                <Stack direction='row' spacing={5} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Tooltip title="ค้นหา">
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            Search
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Tooltip>
                </Stack>
                <Button
                  variant='outlined'
                  component={Link}
                  to="/orders/create"
                >
                  Create Order
                </Button>
              </Box>
              <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>
          </>
        )
      }
    </>
  );
}
