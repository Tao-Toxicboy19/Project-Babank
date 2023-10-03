import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { labels } from '../../../Constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function Charts() {
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2);

    const datas = [
        (CraneSolutionSlice.result)?.total_reward,
        (CraneSolutionSlice.result)?.total_late_time,
        (CraneSolutionSlice.result)?.total_early_time,
        (CraneSolutionSlice.result)?.total_operation_consumption_cost,
        (CraneSolutionSlice.result)?.total_consumption_cost,
        (CraneSolutionSlice.result)?.total_preparation_crane_time,
        (CraneSolutionSlice.result)?.total_operation_time,
        ((CraneSolutionSlice.result)?.total_preparation_crane_time || 0) + ((FtsSolutionV2Slice.result)?.total_preparation_FTS_time || 0),
    ]

    const data = {
        labels,
        datasets: [
            {
                label: 'สรุป',
                data: datas,
                borderColor: '#3084F1',
                backgroundColor: '#9CC2F5',
            },
        ],
    };

    const options = {

        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'สรุปรายละเอียดต้นทุนรวม',
            },
        },
    };


    return <Bar options={options} data={data} />;
}