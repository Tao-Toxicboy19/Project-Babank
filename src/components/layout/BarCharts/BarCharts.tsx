
import { BarChart } from '@mui/x-charts/BarChart';
import { labels } from '../../../Constants';

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
            'ค่าปรับ',
            'รางวัล',
            'ค่าเชื้อเพลิงรวมขนถ่าย',
            'ค่าเชื้อเพลิงรวมเคลื่อยย้าย',
          ],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [2, 5,  3, 7 ,8 ,9 , 5],
        },
      ]}
      width={1100}
      height={380}
    />
  );
}