import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import Checkboxs from './Checkbox/Checkboxs';
import { useSelector } from 'react-redux';
import { planSelector, setPlans } from '../../../store/slices/planSlicec';
import { useAppDispatch } from '../../../store/store';

export default function DialogLoading({ plan }: { plan: string }) {
  const [open, setOpen] = React.useState(false);
  const planReducer = useSelector(planSelector)
  const dispatch = useAppDispatch()

  const handleCloseV2 = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box className='flex gap-x-5'>
        <Box>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}>
            {plan === "Customize" ? "ดูแผน" : "จัดเเผนการย้ายทุ่น"}
          </Button>
        </Box>
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
          <Box className='mx-20'>
            {plan === "Customize" ? (
              <Box
                className="grid grid-cols-4 gap-5"
              >
                {planReducer.planAi.map((plan) => (
                  <Button
                    onClick={() => {
                      handleCloseV2()
                      dispatch(setPlans(plan.id))
                    }}
                    disabled={planReducer.plan === plan.id}
                    key={plan.id}
                    variant='outlined'
                  >
                    {plan.plan_name}
                  </Button>
                ))}
              </Box>
            ) : (
              <Checkboxs handleCloseV2={handleCloseV2} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  );
}