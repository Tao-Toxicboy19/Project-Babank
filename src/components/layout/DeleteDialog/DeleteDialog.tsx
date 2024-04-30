import DeleteForever from '@mui/icons-material/DeleteForever'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'

type Props = {
    open: boolean
    handleClickOpen: () => void
    handleClose: () => void
    handleDeleteConfirm: () => void
    isSubmitting: boolean
    maxWidth: any
    titles: string
    description: string
    icon?: boolean
}

export default function DeleteDialog(props: Props) {
    return (
        <>
            {props.icon && <Tooltip title="ลบ">
                <IconButton
                    onClick={props.handleClickOpen}
                >
                    <DeleteForever className='text-red-800' />
                </IconButton>
            </Tooltip>}
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={props.maxWidth}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" className='flex justify-center font-kanit'>
                    {props.titles}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='flex justify-center font-kanit'>
                        {props.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex justify-center gap-x-3'>
                    <Button
                        sx={{ minWidth: 150 }}
                        variant="outlined"
                        onClick={props.handleClose}
                        className='font-kanit'
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        sx={{ minWidth: 150 }}
                        variant="contained"
                        className='bg-[#1976D2] hover:bg-[#1563BC] font-kanit'
                        onClick={props.handleDeleteConfirm}
                        disabled={props.isSubmitting}
                        autoFocus
                    >
                        ลบ
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}