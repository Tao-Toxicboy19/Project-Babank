import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import Checkboxs from './Checkbox/Checkboxs';
// import { Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store/store';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function DialogLoading() {
  const [open, setOpen] = React.useState(false);

  const handleCloseV2 = () => {
    setOpen(false);
  };

  // const orderReducer = useSelector((state: RootState) => state.order);

  // const statusOrders = (orderReducer.orders).map((order) => order.status_order);

  // const newerOrders = statusOrders.filter((status) => status === "Newer");

  return (
    <React.Fragment>
      <Box className='flex gap-x-5'>
        <Box>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}>
            จัดเเผนการย้ายทุ่น
          </Button>
        </Box>
        {/* <Box className='mt-2'>
          {!statusOrders ? (
            <span>ข้อมูลอยู่ในแผนทั้งหมดแล้ว</span>
          ) : (
            <>
              <Typography>
                <span className='flex items-center gap-x-2'>
                  <WarningAmberIcon color="error" />
                  มีข้อมูลใหม่ ยังไม่ประมวลผล {newerOrders.length} รายการ
                </span>
              </Typography>
            </>
          )
          }
        </Box > */}
      </Box >
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xl'
      >
        <DialogTitle id="alert-dialog-title">
          {"จัดเเผนการย้ายทุ่น"}
        </DialogTitle>
        <DialogContent>
=            <Box className='mx-20'>
              <Checkboxs handleCloseV2={handleCloseV2} />
            </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  );
}