
import { Box, Typography } from '@mui/material';
import { TreeTableProps } from '../../../../types/CargoCrane.type';
import TreeTableNode from './TreeTableNode';

export default function TreeTable({ data }: TreeTableProps) {
    return (
        <>
            <Box
                className='border-b-[1px] grid grid-cols-12 gap-x-2'
            >
                {['ชื่อทุ่น', 'เครนลำดับที่', 'สถานะสินค้า (ขาเข้า/ขาออก)', 'ชื่อสินค้า', 'อัตราการขนถ่ายสินค้า (ตัน/ชม.)', 'อัตราการใช้น้ำมัน (ลิตร/ตัน)'].map((item, index) => (
                    <Box key={index} className='col-span-2'>
                        <Typography className='flex justify-center'>{item}</Typography>
                    </Box>
                ))}
            </Box>
            {data.map((node, index) => (
                <TreeTableNode key={index} {...node} />
            ))}
        </>
    );
}
