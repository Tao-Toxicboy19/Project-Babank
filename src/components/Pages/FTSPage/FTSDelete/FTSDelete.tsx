import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';
import { ftsDeleteAsync } from '../../../../store/slices/FTS/ftsDeleteSlice';
import { ftsAsync } from '../../../../store/slices/FTS/ftsSlice';


type Props = {
    id: number
}

export default function FTSDelete({ id }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetch = () => dispatch(ftsAsync())
    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(ftsDeleteAsync({ id, handleClose, fetch }))
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