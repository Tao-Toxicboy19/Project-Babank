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
  'ต้นรวมทุน',
  'ค่าเชื้อเพลิงรวม',
  'ค่าแรง',
  'ค่าปรับล่าช้า',
  'รางวัล',
];

export function BarCharts({ FTSsolutionSlice, value }: any) {
  const data = {
    labels,
    datasets: [
      {
        label: FTSsolutionSlice[value]?.fts.FTS_name,
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
    <Bar options={options} data={data} />
  );
}
