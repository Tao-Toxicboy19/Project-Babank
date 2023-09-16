import { Card, CardContent, Grid, Typography } from '@mui/material';
import TreeTableNode from './TreeTableNode';
import { TreeTableNodeProps } from '../../../../types/FloatingCrane.type';

type Props = {
    data: TreeTableNodeProps[];
}

export default function TreeTable({ data }: Props) {
    return (
        <Card>
            <CardContent>
                <Grid
                    container spacing={1}
                    columns={12}
                    className='border-b-[1px]'
                >
                    <Grid item xs={2} sx={{ marginY: 1 }}>
                        <Typography className='font-bold text-md'>
                            ชื่อทุ่น
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ marginY: 1 }}>
                        <Typography className='font-bold text-md'>
                            ละติจูด
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ marginY: 1 }}>
                        <Typography className='font-bold text-md'>
                            ลองจิจูด
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ marginY: 1 }}>
                        <Typography className='font-bold text-md'>
                            เวลาเตรียมความพร้อม (นาที)
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ marginY: 1 }}>
                        <Typography className='font-bold text-md'>
                            ความเร็วการเคลื่อนย้าย (กม./ชม.)
                        </Typography>
                    </Grid>
                </Grid>
                {data.map((node, index) => (
                    <TreeTableNode
                        key={index}
                        FTS_name={node.FTS_name}
                        lat={node.lat} // ส่งค่า lat
                        lng={node.lng} // ส่งค่า lng
                        setuptime_FTS={node.setuptime_FTS}
                        speed={node.speed}
                        result={node.result}
                    />
                ))}

            </CardContent>
        </Card>
        // <table>
        //     <thead>
        //         <tr>
        //             <th>ชื่อ</th>
        //             <th>เวลาติดตั้ง</th>
        //             <th>ความเร็ว</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         
        //     </tbody>
        // </table>
    );
}