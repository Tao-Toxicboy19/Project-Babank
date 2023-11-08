import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

type Props = {}

export default function Checkboxs({ }: Props) {
    const {
        register,
        handleSubmit,
        formState: { },
        setValue, // เพิ่ม setValue
    } = useForm();
    const [selectAll, setSelectAll] = React.useState(false);

    const FTSReducer = useSelector((state: RootState) => state.FTS)


    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        (FTSReducer.FTS).forEach((item) => {
            setValue(`FTS-${item.fts_id}`, !selectAll);
        });
    };

    const onSubmit = (formData: any) => {
        const selectedFTSNames = (FTSReducer.FTS)
            .filter((item) => formData[`FTS-${item.fts_id}`])
            .map((item) => item.fts_id);
        console.log(selectedFTSNames);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
        >
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                }
                label="Select All"
            />

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
                            {/* <>{item.result.map((row) => (
                                <FormControlLabel
                                    key={row.crane_id}
                                    control={
                                        <Checkbox
                                            defaultChecked={selectAll}
                                            {...register(`crane-${row.crane_id}`)}
                                        />
                                    }
                                    label={row.crane_name}
                                />
                            ))}</> */}
                        </>

                    ) : (
                        <>
                            <Box></Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked={selectAll}
                                        {...register(`example-${item.fts_id}`)}
                                    />
                                }
                                label={item.FTS_name}
                            />
                        </>
                    )}
                </Box>
            ))}

            <Button variant='outlined' type="submit">Submit</Button>
        </form>
    );
}
