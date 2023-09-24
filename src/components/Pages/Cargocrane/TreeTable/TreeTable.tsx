
import { Box, Typography } from '@mui/material';
import TreeTableNode from './TreeTableNode';

export default function TreeTable({ FTScraneCargoReducer }: any) {
    return (
        <>
            <Box
                className='border-b-[1px] grid grid-cols-7 gap-x-2'
            >
                {['ชื่อทุ่น', 'เครนลำดับที่', 'สถานะสินค้า (ขาเข้า/ขาออก)', 'ชื่อสินค้า', 'อัตราการขนถ่ายสินค้า (ตัน/ชม.)', 'อัตราการใช้น้ำมัน (ลิตร/ตัน)','แก้ไข'].map((item, index) => (
                    <Box
                        key={index}
                        className='col-span-1'
                    >
                        <Typography
                            className='flex justify-center'
                            sx={{
                                backgroundColor: 'background.paper',
                                fontWeight: 'Bold',
                                fontSize: 16
                            }}>
                            {item}
                        </Typography>
                    </Box>
                ))}
            </Box>
            {FTScraneCargoReducer.map((node: any, index: any) => (
                <TreeTableNode key={index} {...node} />
            ))}
        </>
    );
}
