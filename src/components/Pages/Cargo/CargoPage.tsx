import { TableContainer, TableHead, TableCell, Table, TableRow, Paper, TableBody, Card, CardContent, Typography, Box, Button, Tooltip, Stack } from '@mui/material'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Loading from '../../layout/Loading/Loading';
import Titles from '../../layout/Titles/Titles';
import SearchTerms from '../../layout/SearchTerms/SearchTerms';
import Add from '@mui/icons-material/Add';
import CargoCreatePage from '../../layout/Cargo/CargoCreatePage/CargoInsertPage';
import CargoDeletePage from '../../layout/Cargo/Delete/CargoDeletePage';
import CargoEditPage from '../../layout/Cargo/Edit/CargoEditPage';

type Props = {}

export default function CargoPage({ }: Props) {
  const cargoReducer = useSelector((state: RootState) => state.cargo);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

  const filteredData = (cargoReducer.cargo).filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className='min-h-[90vh]'>
      <CardContent className='flex flex-col gap-y-7'>
        {cargoReducer.loading ? (
          <Loading />
        ) : (
          cargoReducer.error ? (
            <Typography>Error: {cargoReducer.error}</Typography>
          ) : (
            <>
              <Box>
                <Titles title='สินค้า' />
                <hr />
              </Box>
              <Box className='w-full flex justify-end'>
                <Box className='w-[600px] flex gap-x-5'>
                  <SearchTerms searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                    <></>
                  ) : (
                    <>
                      <Tooltip title="เพิ่มสินค้า">
                        <Button
                          variant="contained"
                          className='w-[60%] bg-blue-600 hover:bg-blue-800'
                          startIcon={<Add />}
                          onClick={() => setOpen(true)}
                        >
                          Create
                        </Button>
                      </Tooltip>
                      <CargoCreatePage open={open} setOpen={setOpen} />
                    </>
                  )}
                </Box>
              </Box>
              <Box>
                <hr />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align={'left'}
                          className="font-kanit text-blue-900"
                          sx={{
                            backgroundColor: 'background.paper',
                            fontWeight: 'Bold',
                            fontSize: 16,
                          }}
                        >
                          ชื่อสินค้า
                        </TableCell>
                        {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                          <></>
                        ) : (
                          <TableCell
                            align={'center'}
                            className="font-kanit text-blue-900 w-9"
                            sx={{
                              backgroundColor: 'background.paper',
                              fontWeight: 'Bold',
                              fontSize: 16,
                            }}
                          >
                            #
                          </TableCell>
                        )}
                      </TableRow>
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
                        <>
                          {filteredData.map((row) => (
                            <TableRow
                              key={row.cargo_id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.cargo_name}
                              </TableCell>
                              {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                                <></>
                              ) : (
                                <TableCell align="center">
                                  <Stack direction='row' className="flex justify-end">
                                    <CargoEditPage id={row.cargo_id} result={row} />
                                    <CargoDeletePage id={row.cargo_id} result={row.cargo_name} />
                                  </Stack>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </>
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