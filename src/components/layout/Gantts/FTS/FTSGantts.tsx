import { Chart } from "react-google-charts";
import { parse, format } from 'date-fns';
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { roleSelector } from "../../../../store/slices/auth/rolesSlice";
import { sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice";

export default function FTSGantts() {
  const SolutionscheduleReducer = useSelector(sulutionScheduelSelector)
  const rolesReducer = useSelector(roleSelector)


  const filteredSolutionscheduleReducer = (SolutionscheduleReducer.result).filter((group) => group.solution_id === rolesReducer.result?.group);

  const filteredData = (SolutionscheduleReducer.result).filter((item: any) => item.carrier_name !== null);
  let data = [filteredData[0]]
  data = data.concat(filteredData);
  const datav2 = data.map((item: any) => {
    const parsedStartDate = parse(item.arrivaltime, "M/d/yyyy, h:mm:ss a", new Date());
    const parsedEndDate = parse(item.exittime, "M/d/yyyy, h:mm:ss a", new Date());

    const formattedStartDate = format(parsedStartDate, "yyyy, M, d");
    const formattedEndDate = format(parsedEndDate, "yyyy, M, d");

    return [
      item.FTS_name,
      item.carrier_name,
      new Date(formattedStartDate),
      new Date(formattedEndDate),
    ];
  });

  return (
    <>
      {filteredSolutionscheduleReducer.length === 0 ? (
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
      ) : (
        <>
          {
            datav2.length === 0 ? (
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
            ) : (
              data && (
                <div>
                  <Chart
                    chartType="Timeline"
                    data={datav2}
                    width="100%"
                    height="800px"
                  />
                </div>
              )
            )
          }
        </>
      )}
    </>
  );
}
