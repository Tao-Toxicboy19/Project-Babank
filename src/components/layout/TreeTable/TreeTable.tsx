import { Box, Fab, Grid, Tooltip, Typography } from '@mui/material';
import TreeTableNode from './TreeTableNode';
import Add from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export default function TreeTable({ FTSReducer }: any) {
    const rolesReducer = useSelector((state: RootState) => state.rolesReducer);
    const columns = rolesReducer.result && rolesReducer.result.role === 'Viewer'
        ? 10
        : 12;
    return (
        <>
            <Box className="justify-between flex">
                <Box className="flex items-center">
                    <Typography className="text-xl font-kanit">
                        ข้อมูลทุ่นและเครน
                    </Typography>
                </Box>

                <Box className='flex justify-end'>
                    {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                        <></>
                    ) : (
                        <Tooltip title="เพิ่มทุ่น">
                            <Fab
                                component={Link}
                                to="/transferstation/create"
                                color="primary"
                                aria-label="add"
                                size='small'
                                className='bg-blue-500 hover:bg-blue-700'
                            >
                                <Add />
                            </Fab>
                        </Tooltip>
                    )}
                </Box>
            </Box >
            <Grid
                container spacing={1}
                columns={columns}
                className='border-b-[1px] bg-[#1976D2] mt-5 text-[#FFF] rounded-lg'
            >
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md font-kanit'>
                        ชื่อทุ่น
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md font-kanit'>
                        ละติจูด
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md font-kanit'>
                        ลองจิจูด
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md font-kanit'>
                        เวลาเตรียมความพร้อม (นาที)
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    <Typography className='font-bold text-md font-kanit'>
                        ความเร็วการเคลื่อนย้าย (กม./ชม.)
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginY: 1 }}>
                    {rolesReducer.result && rolesReducer.result.role === 'Viewer' ? (
                        <></>
                    ) : (
                        <Typography className='font-bold text-md font-kanit flex justify-end mx-5'>
                            แก้ไข
                        </Typography>
                    )}
                </Grid>
            </Grid>

            {
                FTSReducer.map((node: any, index: any) => (
                    <TreeTableNode
                        key={index}
                        fts_id={node.fts_id}
                        FTS_name={node.FTS_name}
                        lat={node.lat}
                        lng={node.lng}
                        setuptime_FTS={node.setuptime_FTS}
                        speed={node.speed}
                        result={node.result}
                    />
                ))
            }
        </>
    );
}