import { Box, Button, Card, CardContent, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../../layout/Loading/Loading';
import Titles from '../../../layout/Titles/Titles';
import TableTitles from '../../../layout/TableTitles/TableTitles';
import { TitleCarrier } from '../../../../Constants';
import { RiEditLine } from 'react-icons/ri';
import CarrierDeletePage from '../CarrierDeletePage/CarrierDeletePage';
import SearchTerms from '../../../layout/SearchTerms/SearchTerms';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';
import { carrierAsync, carrierSelector } from '../../../../store/slices/Carrier/carrierSlice';
import { useAppDispatch } from '../../../../store/store';


type Props = {}

export default function CarrierPage({ }: Props) {
  const carrierReducer = useSelector(carrierSelector)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const rolesReducer = useSelector(roleSelector)
  const disapatch = useAppDispatch()
  // search
  const filteredData = (carrierReducer.result).filter((item) =>
    item.carrier_name && item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredData)

  useEffect(() => {
    disapatch(carrierAsync())
  }, []);

  const showTbody = () => {
    return (
      <>
        {
          (filteredData).map((items) => (
            <TableRow
              key={items.cr_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{items.carrier_name}</TableCell>
              <TableCell align="center">{items.holder}</TableCell>
              <TableCell align="center">
                {items.maxcapacity !== null ? (items.maxcapacity).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
              </TableCell>
              <TableCell align="center">{items.burden}</TableCell>
              <TableCell align="center">{items.carrier_max_FTS}</TableCell>
              <TableCell align="center">{items.carrier_max_crane}</TableCell>
              <TableCell align="center">{items.Width}</TableCell>
              <TableCell align="center">{items.length}</TableCell>
              <TableCell align="right">
                <Typography
                  className={`flex justify-center w-[110px] h-fit mx-auto  rounded-lg ${items.has_crane !== 'ไม่มีเครน' ? 'bg-emerald-100 text-emerald-950' : 'bg-red-100 text-red-950'}`}
                >
                  {items.has_crane}
                </Typography>
              </TableCell>
              {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                <></>
              ) : (
                <TableCell align="center">
                  <Stack direction='row' className="flex justify-end">
                    <Tooltip title="แก้ไข">
                      <IconButton component={Link} to={`/carrier/edit/${items.cr_id}`}>
                        <RiEditLine className="text-[#135812]" />
                      </IconButton>
                    </Tooltip>
                    <CarrierDeletePage id={items.cr_id} />
                  </Stack>
                </TableCell>
              )}
            </TableRow >
          ))
        }
      </>
    )
  }

  return (
    <>
      <Card className='min-h-[90vh]'>
        <CardContent className='flex flex-col gap-y-7'>
          {carrierReducer.loading ? (
            <Loading />
          ) : carrierReducer.error ? (
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
          ) : (
            <>
              <Box>
                <Titles title='เรือสินค้า' />
                <hr />
              </Box>
              <Box className='w-full flex justify-end'>
                <Box className='w-[600px] flex gap-x-5'>
                  <SearchTerms searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                    <></>
                  ) : (
                    <Button
                      component={Link}
                      to={'/carrier/create'}
                      variant="contained"
                      className='w-[60%] bg-blue-600 hover:bg-blue-800'
                      startIcon={<AddIcon />}
                    >
                      Create
                    </Button>
                  )}
                </Box>
              </Box>
              <Box>
                <hr />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableTitles Titles={TitleCarrier} />
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
          )}
        </CardContent>
      </Card >
    </>
  )
}