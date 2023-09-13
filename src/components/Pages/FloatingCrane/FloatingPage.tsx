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
import { Floating } from '../../../types/FloatingCrane.type';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CarrierDeletePage from './Delete/DeleteFloatingPage';
import FloatingEditPage from './Edit/FloatingEditPage';
import FloatingInsertPage from './Insert/FloatingInsertPage';
import Search from '@mui/icons-material/Search';
import Maps from '../../layout/Maps/Maps';
import { columns } from './ColumnDataFloating';
import MapPopup from '../../layout/Maps/MapPopup';


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

function rowContent(_index: number, row: Floating) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'editColumn' ? (
            <Stack direction='row' className="flex justify-end">
              <FloatingEditPage id={row.fl_id} result={row} />
              <CarrierDeletePage id={row.fl_id} result={row.floating_name} />
            </Stack>
          ) : column.dataKey === 'map' ? (
            <MapPopup result={row} />
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}


export default function FloatingPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const floatingReducer = useSelector((state: RootState) => state.floating);

  // search
  const filteredData = (floatingReducer.floating).filter((item) =>
    item.floating_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: Floating[] = filteredData.map((floating) => ({
    fl_id: floating.fl_id,
    floating_name: floating.floating_name,
    NumberOfCranes: floating.NumberOfCranes,
    latitude: floating.latitude,
    longitude: floating.longitude,
    setuptime: floating.setuptime,
    speed: floating.speed,
  }));

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


  return (
    <>
      <Card className='mt-5 mb-2'>
        <CardContent>
          <Stack direction='row' className='flex justify-between'>
            <Card>
              <Stack direction='row' spacing={2} className='flex items-center'>
                <Typography className='text-2xl font-bold'>ทุ่น</Typography>
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
              <FloatingInsertPage />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      {
        floatingReducer.loading ? (
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
        ) : floatingReducer.error ? (
          <Typography>Error: {floatingReducer.error}</Typography>
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
            <Maps />
          </>
        )
      }
    </>
  );
}
