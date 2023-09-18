import { Box, Fab, Grid, Tooltip, Typography } from '@mui/material';
import TreeTableNode from './TreeTableNode';
import { TreeTableNodeProps } from '../../../../types/FloatingCrane.type';
import Add from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';


type Props = {
    FTSReducer: TreeTableNodeProps[];
}

export default function TreeTable({ FTSReducer }: Props) {
    return (
        <>
            <Grid
                container spacing={1}
                columns={12}
                className='border-b-[1px]'
            >
                <Grid item xs={12}>
                    <Box className='flex justify-end'>
                        <Tooltip title="เพิ่มทุ่น">
                            <Link to="/transferstation/create">
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    size='small'
                                    className='bg-blue-500 hover:bg-blue-700'
                                >
                                    <Add />
                                </Fab>
                            </Link>
                        </Tooltip>
                    </Box>
                </Grid>
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
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        เวลาเตรียมความพร้อม (นาที)
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md'>
                        ความเร็วการเคลื่อนย้าย (กม./ชม.)
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md flex justify-end mx-5'>
                        แก้ไข
                    </Typography>
                </Grid>
            </Grid>

            {FTSReducer.map((node, index) => (
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
        </>
    );
}