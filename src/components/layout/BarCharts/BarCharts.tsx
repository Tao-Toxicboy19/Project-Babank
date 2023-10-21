
// import { BarChart } from '@mui/x-charts/BarChart';

// export default function BarCharts({ FTSsolutionSlice, value }: any) {
//   return (
//     <BarChart
//       xAxis={[
//         {
//           id: 'barCategories',
//           data: [
//             'ต้นทุน',
//             'รวมค่าเชื้อเพลิง',
//             'ค่าแรง',
//             'ค่าเชื้อเพลิงขนถ่าย',
//             'ค่าปรับ',
//             'รางวัล',
//             'ค่าเชื้อเพลิงเคลื่อยย้าย',
//           ],
//           scaleType: 'band',
//         },
//       ]}
//       series={[
//         {
//           data: [
//             FTSsolutionSlice[value].total_cost_sum,
//             FTSsolutionSlice[value].total_consumption_cost_sum,
//             FTSsolutionSlice[value].total_consumption_cost_sum,
//             FTSsolutionSlice[value].total_wage_cost_sum,
//             FTSsolutionSlice[value].penality_cost_sum,
//             FTSsolutionSlice[value].total_reward_sum,
//             50],
//         },
//       ]}
//       width={750}
//       height={380}
//     />
//   );
// }
import { Box } from '@mui/material';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = [
  'ต้นทุน',
  'ค่าแรง',
  'ค่าปรับ',
  'รางวัล',
  'ค่าเชื้อเพลิงเคลื่อยย้าย',
];

export function BarCharts({ FTSsolutionSlice, value }: any) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          FTSsolutionSlice[value].solutions.reduce((total: any, solution: any) => total + solution.total_cost, 0),
          FTSsolutionSlice[value].solutions.reduce((total: any, solution: any) => total + solution.total_consumption_cost, 0),
          FTSsolutionSlice[value].solutions.reduce((total: any, solution: any) => total + solution.total_wage_cost, 0),
          FTSsolutionSlice[value].solutions.reduce((total: any, solution: any) => total + solution.penality_cost, 0),
          FTSsolutionSlice[value].solutions.reduce((total: any, solution: any) => total + solution.total_reward, 0),
          50],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Box className='max-h-[550px] w-full'>
      <Bar options={options} data={data} />
    </Box>
  );
}
