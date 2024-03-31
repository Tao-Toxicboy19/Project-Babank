import ListMenu from '../ListMenu/ListMenu'
import { useSelector } from 'react-redux';
import { craneSolutionSelector } from '../../../store/slices/Solution/craneSolutionSlice';
import { ftsSolutionV2Selector } from '../../../store/slices/Solution/ftsSolutionV2Slice';

export default function TimeList({ }: any) {
    const CraneSolutionReduer = useSelector(craneSolutionSelector)
    const FtsSolutionV2Reducer = useSelector(ftsSolutionV2Selector)

    const result =
        CraneSolutionReduer.result.reduce((total, solutionItem) => total + solutionItem.total_preparation_crane_time, 0)
        +
        FtsSolutionV2Reducer.result.reduce((total, solutionItem) => total + solutionItem.total_preparation_FTS_time, 0)
    const total_late_time = CraneSolutionReduer.result.reduce((total, solutionItem) => total + solutionItem.total_late_time, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_early_time = CraneSolutionReduer.result.reduce((total, solutionItem) => total + solutionItem.total_early_time, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const total_operation_time = CraneSolutionReduer.result.reduce((total, solutionItem) => total + solutionItem.total_operation_time, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return (
        <ul className='h-[320px]'>
            <ListMenu
                title='รวมวลาเสร็จหลังกำหนด'
                price={total_late_time}
                unit='นาที'
            />
            <ListMenu
                title='รวมวลาเสร็จก่อนกำหนด'
                price={total_early_time}
                unit='นาที'
            />
            <ListMenu
                title='รวมระยะทางเคลื่อนย้าย'
                price={result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                unit='กิโลเมตร'
            />
            <ListMenu
                title='รวมเวลาดำเนินการขนย้าย'
                price={total_operation_time}
                unit='นาที'
            />
        </ul >
    )
}