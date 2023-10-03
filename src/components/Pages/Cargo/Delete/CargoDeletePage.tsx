import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCargo } from '../../../../store/slices/cargo.slice';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';

export default function CargoDeletePage({ id }: any) {
    const dispatch = useDispatch<any>();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            dispatch(deleteCargo(id, setOpen))
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