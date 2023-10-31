import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


export default function TimeList({ }: any) {
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution.result);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2.result);
    const result = CraneSolutionSlice.total_preparation_crane_time + FtsSolutionV2Slice.total_preparation_FTS_time

    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='รวมวลาเสร็จหลังกำหนด'
                price={CraneSolutionSlice.total_late_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
            <ListMenu
                title='รวมวลาเสร็จก่อนกำหนด'
                price={CraneSolutionSlice.total_early_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
            <ListMenu
                title='รวมระยะทางเคลื่อนย้าย'
                price={result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='กิโลเมตร'
            />
            <ListMenu
                title='รวมเวลาดำเนินการขนย้าย'
                price={CraneSolutionSlice.total_operation_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
            <ListMenu
                title='รวมเวลาเตรียมความพร้อม'
                price={CraneSolutionSlice.total_operation_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
        </ul >
    )
}