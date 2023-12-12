import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteCargoCrane } from '../../../../store/slices/CargoCrane/cargocrane.slice';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';

export default function CargoCraneDeletePage({ id }: any) {
    const dispatch = useDispatch<any>();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(DeleteCargoCrane(id, setOpen))
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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