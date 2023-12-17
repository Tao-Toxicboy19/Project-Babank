import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { craneSolutionSelector } from '../../../store/slices/Solution/craneSolutionSlice';
import { ftsSolutionV2Selector } from '../../../store/slices/Solution/ftsSolutionV2Slice';


export default function TimeList({ }: any) {
    const CraneSolutionSlice = useSelector(craneSolutionSelector)
    const FtsSolutionV2Slice = useSelector(ftsSolutionV2Selector)
    const result = (CraneSolutionSlice.result).total_preparation_crane_time + (FtsSolutionV2Slice.result).total_preparation_FTS_time

    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='รวมวลาเสร็จหลังกำหนด'
                price={(CraneSolutionSlice.result).total_late_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
            <ListMenu
                title='รวมวลาเสร็จก่อนกำหนด'
                price={(CraneSolutionSlice.result).total_early_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
            <ListMenu
                title='รวมระยะทางเคลื่อนย้าย'
                price={result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='กิโลเมตร'
            />
            <ListMenu
                title='รวมเวลาดำเนินการขนย้าย'
                price={(CraneSolutionSlice.result).total_operation_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
            <ListMenu
                title='รวมเวลาเตรียมความพร้อม'
                price={(CraneSolutionSlice.result).total_operation_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='นาที'
            />
        </ul >
    )
}