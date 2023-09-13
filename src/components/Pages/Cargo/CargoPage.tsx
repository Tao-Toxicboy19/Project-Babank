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
import { Cargo } from '../../../types/Cargo.type';
import { columns } from './ColumnDataCargo';
import CargoInsertPage from './Insert/CargoInsertPage';
import CargoEditPage from './Edit/CargoEditPage';
import CargoDeletePage from './Delete/CargoDeletePage';


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

function rowContent(_index: number, row: Cargo) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'editColumn' ? (
            <Stack direction='row' className="flex justify-end">
              <CargoEditPage id={row.cargo_id} result={row} />
              <CargoDeletePage id={row.cargo_id} result={row.cargo_name} />
            </Stack>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}


export default function CargoPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const cargoReducer = useSelector((state: RootState) => state.cargo);

  // search
  const filteredData = (cargoReducer.cargo).filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: Cargo[] = filteredData.map((items) => ({
    cargo_id: items.cargo_id,
    cargo_name: items.cargo_name,
    category: items.category,
    consumption_rate: items.consumption_rate,
    work_rate: items.work_rate,
  }));

  const VirtuosoTableComponents: TableComponents<Cargo> = {
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
                <Typography className='text-2xl font-bold'>สินค้า</Typography>
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
              <CargoInsertPage />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      {
        cargoReducer.loading ? (
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
        ) : cargoReducer.error ? (
          <Typography>Error: {cargoReducer.error}</Typography>
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
