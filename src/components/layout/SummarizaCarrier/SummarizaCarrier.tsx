import { useSelector } from 'react-redux';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TableContainer, TableHead, TableCell, Paper, TableRow, Table, TableBody, Tooltip, InputAdornment, TextField } from '@mui/material';
import moment from 'moment';
import Search from '@mui/icons-material/Search';
import { solutionOrderSSelector } from '../../../store/slices/Solution/solutionOrderSlice';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';

function Tables({ filteredData }: any) {

  return (
    <TableContainer component={Paper} className='min-w-[85wh]'>
      <Table aria-label="simple table" className='min-w-[85wh]'>
        <TableHead>
          <TableRow>
            <TableCell>ชื่อเรือ</TableCell>
            <TableCell align="right">เวลาเริ่ม</TableCell>
            <TableCell align="right">เวลาเสร็จ</TableCell>
            <TableCell align="right">ค่าปรับล่าช้า</TableCell>
            <TableCell align="right">รางวัล</TableCell>
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
              {filteredData.map((row: any) => (
                <TableRow
                  key={row.or_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.carrier_name}
                  </TableCell>
                  <TableCell align="right">{row.start_time ? moment(row.start_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}</TableCell>
                  <TableCell align="right">{row.finish_time ? moment(row.finish_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}</TableCell>
                  <TableCell align="right">{row.penalty_cost}</TableCell>
                  <TableCell align="right">{row.reward}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default function SummarizaCarrier() {
  const solutionCarrierOrderReducer = useSelector(solutionOrderSSelector)
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const rolesReducer = useSelector(roleSelector)

  const filteredCarrierOrderReducer = (solutionCarrierOrderReducer.result).filter((group) => group.s_id === rolesReducer.result?.group);

  // search
  const filteredData = (filteredCarrierOrderReducer).filter((item) =>
    item.carrier_name && item.carrier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (

    <>{filteredData.length === 0 ? (
      <>
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
          className='text-cyan-800 flex justify-center items-center'
          variant='h4'
          component='h2'
        >
          ไม่มีข้อมูล
        </Typography>
      </>

    ) : (
      <Box
        className='w-full'
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        {/* <Tabs
        variant="scrollable"
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minHeight: 20 }}
        className='min-h-[10rem]'

      >
        {solutionCarrierOrderReducer.result.map((items, index) => (
          <Tab
            key={index}
            className={value === index ? 'bg-[#caf0f8]/25 font-kanit' : 'text-gray-600 font-kanit'}
            label={`${items.carrier_name}`}
            {...a11yProps(0)}
          />
        ))}
      </Tabs> */}

        <Box className='w-full flex flex-col justify-center min-w-[76.5vw]'>
          <Box className='w-3/12 mb-5'>
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
          </Box>
          <Tables filteredData={filteredData} />

        </Box>
      </Box>
    )}
    </>
  );
}


