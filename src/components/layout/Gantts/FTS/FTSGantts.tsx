import { Chart } from "react-google-charts";
import { parse, format } from 'date-fns';
import { useSelector } from "react-redux";
import { sulutionScheduelAsync, sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice";
import { useEffect } from "react";
import { planSelector } from "../../../../store/slices/planSlicec";
import { useAppDispatch } from "../../../../store/store";
import { Typography } from "@mui/material";

export default function FTSGantts() {
  const SolutionscheduleReducer = useSelector(sulutionScheduelSelector)
  const dispatch = useAppDispatch()
  const planReducer = useSelector(planSelector)

  useEffect(() => {
    dispatch(sulutionScheduelAsync(planReducer.plan))
  }, [planReducer.plan])

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
      const parsedStartDate = parse(item.arrivaltime, "M/d/yyyy, h:mm:ss a", new Date());
      const parsedEndDate = parse(item.exittime, "M/d/yyyy, h:mm:ss a", new Date());

      const formattedStartDate = format(parsedStartDate, "yyyy, M, d, HH:mm:ss");
      const formattedEndDate = format(parsedEndDate, "yyyy, M, d, HH:mm:ss");

      return [
        item.FTS_name,
        item.carrier_name,
        new Date(formattedStartDate),
        new Date(formattedEndDate),
      ]
    }
  })

  return (
    <>
      <div>
        <Chart
          chartType="Timeline"
          data={result}
          width="100%"
          height="800px"
          options={{}}
          graph_id="TimelineChart"
        />
      </div>
    </>
  );
}
