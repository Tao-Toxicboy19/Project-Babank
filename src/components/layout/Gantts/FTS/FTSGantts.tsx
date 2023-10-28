import { Chart } from "react-google-charts";
import { parse, format } from 'date-fns';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

export default function FTSGantts() {
  const SolutionscheduleReducer = useSelector(
    (state: RootState) => state.Solutionschedule.solution_schedule
  );
  const filteredData = SolutionscheduleReducer.filter((item: any) => item.carrier_name !== null);

  const datav2 = filteredData.map((item: any) => {
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
    <Chart
      chartType="Timeline"
      data={datav2}
      width="100%"
      height="800px"
    />
  );
}