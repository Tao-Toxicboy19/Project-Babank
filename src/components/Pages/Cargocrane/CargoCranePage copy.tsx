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
import { CargoCrane } from '../../../types/CargoCrane.type';
import { columns } from './ColumnDataCargoCrane';
import CargoCraneInsertPage from './Insert/CargoCraneInsertPage';
import CargoCraneEditPage from './Edit/CargoCraneEditPage';
import CargoCraneDeletePage from './Delete/CargoCraneDeletePage';


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

function rowContent(_index: number, row: CargoCrane) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'editColumn' ? (
            <Stack direction='row' className="flex justify-end">
              <CargoCraneEditPage id={row.cc_id} result={row} />
              <CargoCraneDeletePage id={row.cc_id} result={row.cargo_name} />
            </Stack>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}


export default function CargoCranePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const cargoCraneReducer = useSelector((state: RootState) => state.cargoCrane);

  // search
  const filteredData = (cargoCraneReducer.cargoCrane).filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: CargoCrane[] = filteredData.map((items) => ({
    cargo_id: items.ca_id,
    ca_id: items.ca_id,
    cargo_name: items.cargo_name,
    category: items.category,
    cc_id: items.cc_id,
    consumption_rate: items.consumption_rate,
    crane: items.crane,
    fl_id: items.fl_id,
    floating_name: items.floating_name,
    work_rate: items.work_rate,
  }));

  const VirtuosoTableComponents: TableComponents<CargoCrane> = {
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
                <Typography className='text-2xl font-bold'>ข้อมูลระหว่างสินค้าและเครน</Typography>
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
        cargoCraneReducer.loading ? (
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
        ) : cargoCraneReducer.error ? (
          <Typography>Error: {cargoCraneReducer.error}</Typography>
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
