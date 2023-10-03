import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../../../store/slices/order.slice';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';

export default function OrderDeletePage({ id }: any) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(deleteOrder(id, setOpen))
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
        />
    )
}