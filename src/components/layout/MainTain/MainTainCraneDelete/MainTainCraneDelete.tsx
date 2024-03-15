import React, { useState } from 'react'
import DeleteDialog from '../../DeleteDialog/DeleteDialog';
import { useAppDispatch } from '../../../../store/store';
import { mainTainCraneDeleteDeleteAsync } from '../../../../store/slices/MainTainCrane/mainTainCraneDeleteSlice';
import { mainTainCraneAsync } from '../../../../store/slices/MainTainCrane/mainTainCraneSlice';

type Props = {
    id: number
}

export default function MainTainCraneDelete({ id }: Props) {
    const [open, setOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetch = () => dispatch(mainTainCraneAsync(id))

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(mainTainCraneDeleteDeleteAsync({ id, handleClose, fetch }))
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