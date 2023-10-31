import Search from '@mui/icons-material/Search'
import { Box, Button, Card, CardContent, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


type Props = {}

const showThead = () => {
  return (
    <TableRow>
      {["ชื่อเรือ", "ชื่อบริษัท", "ความจุสูงสุด (ตัน)", "จำนวนระวาง", "จำนวนทุ่นเข้าได้สูงสุด", "จำนวนเครนเข้าได้สูงสุด", "กว้าง", "ยาว", "เครน", ""].map((title) => (
        <TableCell
          key={title}
          align={title === 'ชื่อเรือ' ? 'left' : 'center'}
          className="font-kanit text-blue-900"
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

export default function CarrierPage({ }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const carrierReducer = useSelector((state: RootState) => state.carrier);

  // search
  const filteredData = (carrierReducer.carrier).filter((item) =>
    item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showTbody = () => {
    return (
      <>
        {
          filteredData.map((items) => (
            <TableRow
              key={items.cr_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{items.carrier_name}</TableCell>
              <TableCell align="right">{items.holder}</TableCell>
              <TableCell align="right">{items.maxcapacity}</TableCell>
              <TableCell align="right">{items.burden}</TableCell>
              <TableCell align="right">{items.carrier_max_FTS}</TableCell>
              <TableCell align="right">{items.carrier_max_crane}</TableCell>
              <TableCell align="right">{items.Width}</TableCell>
              <TableCell align="right">{items.length}</TableCell>
              <TableCell align="right">{items.has_crane}</TableCell>
              <TableCell align="right">
                hello
              </TableCell>

            </TableRow>
          ))
        }
      </>
    )
  }

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-y-7'>
          <Box>
            <Typography
              variant="h6"
              noWrap
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
              className='text-blue-900'
            >
              <MoreHorizIcon sx={{ fontSize: 40, marginTop: 1 }} />
              เรือสินค้า
            </Typography>
            <hr />
          </Box>
          <Box className='w-full flex justify-end'>
            <Box className='w-[600px] flex gap-x-5'>
              <Tooltip
                title="ค้นหา"
                className='flex justify-end'
              >
                <TextField
                  fullWidth
                  id="standard-basic"
                  variant="outlined"
                  placeholder='Search'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>
              <Button
                variant="contained"
                className='w-[60%] bg-blue-600 hover:bg-blue-800'
                startIcon={<AddIcon />}
              >
                Create
              </Button>
            </Box>
          </Box>
          <Box>
            <hr />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  {showThead()}
                </TableHead>
                <TableBody>
                  {showTbody()}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}