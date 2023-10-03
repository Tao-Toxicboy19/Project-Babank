import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type Props = {}

export default function TimeList({ }: Props) {
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution.result);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2.result);

    const result = CraneSolutionSlice.total_preparation_crane_time + FtsSolutionV2Slice.total_preparation_FTS_time

    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='รวมวลาเสร็จหลังกำหนด'
                price={CraneSolutionSlice.total_late_time}
                unit='นาที'
            />
            <ListMenu
                title='รวมวลาเสร็จก่อนกำหนด'
                price={CraneSolutionSlice.total_early_time}
                unit='นาที'
            />
            <ListMenu
                title='ระยะรวมทางเคลื่อนย้าย'
                price={result}
                unit='ไมล์ทะเล'
            />
            <ListMenu
                title='รวมเวลาดำเนินการขนย้าย'
                price={CraneSolutionSlice.total_operation_time}
                unit='นาที'
            />
            <ListMenu
                title='รวมเวลาเตรียมความพร้อม'
                price={CraneSolutionSlice.total_operation_time}
                unit='นาที'
            />
        </ul >
    )
}