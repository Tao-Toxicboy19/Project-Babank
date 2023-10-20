import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Card, CardContent } from "@mui/material";

export default function Gantts() {
    const SolutionscheduleReducer = useSelector(
        (state: RootState) => state.Solutionschedule.solution_schedule
    );

    const tasks: Task[] = SolutionscheduleReducer.map((items) => {
        const arrivalTime = new Date(items.arrivaltime);
        const exitTime = new Date(items.exittime);

        return {
            start: arrivalTime,
            end: exitTime,
            name: items.FTS_name,
            id: `Task ${items.FTS_id}`,
            type: "task",
            progress: 45,
            isDisabled: true,
            styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
        };
    });

    return (
        <>
            <Card>
                <CardContent>
                    <Gantt tasks={tasks} />
                </CardContent>
            </Card>
        </>
    );
}