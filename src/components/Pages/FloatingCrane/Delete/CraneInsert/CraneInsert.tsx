import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Tooltip } from '@mui/material'

type Props = {}

export default function CraneInsert({ }: Props) {
    return (
        <Box className={`absolute right-[110px]`}>
            <Tooltip title="เพิ่มทุ่น">
                <Fab
                    color="primary"
                    aria-label="add"
                    size='small'
                    className='bg-blue-500 hover:bg-blue-700'
                    // onClick={handleClickOpen}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    )
}