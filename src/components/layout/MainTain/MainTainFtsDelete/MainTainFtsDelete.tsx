import React, { useState } from 'react'
import DeleteDialog from '../../DeleteDialog/DeleteDialog';
import { useAppDispatch } from '../../../../store/store';
import { mainTainDeleteAsync } from '../../../../store/slices/mainTainFts/mainTainFtsDeleteSlice';
import { mainTainAsync } from '../../../../store/slices/mainTainFts/mainTainFtsSlice';

type Props = {
    id: number
}

export default function MainTainFtsDelete({ id }: Props) {
    const [open, setOpen] = React.useState(false)
    const dispatch = useAppDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const fetch = () => dispatch(mainTainAsync(id))

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true)
        try {
            await dispatch(mainTainDeleteAsync({ id, handleClose, fetch }))
            setIsSubmitting(false)
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