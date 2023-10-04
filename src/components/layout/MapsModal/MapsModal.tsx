import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import RouteMaps from '../RouteMaps/RouteMaps';

type Props = {
    open: boolean
    handleClose: () => void
    FTSsolutionSlice: any
    value: number
}

export default function MapsModal(props: Props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xl"
                fullWidth
                PaperProps={{
                    sx: {
                        height: '1000px', // เปลี่ยนความสูงตามที่คุณต้องการ
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {/* {`เส้นทางของ ${props.FTSsolutionSlice[props.value]?.FTS_name}`} */}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <RouteMaps FTSsolutionSlice={props.FTSsolutionSlice} value={props.value} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>ปิด</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}