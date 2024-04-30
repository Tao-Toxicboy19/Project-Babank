import { Chart } from "react-google-charts"
import { useSelector } from "react-redux"
import { Typography } from "@mui/material"
import { sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice"
import dayjs from 'dayjs'
dayjs.locale('th')

export default function CraneGantts() {
    const SolutionscheduleReducer = useSelector(sulutionScheduelSelector)
    // const dispatch = useAppDispatch()
    // const planReducer = useSelector(planSelector)

    // useEffect(() => {
    //     dispatch(sulutionScheduelAsync(planReducer.plan))
    // }, [planReducer.plan])

    if (SolutionscheduleReducer.result.length === 0) {
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


    // let data = [solutionScheduleReducer.chars[0]]
    // data = data.concat(solutionScheduleReducer.chars)
    // const datav2 = data.map((item) => {
    //     const parsedStartDate = parse(item.arrivaltime, "M/d/yyyy, h:mm:ss a", new Date())
    //     const parsedEndDate = parse(item.exittime, "M/d/yyyy, h:mm:ss a", new Date())

    //     const formattedStartDate = format(parsedStartDate, "yyyy, M, d HH:mm:ss")
    //     const formattedEndDate = format(parsedEndDate, "yyyy, M, d HH:mm:ss")

    //     return [
    //         item.carrier_name,
    //         item.FTS_name,
    //         new Date(formattedStartDate),
    //         new Date(formattedEndDate),
    //     ]
    // })
    let data = [SolutionscheduleReducer.chars[0]]
    data = data.concat(SolutionscheduleReducer.chars)
    const result = data.map((item) => {
        if (item.arrivaltime && item.exittime) {
            // const formattedStartDate = dayjs(item.arrivaltime, "M/D/YYYY h:mm:ss A").toDate()
            // const formattedEndDate = dayjs(item.exittime, "M/D/YYYY h:mm:ss A").toDate()

            return [
                item.carrier_name,
                item.FTS_name,
                new Date(item.arrivaltime),
                new Date(item.exittime)
            ]
        }
    })

    // console.log(result)

    return (
        <>
            <Chart
                chartType="Timeline"
                data={result}
                width="100%"
                height="800px"
                options={{}}
                graph_id="TimelineChart"
            />
        </>
    )
}

