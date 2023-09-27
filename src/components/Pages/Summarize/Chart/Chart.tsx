import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
// import { labels } from '../../../../Constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = [
    'รายรับจากรางวัล',
    'เวลารวมเสร็จหลังกำหนด',
    'เวลารวมเสร็จก่อนกำหนด',
    'ค่าเชื้อเพลิงรวมขนถ่าย',
    'ค่าเชื้อเพลิงรวมเคลื่อยย้าย',
    'ระยะรวมทางเคลื่อนย้าย',
    'เวลารวมดำเนินการขนถ่าย',
    'เวลารวมเตรียมความพร้อม'
];

export function Charts() {
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2);

    const data = {
        labels,
        datasets: [
            {
                data: [
                    (CraneSolutionSlice.result)?.total_reward,
                    (CraneSolutionSlice.result)?.total_late_time,
                    (CraneSolutionSlice.result)?.total_early_time,
                    (CraneSolutionSlice.result)?.total_operation_consumption_cost,
                    (CraneSolutionSlice.result)?.total_consumption_cost,
                    (CraneSolutionSlice.result)?.total_preparation_crane_time,
                    (CraneSolutionSlice.result)?.total_operation_time,
                    ((CraneSolutionSlice.result)?.total_preparation_crane_time || 0) + ((FtsSolutionV2Slice.result)?.total_preparation_FTS_time || 0),
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
}