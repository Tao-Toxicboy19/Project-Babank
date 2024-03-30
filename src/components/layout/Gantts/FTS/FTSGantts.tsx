import { Chart } from "react-google-charts";
import { parse, format } from 'date-fns';
import { useSelector } from "react-redux";
import { sulutionScheduelSelector } from "../../../../store/slices/Solution/sollutionScheduleSlice";

export default function FTSGantts() {
  const SolutionscheduleReducer = useSelector(sulutionScheduelSelector)

  const filteredData = (SolutionscheduleReducer.result).filter((item) => item.carrier_name !== null);
  let data = [filteredData[0]]
  data = data.concat(filteredData)
  const result = data.map((item) => {
    // Check if 'arrivaltime' and 'exittime' properties exist before accessing them
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
  });



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
