import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { Box, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { Cargo } from '../../../types/Cargo.type';
import { columns } from './ColumnDataCargo';
import CargoEditPage from './Edit/CargoEditPage';
import CargoDeletePage from './Delete/CargoDeletePage';
import CargoCreatePage from './CargoCreatePage/CargoInsertPage';
import Loading from '../../layout/Loading/Loading';
import Search from '@mui/icons-material/Search';


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
  const cargoReducer = useSelector((state: RootState) => state.cargo);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredData = (cargoReducer.cargo).filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: Cargo[] = (filteredData).map((items) => ({
    cargo_id: items.cargo_id,
    cargo_name: items.cargo_name,
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
      {
        cargoReducer.loading ? (
          <Loading />
        ) : cargoReducer.error ? (
          <Typography>Error: {cargoReducer.error}</Typography>
        ) : (
          <>
            <Paper sx={{ height: '82.5vh', width: "100%", marginBottom: 1, marginTop: 2 }}>
              <Box className='flex justify-between mx-5'>
                <Stack direction='row' spacing={5} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Typography
                    component='h1'
                    sx={{
                      fontSize: 22,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    สินค้า
                  </Typography>
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
                <CargoCreatePage />
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
