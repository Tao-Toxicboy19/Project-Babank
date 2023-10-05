
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarCharts() {
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
          data: [2, 5,  3, 7 ,8 ,9 , 5],
        },
      ]}
      width={750}
      height={380}
    />
  );
}