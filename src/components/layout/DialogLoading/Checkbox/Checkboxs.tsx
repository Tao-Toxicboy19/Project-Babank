import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ManagePlans } from '../../../../store/slices/managePlansSlice';
import LoadingTest from './loading/LoadinTest';

type Props = {
    handleCloseV2: any
}

export default function Checkboxs({ handleCloseV2 }: Props) {
    const {
        register,
        handleSubmit,
        formState: { },
        setValue, // เพิ่ม setValue
    } = useForm();
    const [selectAll, setSelectAll] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch<any>();
    const FTSReducer = useSelector((state: RootState) => state.FTS)
    const orderRucer = useSelector((state: RootState) => state.order)
    const orderRucerV2 = (orderRucer.orders).filter((order) => order.status_order !== "Approved");

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        (FTSReducer.FTS).forEach((item) => {
            setValue(`FTS-${item.fts_id}`, !selectAll);
        });

        orderRucerV2.forEach((item) => {
            setValue(`Carrier-${item.carrier.cr_id}`, !selectAll);
        });
    };

    const onSubmit = (formData: any) => {
        const fts = (FTSReducer.FTS)
            .filter((item) => formData[`FTS-${item.fts_id}`])
            .map((item) => ({
                fts_id: item.fts_id,
                // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการในออบเจ็กต์นี้
            }));

        const order = orderRucerV2
            .filter((item) => formData[`Carrier-${item.carrier.cr_id}`])
            .map((item) => ({
                cr_id: item.carrier.cr_id,
                // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการในออบเจ็กต์นี้
            }));
        console.log(formData)
        dispatch(ManagePlans(fts, order, handleClickOpen, handleClose, handleCloseV2, formData.computetime))
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
        >

            <Box className='flex justify-between'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                    }
                    label="เลือกทั้งหมด"
                />
                <Button variant='outlined' type="submit">จัดการแผน</Button>
            </Box>
            <Box className='grid grid-cols-3'>

                <Box className='border-1'>
                    {orderRucerV2.map((item) => (
                        <Box key={item.cr_id}>
                            {(!selectAll) ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={selectAll}
                                            {...register(`Carrier-${item.carrier.cr_id}`)}
                                        />
                                    }
                                    label={item.carrier.carrier_name}
                                />
                            ) : (
                                <>
                                    <Box></Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={selectAll}
                                                {...register(`Carrier-${item.carrier.cr_id}`)}
                                                onChange={(e) => {
                                                    if (selectAll) {
                                                        setValue(`Carrier-${item.carrier.cr_id}`, e.target.checked);
                                                    }
                                                }}
                                            />
                                        }
                                        label={item.carrier.carrier_name}
                                    />
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
                <Box>
                    {(FTSReducer.FTS).map((item) => (
                        <Box key={item.fts_id}>
                            {(!selectAll) ? (
                                <>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={selectAll}
                                                {...register(`FTS-${item.fts_id}`)}
                                            />
                                        }
                                        label={item.FTS_name}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box></Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={selectAll}
                                                {...register(`example-${item.fts_id}`)}
                                                onChange={(e) => {
                                                    if (selectAll) {
                                                        setValue(`FTS-${item.fts_id}`, e.target.checked);
                                                    }
                                                }}
                                            />
                                        }
                                        label={item.FTS_name}
                                    />
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
                <Box className='p-2 px-5'>
                    <TextField
                        type='number'
                        label='เวลาประมวณผล (นาที)'
                        fullWidth
                        {...register('computetime')}
                    />
                </Box>
            </Box>
            <LoadingTest open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </form>
    );
}
