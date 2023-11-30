import { Box, Button, Card, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import Loading from '../../layout/Loading/Loading'
import Titles from '../../layout/Titles/Titles'
import SearchTerms from '../../layout/SearchTerms/SearchTerms'
import Add from '@mui/icons-material/Add'
import TableTitles from '../../layout/TableTitles/TableTitles'
import { TitleCargoCrane } from '../../../Constants'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useState } from 'react'
import { CargoCrane } from '../../../type/CargoCrane.type'
import React from 'react'
import { RiEditLine } from 'react-icons/ri'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Link } from 'react-router-dom'
import CargoCraneDeletePage from './CargoCraneDeletePage.tsx/CargoCraneDeletePage'

type Props = {}

export default function CargoCranePage({ }: Props) {
  const CargoCraneReducer = useSelector((state: RootState) => state.cargoCrane);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

  const filteredData = (CargoCraneReducer.result).filter((item) =>
    item.crane!.crane_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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


  const showTbody = () => {
    return (
      <>
        {Array.from(nameGroups.entries()).map(([name, items]) => (
          <React.Fragment key={name}>
            <TableRow>
              <TableCell className='w-[150px] font-kanit'>
                {items.length > 1 && (
                  <button onClick={() => toggleGroup(name)}>
                    {openGroups.has(name) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
                <Typography
                  className={`flex justify-center w-[110px] h-fit mx-auto  rounded-lg ${items[0].category !== 'export' ? 'bg-emerald-100 text-emerald-950' : 'bg-red-100 text-red-950'}`}
                >
                  {items[0].category}
                </Typography>
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
              {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                <></>
              ) : (
                <TableCell
                  align="center"
                  className='w-[120px] font-kanit'
                >
                  <Tooltip title="แก้ไข">
                    <IconButton
                      component={Link}
                      to={`/cargocrane/edit/${items[0].cargo_crane_id}`}
                    >
                      <RiEditLine className="text-[#135812]" />

                    </IconButton>
                  </Tooltip>
                  <CargoCraneDeletePage id={items[0].cargo_crane_id} />
                </TableCell>
              )}
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
                    <Typography
                      className={`flex justify-center w-[110px] h-fit mx-auto  rounded-lg ${item.category !== 'export' ? 'bg-emerald-100 text-emerald-950' : 'bg-red-100 text-red-950'}`}
                    >
                      {item.category}
                    </Typography>
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
                  {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                    <></>
                  ) : (
                    <TableCell
                      align="center"
                      className='font-kanit'
                    >

                      <Tooltip title="แก้ไข">
                        <IconButton component={Link} to={`/cargocrane/edit/${item.cargo_crane_id}`}>
                          <RiEditLine className="text-[#135812]" />
                        </IconButton>
                      </Tooltip>
                      <CargoCraneDeletePage id={item.cargo_crane_id} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </React.Fragment>
        ))}
      </>
    );
  };


  return (
    <Card className='min-h-[90vh]'>
      <CardContent className='flex flex-col gap-y-7'>
        {CargoCraneReducer.loading ? (
          <Loading />
        ) : (
          CargoCraneReducer.error ? (
            <Typography>Error: {CargoCraneReducer.error}</Typography>
          ) : (
            <>
              <Box>
                <Titles title='ข้อมูลสินค้าและเครน' />
                <hr />
              </Box>
              <Box className='w-full flex justify-end'>
                {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                  <></>
                ) : (
                  <Box className='w-[600px] flex gap-x-5'>
                    <SearchTerms searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Tooltip title="เพิ่มสินค้า">
                      <Button
                        component={Link}
                        to="/cargocrane/create"
                        variant="contained"
                        className='w-[60%] bg-blue-600 hover:bg-blue-800'
                        startIcon={<Add />}
                      >
                        Create
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Box>
              <Box>
                <hr />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableTitles Titles={TitleCargoCrane} />
                    </TableHead>
                    <TableBody>
                      {filteredData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10}>
                            <Typography
                              sx={{
                                mr: 2,
                                fontSize: 33,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                textDecoration: "none",
                              }}
                              className='text-cyan-800 flex justify-center items-center h-[59vh]'
                              variant='h4'
                              component='h2'
                            >
                              ไม่มีข้อมูล
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        showTbody()
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          ))}
      </CardContent>
    </Card>
  )
}