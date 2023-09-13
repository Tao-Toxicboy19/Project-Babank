import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { Box, Card, CardContent, CircularProgress, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Search from '@mui/icons-material/Search';
import { Carrier } from '../../../types/Carrier.type';
import { columns } from './ColumnDataCarrier';
import CarrierInsertPage from './Insert/CarrierInsertPage';
import CarrierEditPage from './Edit/CarrierEditPage';
import CarrierDeletePage from './Delete/CarrierDeletePage';



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

function rowContent(_index: number, row: Carrier) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'editColumn' ? (
            <Stack direction='row' className="flex justify-end">
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
}


export default function CarrierPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const carrierReducer = useSelector((state: RootState) => state.carrier);

  // search
  const filteredData = (carrierReducer.carrier).filter((item) =>
    item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: Carrier[] = filteredData.map((items) => ({
    cr_id: items.cr_id,
    carrier_name: items.carrier_name,
    ower: items.ower,
    maxcapacity: items.maxcapacity,
    burden: items.burden,
  }));

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


  return (
    <>
      <Card className='mt-5 mb-2'>
        <CardContent>
          <Stack direction='row' className='flex justify-between'>
            <Card>
              <Stack direction='row' spacing={2} className='flex items-center'>
                <Typography className='text-2xl font-bold'>เรือสินค้า</Typography>
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
              <CarrierInsertPage />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      {
        carrierReducer.loading ? (
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
        ) : carrierReducer.error ? (
          <Typography>Error: {carrierReducer.error}</Typography>
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
