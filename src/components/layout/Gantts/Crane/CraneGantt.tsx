import { Chart } from "react-google-charts"
import { useSelector } from "react-redux"
import { Typography } from "@mui/material"
import { Solution_schedule, sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice"
import dayjs from 'dayjs'
import { orderSelector } from "../../../../store/slices/Order/orderSlice"
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

    let data = [SolutionscheduleReducer.chars[0]]
    data = data.concat(SolutionscheduleReducer.chars)
    const result = data.map((item) => {
        if (item.arrivaltime && item.exittime) {
            // const formattedStartDate = dayjs(item.arrivaltime, "M/D/YYYY h:mm:ss A").toDate()
            // const formattedEndDate = dayjs(item.exittime, "M/D/YYYY h:mm:ss A").toDate()

            return [
                item.carrier_name,
                item.FTS_name,
                Custom(item),
                new Date(item.arrivaltime),
                new Date(item.exittime)
            ]
        }
    })
    const config: any = [
        'Task',
        'Task',
        { type: 'string', role: 'tooltip', p: { html: true } },
        'Start Date',
        'End Date',
    ]

    result[0] = config

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


function Custom(data: Solution_schedule) {
    const ordersReducer = useSelector(orderSelector)
    const startDate = ordersReducer.result.find(o => o.or_id === data.order_id)?.arrival_time
    const endDate = ordersReducer.result.find(o => o.or_id === data.order_id)?.deadline_time


    return (
        `<div class='flex flex-col gap-2 w-46 p-3'>
        <div>
            <span class='text-md'>ทุ่น </span>
            <span class='text-md'>${data.FTS_name}</span>
        </div>
        <div>
            <span class='text-md'>ชื่อเรือ </span>
            <span class='text-md'>${data.carrier_name}</span>
        </div>
        <div>
            <span class='text-md'>เวลาเรือมาถึง </span>
            <span class='text-md'>${startDate}</span>
        </div>
        <div>
            <span class='text-md'>เวลาเรือออก </span>
            <span class='text-md'>${endDate}</span>
        </div>
        <div>
            <span class='text-md'>เวลาทุ่นมาถึงเรือ </span>
            <span class='text-md'>${data.arrivaltime}</span>
        </div>
        <div>
            <span class='text-md'>เวลาทุ่นออกจากเรือ </span>
            <span class='text-md'>${data.exittime}</span>
        </div>
    </div>`
    )
}