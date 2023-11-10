import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Typography } from '@mui/material';

type Props = {
    value: any
    Name: any
}


export default function Tables({ Name }: Props) {
    const CraneSolutionV2Reducer = useSelector((state: RootState) => state.carneSolutionV2Reducer.result);

    const filteredData = CraneSolutionV2Reducer.filter(item => item.fts.FTS_name === Name);

    return (
        <>
            <Box className='grid grid-cols-6 gap-3 mt-3'>
                <Typography
                    className='font-kanit'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ชื่อเครน
                </Typography>
                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ต้นรวมทุน
                </Typography>
                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ค่าเชื้อเพลิงรวม
                </Typography>

                <Typography
                    className='font-kanit flex justify-center '
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ค่าแรง
                </Typography>

                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    ค่าปรับล่าช้า
                </Typography>
                <Typography
                    className='font-kanit flex justify-center'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    รางวัล
                </Typography>
                <hr className='col-span-6' />
                {(filteredData).map((items: any) => (
                    <>
                        <Typography
                            align="left"
                            className='font-kanit text-lg'
                        >
                            {items.crane.crane_name}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>

                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_wage_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.penality_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <Typography
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_reward.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>
                        <hr className='col-span-6' />
                    </>
                ))}
                <hr className='col-span-6' />
            </Box>
        </>
        // <TableContainer component={Paper}>
        //     <Table
        //         aria-label="simple table"
        //         sx={{
        //             borderCollapse: "collapse",
        //             "& td, & th": {
        //                 padding: "14px",
        //                 borderBottom: "1px solid #ddd",
        //             },
        //         }}
        //     >
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell
        //                     align={'left'}
        //                     className='font-kanit w-[115px]'
        //                     sx={{
        //                         backgroundColor: 'background.paper',
        //                         fontWeight: 'Bold',
        //                         fontSize: 18
        //                     }}
        //                 >
        //                     ชื่อเครน
        //                 </TableCell>
        //                 <TableCell
        //                     align={'center'}
        //                     className='font-kanit w-[145px]'
        //                     sx={{
        //                         backgroundColor: 'background.paper',
        //                         fontWeight: 'Bold',
        //                         fontSize: 18
        //                     }}
        //                 >
        //                     ต้นทุน
        //                 </TableCell>
        //                 <TableCell
        //                     align={'center'}
        //                     className='font-kanit w-[100px]'
        //                     sx={{
        //                         backgroundColor: 'background.paper',
        //                         fontWeight: 'Bold',
        //                         fontSize: 18
        //                     }}
        //                 >
        //                     ค่าเชื้อเพลิง
        //                 </TableCell>
        //                 <TableCell
        //                     align={'center'}
        //                     className='font-kanit w-[100px]'
        //                     sx={{
        //                         backgroundColor: 'background.paper',
        //                         fontWeight: 'Bold',
        //                         fontSize: 18
        //                     }}
        //                 >
        //                     ค่าเเรง
        //                 </TableCell>
        //                 <TableCell
        //                     align={'center'}
        //                     className='font-kanit w-[100px]'
        //                     sx={{
        //                         backgroundColor: 'background.paper',
        //                         fontWeight: 'Bold',
        //                         fontSize: 18
        //                     }}
        //                 >
        //                     ค่าปรับล่าช้า
        //                 </TableCell>
        //                 <TableCell
        //                     align={'center'}
        //                     className='font-kanit w-[100px]'
        //                     sx={{
        //                         backgroundColor: 'background.paper',
        //                         fontWeight: 'Bold',
        //                         fontSize: 18
        //                     }}
        //                 >
        //                     รางวัลรวม
        //                 </TableCell>
        //             </TableRow>
        //         </TableHead>
        //         {(filteredData).map((items: any) => (
        //             <TableBody>
        //                 <TableCell
        //                     align="left"
        //                     className='font-kanit text-lg'
        //                 >
        //                     {items.crane.crane_name}
        //                 </TableCell>
        //                 <TableCell
        //                     align="center"
        //                     className='font-kanit text-lg'
        //                 >
        //                     {items.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        //                 </TableCell>

        //                 <TableCell
        //                     align="center"
        //                     className='font-kanit text-lg'
        //                 >
        //                     {items.total_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        //                 </TableCell>
        //                 <TableCell
        //                     align="center"
        //                     className='font-kanit text-lg'
        //                 >
        //                     {items.total_wage_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        //                 </TableCell>
        //                 <TableCell
        //                     align="center"
        //                     className='font-kanit text-lg'
        //                 >
        //                     {items.penality_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        //                 </TableCell>
        //                 <TableCell
        //                     align="center"
        //                     className='font-kanit text-lg'
        //                 >
        //                     {items.total_reward.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        //                 </TableCell>

        //             </TableBody>
        //         ))}
        //     </Table>
        // </TableContainer>
    )
}