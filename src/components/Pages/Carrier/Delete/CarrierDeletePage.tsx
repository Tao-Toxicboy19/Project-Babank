import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { deleteCarrier } from '../../../../store/slices/carrier.slice';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { deleteCarrier } from '../../../../store/slices/carrier.slice';

export default function CarrierDeletePage({ id }: any) {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState(false);

  const handleDeleteConfirm = () => {
    dispatch(deleteCarrier(id, setOpen))
  }

  return (
    <>
      <Tooltip title="ลบ">
        <IconButton
          onClick={() => setOpen(true)}
        >
          <DeleteForever className='text-red-800' />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='flex justify-center'>
          {`ต้องการลบทุ่น ?`}
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