import { Box, Typography, CardContent, FormControl, InputLabel, Button, Card, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { httpClient } from '../../../utils/httpclient'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';
import { craneSelector } from '../../../store/slices/Crane/craneSlice';
import { orderSelector } from '../../../store/slices/Order/orderSlice';
import { sulutionScheduelSelector } from '../../../store/slices/Solution/sollutionScheduleSlice';

type Props = {}

export default function StatusFTSPage({ }: Props) {
    const [selectedButtons, setSelectedButtons] = useState<any>([]);
    const solution_scheduleReducer = useSelector(sulutionScheduelSelector)
    const rolesReducer = useSelector(roleSelector)
    const OrderReducer = useSelector(orderSelector);
    const craneReducer = useSelector(craneSelector)
    const findCrane = (craneReducer.result).filter(crane => crane.FTS_id === rolesReducer.result?.ftsId)

    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm();


    const findSolution = (solution_scheduleReducer.result).filter((fts) => fts.FTS_id === rolesReducer.result?.ftsId)
    const findSolution2 = (findSolution).filter((fts) => fts.carrier_name !== null)
    return (
        <Box className="flex flex-col gap-3">
            {(findSolution2).map((rows, index) => {
                const findCarrier = (OrderReducer.result).filter((items) => items.cr_id === findSolution2[index].carrier_id)
                return (
                    <>
                        {findCarrier[0].cargo_order.map((item, index) => (
                            <React.Fragment key={index}>
                                <Box className="mx-auto ">
                                    <Typography
                                        sx={{
                                            mr: 2,
                                            fontSize: 20,
                                            fontFamily: "monospace",
                                            fontWeight: 700,
                                            letterSpacing: ".1rem",
                                            color: "inherit",
                                            textDecoration: "none",
                                        }}
                                        className='text-blue-900 bg-white p-3 rounded-lg'
                                    >
                                        {rows.carrier_name}
                                    </Typography>
                                </Box>
                                {Array.from({ length: item.bulk }).map((_, subIndex) => (
                                    <React.Fragment key={subIndex}>
                                        <Card>
                                            <CardContent>
                                                <form
                                                    onSubmit={handleSubmit((data) => {
                                                        const values = {
                                                            ...data,
                                                            bulk: subIndex + 1,
                                                            FTS_id: rolesReducer.result?.ftsId,
                                                            order_id: item.order_id,
                                                            group: rolesReducer.result?.group
                                                        }
                                                        console.log(values)
                                                        httpClient.patch('update-statusFTS-order', values)
                                                            .then((res) => console.log(res.data))
                                                            .catch((err) => console.log(err))
                                                    })}
                                                    className="flex flex-row gap-3 w-full"
                                                >
                                                    <Box className="w-2/4">
                                                        <Typography className='flex justify-center h-auto items-center my-auto'>
                                                            ระวางที่ {subIndex + 1}
                                                        </Typography>
                                                        <Box className='flex flex-col gap-y-3'>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">เลือกเครน</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="เลือกเครน"
                                                                    {...register('craneId')}
                                                                >
                                                                    {findCrane.map((value) => (
                                                                        <MenuItem
                                                                            key={value.id}
                                                                            value={value.id}
                                                                        >
                                                                            {value.crane_name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex flex-col justify-end gap-5 w-2/4">
                                                        <Button
                                                            variant='outlined'
                                                            className='font-kanit'
                                                            onClick={() => {
                                                                const isSelected = selectedButtons.includes(subIndex + 1);

                                                                if (isSelected) {
                                                                    setSelectedButtons(selectedButtons.filter((btn: any) => btn !== subIndex + 1));
                                                                } else {
                                                                    setSelectedButtons([...selectedButtons, subIndex + 1]);
                                                                }
                                                            }}
                                                        >
                                                            {selectedButtons.includes(subIndex + 1) ? "หยุดงาน" : "เริ่มงาน"}
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            type='submit'
                                                            className='bg-[#66BB6A] hover:bg-[#1B5E20] font-kanit text-white'
                                                        >
                                                            เสร็จงาน
                                                        </Button>
                                                    </Box>
                                                </form>
                                            </CardContent>
                                        </Card>

                                    </React.Fragment>
                                ))}
                                <hr />
                                {/* </Card> */}
                            </React.Fragment>
                        ))}
                    </>
                )
            })}
        </Box>
    )
}