import { Chart } from "react-google-charts";
import { parse, format } from 'date-fns';
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice";

export default function CraneGantts() {
    const solutionScheduleReducer = useSelector(sulutionScheduelSelector);

    if (solutionScheduleReducer.result.length === 0) {
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

    const filteredData = (solutionScheduleReducer.result).filter((item) => item.carrier_name !== null);
    let data = [filteredData[0]]
    data = data.concat(filteredData)

    const datav2 = data.map((item) => {
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

    return (
        <>
            <div>
                <Chart
                    chartType="Timeline"
                    data={datav2}
                    width="100%"
                    height="800px"
                    options={{}}
                    graph_id="TimelineChart"
                />
            </div>
        </>
    );
}