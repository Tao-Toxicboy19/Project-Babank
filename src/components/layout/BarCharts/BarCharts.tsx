
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarCharts({ FTSsolutionSlice, value }: any) {
  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: [
            'ต้นทุน',
            'รวมค่าเชื้อเพลิง',
            'ค่าแรง',
            'ค่าเชื้อเพลิงขนถ่าย',
            'ค่าปรับ',
            'รางวัล',
            'ค่าเชื้อเพลิงเคลื่อยย้าย',
          ],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [
            FTSsolutionSlice[value].total_cost_sum,
            FTSsolutionSlice[value].total_consumption_cost_sum,
            FTSsolutionSlice[value].total_consumption_cost_sum,
            FTSsolutionSlice[value].total_wage_cost_sum,
            FTSsolutionSlice[value].penality_cost_sum,
            FTSsolutionSlice[value].total_reward_sum,
            50],
        },
      ]}
      width={750}
      height={380}
    />
  );
}