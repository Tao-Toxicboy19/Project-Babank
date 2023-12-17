import { useState } from 'react';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';
import { orderDeleteAsync } from '../../../../store/slices/Order/orderDeleteSlice';
import { orderAsync } from '../../../../store/slices/Order/orderSlice';
import { useAppDispatch } from '../../../../store/store';

export default function OrderDeletePage({ id }: { id: number }) {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const fetch = () => dispatch(orderAsync())

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(orderDeleteAsync({ id, handleClose, fetch }))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false)
        }
    }

    return (
        <DeleteDialog
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            handleDeleteConfirm={handleDeleteConfirm}
            isSubmitting={isSubmitting}
            maxWidth={'sm'}
            titles={'ต้องการลบสินค้าหรือไม่?'}
            description={'คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้ !'}
        />
    )
}