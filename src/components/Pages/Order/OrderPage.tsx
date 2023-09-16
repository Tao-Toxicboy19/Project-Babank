import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { Box, Card, CardContent, CircularProgress, InputAdornment, Stack, TableCell, TextField, Tooltip, Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Search from '@mui/icons-material/Search';
import { Order } from '../../../types/Order.type';
import { columns } from './ColumnDataOrder';
import CargoCraneInsertPage from '../Cargocrane/Insert/CargoCraneInsertPage';
import OrderEditPage from './Edit/OrderEditPage';
import OrderDeletePage from './Delete/OrderDeletePage';

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
              <OrderEditPage id={row.or_id} result={row} />
              <OrderDeletePage id={row.or_id} result={row.cargo_name} />
            </Stack>
          ) : (
            row[column.dataKey]
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
      <Card className='mt-5 mb-2'>
        <CardContent>
          <Stack direction='row' className='flex justify-between'>
            <Card>
              <Stack direction='row' spacing={2} className='flex items-center'>
                <Typography className='text-2xl font-bold'>รายการถ่ายโอนสินค้า</Typography>
              </Stack>
            </Card>
            <Stack direction='row' spacing={5} sx={{ display: 'flex', alignItems: 'center' }}>
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
              <CargoCraneInsertPage />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
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
