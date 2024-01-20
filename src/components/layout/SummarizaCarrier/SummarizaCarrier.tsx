import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TableContainer, TableHead, TableCell, Paper, TableRow, Table, TableBody } from '@mui/material';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';
import { reportCraneSelector } from '../../../store/slices/report/reportCraneSlice';
import { carrierSelector } from '../../../store/slices/Carrier/carrierSlice';

function Tables({ filteredData }: any) {
  const carrierReducer = useSelector(carrierSelector)

  return (
    <TableContainer component={Paper} className='min-w-[85wh]'>
      <Table aria-label="simple table" className='min-w-[85wh]'>
        <TableHead>
          <TableRow>
            <TableCell>ชื่อเรือ</TableCell>
            <TableCell align="right">ค่าแรง (เดือน)</TableCell>
            <TableCell align="right">อัตราการใช้เพลิง</TableCell>
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
              {filteredData.map((row: any) => {
                const nameCarrier = (carrierReducer.result).find((r) => r.cr_id === row.carrier_id)
                return (
                  <TableRow
                    key={row.or_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {nameCarrier?.carrier_name}
                    </TableCell>
                    <TableCell align="right">{row.wage_month_cost}</TableCell>
                    <TableCell align="right">{row.consumption_rate}</TableCell>
                    {/* <TableCell align="right">{row.start_time ? moment(row.start_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}</TableCell> */}
                    {/* <TableCell align="right">{row.due_time ? moment(row.due_time).add(12, 'hours').format('DD/MM/YYYY HH:mm:ss') : ""}</TableCell> */}
                    <TableCell align="right">{row.penalty_cost}</TableCell>
                    <TableCell align="right">{row.reward}</TableCell>
                  </TableRow>
                )
              })}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default function SummarizaCarrier() {
  const reportCraneReducer = useSelector(reportCraneSelector)
  const rolesReducer = useSelector(roleSelector)

  const filteredCarrierOrderReducer = (reportCraneReducer.result).filter((group) => group.solution_id === rolesReducer.result?.group);

  const resultArray = Object.values(filteredCarrierOrderReducer.reduce((accumulator: any, currentValue: any) => {
    const { carrier_id, consumption_rate, wage_month_cost, penalty_cost, reward } = currentValue;

    // ในกรณี carrier_id ไม่มีใน accumulator ให้สร้าง key ใหม่
    if (!accumulator[carrier_id]) {
      accumulator[carrier_id] = {
        carrier_id,
        consumption_rate: 0,
        wage_month_cost: 0,
        penalty_cost: 0,
        reward: 0
      };
    }

    // บวกค่าเข้ากับ accumulator
    accumulator[carrier_id].consumption_rate += consumption_rate;
    accumulator[carrier_id].wage_month_cost += wage_month_cost;
    accumulator[carrier_id].penalty_cost += penalty_cost;
    accumulator[carrier_id].reward += reward;

    return accumulator;
  }, {}))

  return (

    <>{resultArray.length === 0 ? (
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
            {/* <Tooltip
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
            </Tooltip> */}
          </Box>
          <Tables filteredData={resultArray} />

        </Box>
      </Box>
    )}
    </>
  );
}


