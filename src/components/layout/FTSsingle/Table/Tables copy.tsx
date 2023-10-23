import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type Props = {
    CraneSolutionV2Reducer: any
    value: any
}

const showThead = () => {
    return (
        <TableRow>
            {["ชื่อเครน", "รายจ่าย", "ค่าเชื้อเพลิง", "ค่าเเรง", "ค่าปรับล่าช้า", "รางวัลรวม"].map((title) => (
                <TableCell
                    key={title}
                    align={title === 'ชื่อเรือ' ? 'left' : 'center'}
                    className='font-kanit'
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 18
                    }}
                >
                    {title}
                </TableCell>
            ))}
        </TableRow>
    )
}


export default function Tables({ CraneSolutionV2Reducer, value }: Props) {

    return (
        <TableContainer component={Paper}>
            <Table
                aria-label="simple table"
                sx={{
                    borderCollapse: "collapse",
                    "& td, & th": {
                        padding: "14px",
                        borderBottom: "1px solid #ddd",
                    },
                }}
            >
                <TableHead>
                    {showThead()}
                </TableHead>
                {(CraneSolutionV2Reducer[value].result).map((items: any) => (
                    <TableBody>
                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            {items.total_cost}
                        </TableCell>
                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            hello
                        </TableCell>

                        <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            hello
                        </TableCell> <TableCell
                            align="center"
                            className='font-kanit text-lg'
                        >
                            hello
                        </TableCell>
                    </TableBody>
                ))}
            </Table>
        </TableContainer>
    )
}