import { Alert, Box, Button, Card, CardContent, TextField } from "@mui/material"
import { FormikProps, Field, Formik, Form, ErrorMessage } from "formik"
import { btnColor } from "../../../../style/Styles"
import { FTS } from "../../../../types/FloatingCrane.type"
import { useDispatch } from "react-redux"
import { addFTS, setInsertFTS } from "../../../../store/slices/FTS.slice"
import { useNavigate } from "react-router-dom"

type Props = {}

export default function FTSCreatePage({ }: Props) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate()

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(addFTS(values, navigate))
    dispatch(setInsertFTS(values))
    setSubmitting(false);
  };

  const initialValues: FTS = {
    FTS_name: '',
    lat: 0,
    lng: 0,
    setuptime_FTS: 0,
    speed: 0,
  }


  const validateForm = (values: FTS) => {
    let errors: any = {}
    if (!values.FTS_name) errors.FTS_name = 'กรุณาใส่อีเมล'
    if (values.lat >= 0) errors.lat = 'กรุณาใส่รหัสผ่าน'
    if (values.lng >= 0) errors.lng = 'กรุณาใส่รหัสผ่าน'
    if (values.setuptime_FTS >= 0) errors.setuptime_FTS = 'กรุณาใส่รหัสผ่าน'
    if (values.speed >= 0) errors.speed = 'กรุณาใส่รหัสผ่าน'
    return errors
  };

  const showForm = ({ isSubmitting }: FormikProps<FTS>) => {
    return (
      <Form>
        <Box className='grid grid-cols-2 gap-3 m-3'>
          <TextField
            name='FTS_name'
            type='text'
            label='ชื่อ'
            fullWidth
          />
          <TextField
            name='lat'
            type='number'
            label='ละติจูด'
            fullWidth
          />
          <TextField
            name='lng'
            type='number'
            label='ลองจิจูด'
            fullWidth
          />
          <TextField
            name='setuptime_FTS'
            type='number'
            label='เวลาเตรียมความพร้อม (นาที)'
            fullWidth
          />

          <TextField
            name='speed'
            type='number'
            label='ความเร็วการเคลื่อนย้าย (กม./ชม.)'
            fullWidth
          />
        </Box>
        <Box className="flex justify-end gap-x-3 mt-3 mx-1">
          <Button
            variant="outlined"
          >
            Exit
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Form >
    )
  }

  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          {(props) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  )
}