import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Card, CardContent } from "@mui/material";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function Gantts() {
  const SolutionscheduleReducer = useSelector(
    (state: RootState) => state.Solutionschedule.solution_schedule
  );



  const filteredSolutionschedule = SolutionscheduleReducer.filter((item) => {
    return item.operation_time !== null;
  });

  const tasks: Task[] = filteredSolutionschedule.map((items) => {
    const arrivalTime = new Date(items.arrivaltime);
    const exitTime = new Date(items.exittime);

    return {
      start: arrivalTime,
      end: exitTime,
      name: items.FTS_name,
      id: `Task ${items.FTS_id}`,
      type: "task",
      progress: 100,
      isDisabled: true,
    };
  });

  return (
    <>
      <Card>
        <CardContent>
          <Gantt
            viewMode={ViewMode.Week}
            listCellWidth=""
            tasks={tasks}
            headerHeight={50}
            rowHeight={50}
            columnWidth={103}
            barCornerRadius={1}
            handleWidth={10}
            fontFamily="kanit"
            fontSize="16px"
            barProgressColor="#4CAF50"
          />
        </CardContent>
      </Card>
    </>
  );
}