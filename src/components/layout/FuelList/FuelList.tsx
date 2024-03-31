import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { ftsSolutionV2Selector } from '../../../store/slices/Solution/ftsSolutionV2Slice';
import { craneSolutionSelector } from '../../../store/slices/Solution/craneSolutionSlice';

type Props = {}

export default function FuelList({ }: Props) {
    const craneSolutionReducer = useSelector(craneSolutionSelector)
    const ftsSolutionV2Reducer = useSelector(ftsSolutionV2Selector)

    const total_operation_consumption_cost = craneSolutionReducer.result.reduce((total, solutionItem) => total + solutionItem.total_operation_consumption_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_operation_time = craneSolutionReducer.result.reduce((total, solutionItem) => total + solutionItem.total_operation_time, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_travel_consumption_cost = ftsSolutionV2Reducer.result.reduce((total, solutionItem) => total + solutionItem.total_travel_consumption_cost, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_travel_distance = ftsSolutionV2Reducer.result.reduce((total, solutionItem) => total + solutionItem.total_travel_distance, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')


    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='ค่าเชื้อเพลิงรวมขนถ่าย'
                price={total_travel_distance}
                unit='บาท'
            />
            <ListMenu
                title='ค่าเชื้อเพลิงรวมเคลื่อยย้าย'
                price={total_travel_consumption_cost}
                unit='บาท'
            />
            <ListMenu
                title='ปริมาณเชื้อเพลิงดำเนินการขนถ่าย'
                // price={total_travel_distance}
                price={total_operation_consumption_cost}
                unit='ลิตร'
            />
            <ListMenu
                title='ปริมาณเชื้อเพลิงพลิงรวมเคลื่อยย้าย'
                price={total_operation_time}
                unit='ลิตร'
            />
        </ul >
    )
}