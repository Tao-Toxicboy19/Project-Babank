import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Stack, TextField } from '@mui/material'
import Checkboxs from './Checkbox/Checkboxs'
import { useSelector } from 'react-redux'
import { planSelector, setPlans } from '../../../store/slices/planSlicec'
import { useAppDispatch } from '../../../store/store'
import { useForm } from 'react-hook-form'
import { AddPlan } from '../../Pages/SummarizePage/SummarizePage'

export default function DialogLoading({ plan }: { plan: string }) {
  const [open, setOpen] = React.useState(false)
  const planReducer = useSelector(planSelector)
  const dispatch = useAppDispatch()
  const [open2, setOpen2] = React.useState(false)
  const [planName, setPlanName] = React.useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleCloseV2 = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Box className='flex gap-x-5'>
        <Box>
          {plan !== "Customize" && <Button
            variant="outlined"
            onClick={() => setOpen(true)}>
            {"จัดเเผนการย้ายทุ่น"}
          </Button>
          }
          {planReducer.planUser.length !== 0 && plan === 'Customize' && (
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              {"การปรับแก้แผนเอง"}
            </Button>
          )}
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
          {plan === "Customize" ? "จัดเเผนการย้ายทุ่น" : "การปรับแก้แผนเอง"}
        </DialogTitle>
        <DialogContent>
          <Box className='mx-20'>
            {plan === "Customize" ? (
              <Box className='mt-2'>
                <Stack
                  onSubmit={handleSubmit((data) => {
                    setPlanName(data.plan_name)
                    setOpen2(true)
                  })}
                  component='form'
                  direction='column'
                  spacing={2}
                >
                  <TextField
                    id='plan_name'
                    type='text'
                    label='ชื่อแผนใหม่'
                    fullWidth
                    size='small'
                    className='font-kanit'
                    error={errors.plan_name && true}
                    helperText={errors.plan_name && "กรอกชื่อแผน"}
                    {...register('plan_name', { required: true })}
                  />
                  <Box
                    className='grid grid-cols-4 gap-2 mt-2'
                  >
                    {planReducer.planAi.map((plan) => (
                      <Button
                        key={plan.id}

                        variant='outlined'
                        disabled={planReducer.plan === plan.id}
                        onClick={() => dispatch(setPlans(plan.id))}
                      >
                        {plan.plan_name}
                      </Button>
                    ))}
                  </Box>
                  <Box className='w-full flex justify-end'>
                    <Button
                      type='submit'
                      className='w-24 bg-blue-500'
                      size='small'
                      variant='contained'
                    >
                      ปรับแผน
                    </Button>
                  </Box>
                  <AddPlan open={open2} handleClose={() => setOpen(false)} planName={planName} setOpen2={setOpen2} setOpen={setOpen} />
                </Stack>
              </Box>
            ) : (
              <Checkboxs handleCloseV2={handleCloseV2} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  )
}