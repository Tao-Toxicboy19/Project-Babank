import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { carrier } from "../../../../types/Carrier.type";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Slide,
  TextField,
} from "@mui/material";
import { btnColor } from "../../../../style/Styles";
import { addCarrier, setInsertCarrier } from "../../../../store/slices/carrier.slice";
import AddIcon from '@mui/icons-material/Add';
import { Field, Form, Formik, FormikProps } from "formik";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Page() {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (values: carrier, { setSubmitting }: any) => {
    // dispatch(addCarrier(values, setOpen))
    // dispatch(setInsertCarrier(values))
    alert(JSON.stringify(values))
    // const formData = new FormData();
    // formData.append("carrier_name", values.carrier_name);
    // formData.append("ower", values.ower);
    // formData.append("maxcapacity", String(values.maxcapacity));
    // formData.append("burden", String(values.burden));
    // alert(JSON.stringify(formData))
    setSubmitting(false)
  };

  const handleClose = () => setOpen(false);

  const showForm = ({ isSubmitting }: FormikProps<carrier>) => {
    return (
      <Form>
        <Box className='flex flex-col gap-4'>
          <Field
            component={TextField}
            name='carrier_name'
            type='text'
            label='ชื่อ'
            fullWidth
          />
          <Field
            component={TextField}
            name='ower'
            type='text'
            label='ชื่อบริษัท'
            fullWidth
          />
          <Field
            component={TextField}
            name='maxcapacity'
            type='number'
            label='ความจุสูงสุด (ตัน)'
            fullWidth
          />
          <Field
            component={TextField}
            name='burden'
            type='number'
            label='จำนวนระวาง'
            fullWidth
          />
        </Box>
        <Box className="flex justify-end gap-x-3 mt-3 mx-1">
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Exit
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={btnColor}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Form>
    )
  }
  const initialValues: carrier = {
    cr_id: '',
    carrier_name: '',
    ower: '',
    maxcapacity: 0,
    burden: 0,
  }

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        size='small'
        className='bg-blue-500 hover:bg-blue-700'
        onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{"เพิ่มเรือสินค้า"}</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(props: any) => showForm(props)}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
