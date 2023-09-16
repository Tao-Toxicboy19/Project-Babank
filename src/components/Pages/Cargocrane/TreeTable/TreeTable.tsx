import { Box, Card, CardContent, Typography } from '@mui/material';
import { TreeTableProps } from '../../../../types/CargoCrane.type'
import TreeTableNode from './TreeTableNode';

export default function TreeTable({ data }: TreeTableProps) {
    return (
        <Card>
            <CardContent>
                <Box
                    className='border-b-[1px] grid grid-cols-6 gap-x-2'
                >
                    {['ชื่อทุ่น', 'เครนลำดับที่', 'สถานะสินค้า (ขาเข้า/ขาออก)', 'ชื่อสินค้า', 'อัตราการขนถ่ายสินค้า (ตัน/ชม.)', 'อัตราการใช้น้ำมัน (ลิตร/ตัน)'].map((item, index) => (
                        <Box key={index}>
                            <Typography className='flex justify-center'>{item}</Typography>
                        </Box>
                    ))}
                </Box>
                {data.map((node, index) => (
                    <TreeTableNode
                        key={index}
                        FTS_name={node.FTS_name}
                        work_rate={node.work_rate}
                        consumption_rate={node.consumption_rate}
                        result={node.result}
                    />
                ))}
            </CardContent>
        </Card>
    );
}