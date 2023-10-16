import React, { useEffect, useState } from 'react';
import { CargoCrane } from '../../../types/CargoCrane.type';
import { Box, Fab, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTS } from '../../../store/slices/FTS.slice';
import { loadCarrier } from '../../../store/slices/carrier.slice';
import { loadCrane } from '../../../store/slices/crane.slice';
import { loadCargo } from '../../../store/slices/cargo.slice';
import { loadCargoCrane } from '../../../store/slices/cargocrane.slice';
import { RootState } from '../../../store/store';
import CargoCraneDeletePage from './Delete/CargoCraneDeletePage';
import AddIcon from '@mui/icons-material/Add';
import { TitleCargoCrane } from '../../../Constants';
import { LuFileEdit } from 'react-icons/lu';
import Search from '@mui/icons-material/Search';
import Loading from '../../layout/Loading/Loading';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type Props = {}

export default function App({ }: Props) {
  const CargoCraneReducer = useSelector((state: RootState) => state.cargoCrane);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const dispatch = useDispatch<any>();
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredData = (CargoCraneReducer.result).filter((item) =>
    item.crane!.crane_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    dispatch(loadFTS())
    dispatch(loadCarrier())
    dispatch(loadCargo())
    dispatch(loadCrane())
    dispatch(loadCargoCrane())
  }, []);

  const nameGroups = new Map<string, CargoCrane[]>();

  (filteredData).forEach((item) => {
    const name = item.fts!.FTS_name;
    if (nameGroups.has(name!)) {
      // ถ้ามีชื่ออยู่แล้วใน Map ให้เพิ่มข้อมูลเข้าไป
      nameGroups.get(name!)?.push(item);
    } else {
      // ถ้าไม่มีชื่ออยู่ใน Map ให้สร้างรายการใหม่
      nameGroups.set(name!, [item]);
    }
  });

  const toggleGroup = (name: string) => {
    if (openGroups.has(name)) {
      openGroups.delete(name);
    } else {
      openGroups.add(name);
    }
    setOpenGroups(new Set(openGroups));
  };

  const showThead = () => {
    return (
      <TableRow>
        {TitleCargoCrane.map((title) => (
          <TableCell
            key={title}
            align={title === 'ชื่อเรือ' ? 'left' : 'center'}
            className='font-kanit'
            sx={{
              backgroundColor: 'background.paper',
              fontWeight: 'Bold',
              fontSize: 16
            }}
          >
            {title}
          </TableCell>
        ))}
      </TableRow>
    )
  }


  const showTbody = () => {
    return (
      <TableBody>
        {Array.from(nameGroups.entries()).map(([name, items]) => (
          <React.Fragment key={name}>
            <TableRow>
              <TableCell className='w-[150px] font-kanit'>
                {items.length > 1 && (
                  <button onClick={() => toggleGroup(name)}>
                    {openGroups.has(name) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </button>
                )}
                {name}
              </TableCell>
              <TableCell
                align="center"
                className='w-[150px] font-kanit'
              >
                {items[0].crane!.crane_name}
              </TableCell>
              <TableCell
                align="center"
                className='w-[200px] font-kanit'
              >
                {items[0].cargo!.cargo_name}
              </TableCell>
              <TableCell
                align="center"
                className='w-[120px] font-kanit'
              >
                {items[0].category}
              </TableCell>
              <TableCell
                align="center"
                className='w-[120px] font-kanit'
              >
                {items[0].consumption_rate}
              </TableCell>
              <TableCell
                align="center"
                className='w-[120px] font-kanit'
              >
                {items[0].work_rate}
              </TableCell>
              <TableCell
                align="center"
                className='w-[120px] font-kanit
                '
              >
                <Tooltip title="แก้ไข">
                  <IconButton component={Link} to={`/cargocrane/edit/${items[0].cargo_crane_id}`}>
                    <LuFileEdit className="text-[#169413]" />
                  </IconButton>
                </Tooltip>
                <CargoCraneDeletePage id={items[0].cargo_crane_id} />
              </TableCell>
            </TableRow>
            {openGroups.has(name) &&
              items.slice(1).map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >
                  </TableCell>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >
                    {item.crane!.crane_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >
                    {item.cargo!.cargo_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >
                    {item.category}
                  </TableCell>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >
                    {item.consumption_rate}
                  </TableCell>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >
                    {item.work_rate}
                  </TableCell>
                  <TableCell
                    align="center"
                    className='font-kanit'
                  >

                    <Tooltip title="แก้ไข">
                      <IconButton component={Link} to={`/cargocrane/edit/${item.cargo_crane_id}`}>
                        <LuFileEdit className="text-[#169413]" />
                      </IconButton>
                    </Tooltip>
                    <CargoCraneDeletePage id={item.cargo_crane_id} />
                  </TableCell>
                </TableRow>
              ))}
          </React.Fragment>
        ))}
      </TableBody>
    );
  };

  return (
    <>
      {CargoCraneReducer.loading ? (
        <Loading />
      )
        : (
          <TableContainer component={Paper} className='min-h-[90vh] mt-5'>
            <Box className="justify-between flex mx-5">
              <Stack direction='row' spacing={5} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Typography
                  className='font-kanit'
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
                  ข้อมูลสินค้าและเครน
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

              <Box className='flex justify-end'>
                <Tooltip title="เพิ่มทุ่น">
                  <Fab
                    component={Link}
                    to="/cargocrane/create"
                    color="primary"
                    aria-label="add"
                    size='small'
                    className='bg-blue-500 hover:bg-blue-700 my-4'
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </Box>
            </Box >
            <hr />
            <Table
              aria-label="simple table"
              sx={{
                borderCollapse: "collapse",
                "& td, & th": {
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                },
              }}
            >
              <TableHead>
                {showThead()}
              </TableHead>
              {showTbody()}
            </Table>
          </TableContainer >
        )
      }
    </>
  );
}
