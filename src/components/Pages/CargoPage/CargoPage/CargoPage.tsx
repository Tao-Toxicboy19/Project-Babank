import {
  TableContainer,
  TableHead,
  TableCell,
  Table,
  TableRow,
  Paper,
  TableBody,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Tooltip,
  Stack
} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../layout/Loading/Loading';
import Titles from '../../../layout/Titles/Titles';
import SearchTerms from '../../../layout/SearchTerms/SearchTerms';
import Add from '@mui/icons-material/Add';
import CargoCreatePage from '../CargoAddPage/CargoAddPage';
import CargoDeletePage from '../Delete/CargoDeletePage';
import CargoEditPage from '../Edit/CargoEditPage';
import { cargoSelector } from '../../../../store/slices/Cargo/cargoSlice';
import { roleSelector } from '../../../../store/slices/auth/rolesSlice';

interface Cargo {
  cargo_id?: number;
  cargo_name: string;
}

type Props = {
  handleOpen: () => void,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  rolesReducer: any
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

function Header({ handleOpen, open, setOpen, rolesReducer, searchTerm, setSearchTerm }: Props) {
  return (
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
                onClick={handleOpen}
              >
                Create
              </Button>
            </Tooltip>
            <CargoCreatePage open={open} setOpen={setOpen} />
          </>
        )}
      </Box>
    </Box>
  )
}

function TitleTable({ rolesReducer }: any) {
  return (
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
        <TableCell
          align={'left'}
          className="font-kanit text-blue-900"
          sx={{
            backgroundColor: 'background.paper',
            fontWeight: 'Bold',
            fontSize: 16,
          }}
        >
          ค่าหัวตัน (บาท/ตัน)
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
  )
}

function BodyTable({ row, rolesReducer }: { row: Cargo, rolesReducer: any }) {
  return (
    <TableRow
      key={row.cargo_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.cargo_name}
      </TableCell>
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
  )
}

function NotFoundData() {
  return (
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
  )
}

export default function CargoPage() {
  const cargoReducer = useSelector(cargoSelector);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const rolesReducer = useSelector(roleSelector)

  const filteredData = (cargoReducer.result).filter((item) =>
    item.cargo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpen = () => setOpen(true)

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

              <Header
                handleOpen={handleOpen}
                open={open}
                setOpen={setOpen}
                rolesReducer={rolesReducer}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Box>
                <hr />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TitleTable
                      rolesReducer={rolesReducer}
                    />

                    <TableBody>

                      {filteredData.length === 0 ? (
                        <NotFoundData />
                      ) : (
                        <>
                          {filteredData.map((row) => (
                            <BodyTable
                              row={row}
                              rolesReducer={rolesReducer}
                            />
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
    </Card >
  )
}