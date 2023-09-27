// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
// import { Field, Form, Formik, FormikProps } from 'formik';
// import { Order } from '../../../../types/Order.type';
// import { json } from 'react-router-dom';
// type Props = {}



// export default function OrderCreatePage({ }: Props) {

//   // const showForm = ({ handleSubmit, handleChange, values, setFieldValue }: FormikProps<Order>) => {

//   //   const handleArrivalTimeChange = (newDate: Date | null) => {
//   //     setFieldValue('arrival_time', newDate); // อัปเดตค่า arrival_time ใน Formik
//   //   };

//   //   const handleDeadlineTimeChange = (newDate: Date | null) => {
//   //     setFieldValue('deadline_time', newDate); // อัปเดตค่า deadline_time ใน Formik
//   //   };

//   //   return (
//   //     <>
//   //       <form onSubmit={handleSubmit}>
//   //         <Box className="m-5">
//   //           <Typography variant='h6'> เพิ่มเรือ </Typography>

//   //           <TextField
//   //             id="carrier_name"
//   //             label="ชื่อเรือ"
//   //             variant="outlined"
//   //             type="text"
//   //             fullWidth
//   //             onChange={handleChange}
//   //             value={values.carrier_name}
//   //           />

//   //           {/* ADD DropDown */}

//   //           <TextField id="outlined-basic" label="สถานะสินค้า (ขาเข้า/ขาออก)" variant="outlined" />

//   //           <TextField
//   //             id="load"
//   //             label="ปริมาณสินค้า (ตัน)"
//   //             variant="outlined"
//   //             type="number"
//   //             fullWidth
//   //             onChange={handleChange}
//   //             value={values.load}
//   //           />

//   //           <TextField
//   //             id="bulk"
//   //             label="จำนวนระวาง"
//   //             variant="outlined"
//   //             type="number"
//   //             fullWidth
//   //             onChange={handleChange}
//   //             value={values.bulk}
//   //           />

//   //           {/* TIME PICKER วัน-เวลา มาถึง / วัน-เวลา สิ้นสุด	 */}

//   //           <Stack direction='row' spacing={1} className="flex justify-between mx-auto">
//   //             <Box className="w-full">
//   //               <Field
//   //                 component={TextField}
//   //                 name='arrival_time'
//   //                 type='datetime-local'
//   //                 fullWidth
//   //               />
//   //               <Field
//   //                 component={TextField}
//   //                 name='deadline_time'
//   //                 type='datetime-local'
//   //                 fullWidth
//   //               />


//   //             </Box>
//   //           </Stack>


//   //           <TextField id="outlined-basic" label="ละติจูด" variant="outlined" />
//   //           <TextField id="outlined-basic" label="ลองจิจูด" variant="outlined" />
//   //           <TextField id="outlined-basic" label="จำนวนทุ่นเข้าสูงสุด	" variant="outlined" />
//   //         </Box>
//   //         <Box className="flex justify-between mt-5">
//   //           <Button fullWidth className="bg-red-500 hover:bg-red-800" variant="contained">ยกเลิก</Button>

//   //           <Button
//   //             fullWidth
//   //             type="submit"
//   //             className="bg-emerald-500 hover:bg-emerald-800"
//   //             variant="contained"
//   //           >
//   //             บันทึก
//   //           </Button>
//   //         </Box>
//   //       </form>
//   //     </>
//   //   )
//   // }

//   const showForm = ({ values, handleChange, isSubmitting }: FormikProps<Order>) => {
//     return (
//       <Form>
//         <Box className='flex flex-col gap-4 m-3'>
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">ชื่อเรือ</InputLabel>
//             <Field
//               as={Select}
//               name='cr_id'
//               label='ชื่อเรือ'
//               value={values.cr_id}
//               onChange={(e: any) => {
//                 handleChange(e);
//                 const selectedCarrier = carrierReducer.find(
//                   (item) => item.cr_id === e.target.value
//                 );
//                 if (selectedCarrier) {
//                   handleChange({
//                     target: {
//                       name: 'carrier_name',
//                       value: selectedCarrier.carrier_name,
//                     },
//                   });
//                 }
//               }}
//               fullWidth
//             >
//               {carrierReducer.map((item: Carrier) => (
//                 <MenuItem key={item.cr_id} value={item.cr_id}>
//                   {item.carrier_name}
//                 </MenuItem>
//               ))}
//             </Field>
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">ชื่อ</InputLabel>
//             <Field
//               as={Select}
//               name='ca_id'
//               label='ชื่อ'
//               value={values.ca_id}
//               onChange={(e: any) => {
//                 handleChange(e);
//                 const selectedCargo = cargoReducer.find(
//                   (item) => item.cargo_id === e.target.value
//                 );
//                 if (selectedCargo) {
//                   handleChange({
//                     target: {
//                       name: 'cargo_name',
//                       value: selectedCargo.cargo_name,
//                     },
//                   });
//                 }
//               }}
//               fullWidth
//             >
//               {cargoReducer.map((item: Cargo) => (
//                 <MenuItem key={item.cargo_id} value={item.cargo_id}>
//                   {item.cargo_name}
//                 </MenuItem>
//               ))}
//             </Field>
//           </FormControl>
//           <Field
//             component={TextField}
//             name='load_status'
//             type='number'
//             label='ปริมาณสินค้า (ตัน)'
//             fullWidth
//           />
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">สถานะสินค้า (ขาเข้า/ขาออก)</InputLabel>
//             <Field
//               as={Select}
//               name='category'
//               label='สถานะสินค้า (ขาเข้า/ขาออก)'
//               value={values.category}
//               onChange={handleChange}
//               fullWidth
//             >
//               <MenuItem value='Import'>Import</MenuItem>
//               <MenuItem value='Export'>Export</MenuItem>
//             </Field>
//           </FormControl>
//           <Field
//             component={TextField}
//             name='arrival_time'
//             type='datetime-local'
//             label='วัน-เวลา มาถึง'
//             fullWidth
//           />
//           <Field
//             component={TextField}
//             name='deadline_time'
//             type='datetime-local'
//             label='วัน-เวลา สิ้นสุด'
//             fullWidth
//           />
//           <Field
//             component={TextField}
//             name='latitude'
//             type='number'
//             label='ละติจูด'
//             fullWidth
//           />
//           <Field
//             component={TextField}
//             name='longitude'
//             type='number'
//             label='ลองจิจูด'
//             fullWidth
//           />
//           <Field
//             component={TextField}
//             name='bulks'
//             type='number'
//             label='จำนวนระวาง'
//             fullWidth
//           />
//           <Field
//             component={TextField}
//             name='maxFTS'
//             type='number'
//             label='จำนวนทุ่นเข้าสูงสุด'
//             fullWidth
//           />
//         </Box>
//         <Box className="flex justify-end gap-x-3 mt-3 mx-1">
//           <Button
//             variant="outlined"
//             onClick={() => setOpen(false)}
//           >
//             Exit
//           </Button>
//           <Button
//             variant="contained"
//             type="submit"
//             style={btnColor}
//             disabled={isSubmitting}
//           >
//             Save
//           </Button>
//         </Box>
//       </Form>
//     )
//   }

//   const initialValues: Order = {
//     or_id: 0,
//     carrier_name: "",
//     category: "",
//     cargo_name: "",
//     load: 0,
//     bulk: 0,
//     arrival_time: 0,
//     deadline_time: 0,
//     latitude: 0,
//     longitude: 0,
//     maxFTS: 0
//   };


//   return (
//     <>
//       <Card className="max-w-[750px] mx-auto">
//         <CardContent>
//           <Formik initialValues={initialValues} onSubmit={(values: {}) => {
//             alert(JSON.stringify(values))
//           }}>
//             {(props: any) => showForm(props)}
//           </Formik>
//         </CardContent>
//       </Card>
//     </>
//   )
// }

type Props = {}

export default function OrderCreatePage({ }: Props) {
  return (
    <div>OrderCreatePage</div>
  )
}