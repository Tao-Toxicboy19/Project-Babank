import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCarrier } from '../../../../store/slices/carrier.slice';

export default function CarrierDeletePage({ id, result }: any) {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState(false);

  const handleDeleteConfirm = () => {
    dispatch(deleteCarrier(id))
  }

  return (
    <>
      <Box
        className='bg-purple-400 hover:bg-purple-600 w-10 h-10 flex justify-center items-center rounded-full'
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='flex justify-center'>
          {`ต้องการลบทุ่น ${result} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='flex justify-center'>
            คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้.{id}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='flex justify-center'>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}