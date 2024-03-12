import { Chart } from "react-google-charts";
import { parse, format } from 'date-fns';
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CraneGantts() {
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector);
    const rolesReducer = useSelector(roleSelector);
    const [open, setOpen] = React.useState(false);
    const [selectedShipName, setSelectedShipName] = React.useState("");
    const [dates, setDates] = React.useState()
    const [endDate, setEndDate] = React.useState();

    const handleClickOpen = (shipName: string, startDate: any, endDate: any) => {
        setSelectedShipName(shipName)
        setDates(startDate.toISOString().substring(0, 16))
        setEndDate(endDate.toISOString().substring(0, 16))
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredSolutionScheduleReducer = (solutionScheduleReducer.result).filter((group) => group.solution_id === rolesReducer.result?.group);

    if (filteredSolutionScheduleReducer.length === 0) {
        return (
            <Typography
                sx={{
                    mr: 2,
                    fontSize: 33,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
                className='text-cyan-800 flex justify-center items-center'
                variant='h4'
                component='h2'
            >
                ไม่มีข้อมูล
            </Typography>
        )
    }

    const filteredData = (filteredSolutionScheduleReducer).filter((item: any) => item.carrier_name !== null);
    let data = [filteredData[0]]
    data = data.concat(filteredData)

    const datav2 = data.map((item: any) => {
        const parsedStartDate = parse(item.arrivaltime, "M/d/yyyy, h:mm:ss a", new Date());
        const parsedEndDate = parse(item.exittime, "M/d/yyyy, h:mm:ss a", new Date());

        const formattedStartDate = format(parsedStartDate, "yyyy, M, d HH:mm:ss");
        const formattedEndDate = format(parsedEndDate, "yyyy, M, d HH:mm:ss");

        return [
            item.carrier_name,
            item.FTS_name,
            new Date(formattedStartDate),
            new Date(formattedEndDate),
        ];
    });

    const handleChartClick = ({ chartWrapper }: any) => {
        const selection = chartWrapper.getChart().getSelection();
        if (selection.length === 1) {
            const rowIndex = selection[0].row;
            const selectedCarrierName = datav2[rowIndex + 1][0];
            const selectedStartDate = datav2[rowIndex + 1][2];
            const selectedEndDate = datav2[rowIndex + 1][3]
            // console.log(datav2[rowIndex + 1][2])
            // console.log(datav2[rowIndex + 1][2])
            // console.log()
            handleClickOpen(selectedCarrierName, selectedStartDate, selectedEndDate)
        }
    }


    return (
        <>
            <div>
                <Chart
                    chartType="Timeline"
                    data={datav2}
                    width="100%"
                    height="800px"
                    chartEvents={[
                        {
                            eventName: "select",
                            callback: handleChartClick,
                        },
                    ]}
                />
            </div>
            <FormDialog open={open} handleClose={handleClose} selectedShipName={selectedShipName} dates={dates} endDate={endDate} />
        </>
    );
}

// FormDialog component
function FormDialog({ open, handleClose, selectedShipName, dates, endDate }: { open: boolean, handleClose: () => void, selectedShipName: string, dates: any, endDate: any }) {
    // const formattedDefaultDate = dates.toISOString().substring(0, 16); // แปลงวันที่เป็นรูปแบบ YYYY-MM-DDTHH:mm
    // const formattedDefaultDate = กฟ.toISOString().substring(0, 10); // แปลงวันที่เป็นรูปแบบ YYYY-MM-DD

    // console.log(formattedDefaultDate)

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{selectedShipName}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to updates for this ship, please enter your email address here. We will send updates occasionally.
                    </DialogContentText> */}
                    {/* <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="เลือกเรือที่จะย้ายไป"
                        type="email"
                        fullWidth
                        variant="standard"
                    /> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">เลือกเรือ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id={`carrier-select-label`}
                            label="เลือกสินค้า"
                            name="carrier-select"
                        >
                            {/* {(cargoReducer.result).map((items) => (
                                <MenuItem key={items.cargo_id} value={items.cargo_id} className='font-kanit'>
                                    {items.cargo_name}
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="startDate"
                        type='datetime-local'
                        fullWidth
                        variant="standard"
                        defaultValue={dates}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="endDate"
                        type='datetime-local'
                        fullWidth
                        variant="standard"
                        defaultValue={endDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}