import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type Props = {}

export default function FuelList({ }: Props) {
    const CraneSolutionSlice = useSelector((state: RootState) => state.craneSolution.result);
    const FtsSolutionV2Slice = useSelector((state: RootState) => state.FTSSolutionV2.result);

    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='ค่าเชื้อเพลิงรวมขนถ่าย'
                price={CraneSolutionSlice.total_operation_consumption_cost}
                unit='บาท'
            />
            <ListMenu
                title='ค่าเชื้อเพลิงรวมเคลื่อยย้าย'
                price={FtsSolutionV2Slice.total_travel_consumption_cost}
                unit='บาท'
            />
            <ListMenu
                title='ปริมาณเชื้อเพลิงดำเนินการขนถ่าย'
                price={FtsSolutionV2Slice.total_travel_distance}
                unit='ลิตร'
            />
            <ListMenu
                title='ปริมาณเชื้อเพลิงพลิงรวมเคลื่อยย้าย'
                price={CraneSolutionSlice.total_operation_time}
                unit='ลิตร'
            />
        </ul >
    )
}