import { Button, TextField } from "@mui/material"
import { Field, Form, Formik, FormikProps } from "formik"

type Props = {}

export interface Orders {
  or_id: number;
  cr_id: number;
  category: string;
  arrival_time: string;
  deadline_time: string;
  latitude: number;
  longitude: number;
  maxFTS: number;
  penalty_rate: number;
  reward_rate: number;
  carrier: Carrier;
  cargo_order: CargoOrder[];
}

export interface CargoOrder {
  order_id: number;
  cargo_id: number;
  load: number;
  bulk: number;
  cargo: Cargo;
}

export interface Cargo {
  cargo_id: number;
  cargo_name: string;
}

export interface Carrier {
  cr_id: number;
  carrier_name: string;
  holder: string;
  maxcapacity: number;
  burden: number;
}


export default function OrderCreatePage({ }: Props) {

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log(values)
      setSubmitting(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างรายการ Cargo Crane:', error);
    }
  };


  const showForm = ({ isSubmitting }: FormikProps<Orders>) => {
    return (
      <Form>
        <Field
          component={TextField}
          type="number"
          label="Number"
          name="longitude"
          fullWidth
        />
        <Button type="submit">submit</Button>
      </Form>
    )
  }

  const initialValues = {
    cr_id: 0,
    category: '',
    arrival_time: '',
    deadline_time: '',
    latitude: 0,
    longitude: 0,
    maxFTS: 0,
    penalty_rate: 0,
    reward_rate: 0,
    cargo_order: [
      {
        cargo_id: 0,
        load: 0,
        bulk: 0,
        cargo: {
          cargo_id: 0,
          cargo_name: '',
        },
      },
    ],
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(props: any) => showForm(props)}
      </Formik>
    </div>
  )
}