import { useState } from 'react';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';
import { cargoDeleteAsync } from '../../../../store/slices/Cargo/cargoDeleteSlice';
import { useAppDispatch } from '../../../../store/store';
import { cargoAsync } from '../../../../store/slices/Cargo/cargoSlice';

export default function CargoDeletePage({ id }: any) {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetch = () => dispatch(cargoAsync())
    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            dispatch(cargoDeleteAsync({ id, handleClose, fetch }))
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