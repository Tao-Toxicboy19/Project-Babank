import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { ftsSolutionV2Selector } from '../../../store/slices/Solution/ftsSolutionV2Slice';
import { craneSolutionSelector } from '../../../store/slices/Solution/craneSolutionSlice';

type Props = {}

export default function FuelList({ }: Props) {
    const craneSolutionReducer = useSelector(craneSolutionSelector)
    const ftsSolutionV2Reducer = useSelector(ftsSolutionV2Selector)

    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='ค่าเชื้อเพลิงรวมขนถ่าย'
                price={(craneSolutionReducer.result).total_operation_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='บาท'
            />
            <ListMenu
                title='ค่าเชื้อเพลิงรวมเคลื่อยย้าย'
                price={(ftsSolutionV2Reducer.result).total_travel_consumption_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='บาท'
            />
            <ListMenu
                title='ปริมาณเชื้อเพลิงดำเนินการขนถ่าย'
                price={(ftsSolutionV2Reducer.result).total_travel_distance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='ลิตร'
            />
            <ListMenu
                title='ปริมาณเชื้อเพลิงพลิงรวมเคลื่อยย้าย'
                price={(craneSolutionReducer.result).total_operation_time.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='ลิตร'
            />
        </ul >
    )
}