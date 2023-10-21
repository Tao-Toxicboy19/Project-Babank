import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Search from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Add from '@mui/icons-material/Add';
import { LuFileEdit } from 'react-icons/lu';
import Loading from '../../layout/Loading/Loading';
import NotFound from '../../layout/ERR_REPORT/PageNotFound';
import CarrierDeletePage from '../../layout/Carrier/Delete/CarrierDeletePage';
import { Carrier } from '../../../types/Carrier.type';
import { columns } from '../../layout/Carrier/ColumnDataCarrier';



function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          className='font-kanit'
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

function rowContent(_index: number, row: any) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
          className='py-[8px] font-kanit'
        >
          {column.dataKey === 'editColumn' ? (
            <Stack direction='row' className="flex justify-end">
              <Tooltip title="แก้ไข">
                <IconButton component={Link} to={`/carrier/edit/${row.cr_id}`}>
                  <LuFileEdit className="text-[#169413]" />
                </IconButton>
              </Tooltip>
              <CarrierDeletePage id={row.cr_id} />
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
    holder: items.holder,
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
      {
        carrierReducer.loading ? (
          <Loading />
        ) : carrierReducer.error ? (
          <NotFound />
        ) : (
          <>
            <Paper sx={{ height: '82.5vh', width: "100%", marginBottom: 1, marginTop: 2 }}>
              <Box className='flex justify-between mx-5'>
                <Stack direction='row' spacing={5} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Typography
                    component='h1'
                    className='font-kanit'
                    sx={{
                      fontSize: 22,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    เรือสินค้า
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
                <Tooltip title="เพิ่มทุ่น">
                  <Link to="/carrier/create">
                    <Fab
                      color="primary"
                      aria-label="add"
                      size='small'
                      className='bg-blue-500 hover:bg-blue-700 my-4'

                    >
                      <Add />
                    </Fab>
                  </Link>
                </Tooltip>
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
