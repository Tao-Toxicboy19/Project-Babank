import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import DeleteDialog from '../../DeleteDialog/DeleteDialog';
import { deleteMainTainFTS } from '../../../../store/slices/MainTain/FTSSlice';

type Props = {
    id: number
}

export default function DeleteFTS({ id }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleDeleteConfirm = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(deleteMainTainFTS(id, setOpen))
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

// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { deleteCrane } from '../../../../store/slices/FTS/FTS.slice';
// import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';


// type Props = {
//     id: number
// }

// export default function CraneDalete({ id }: Props) {
//     const [open, setOpen] = React.useState(false);
//     const dispatch = useDispatch<any>();
//     const [isSubmitting, setIsSubmitting] = useState(false);


//     const handleDeleteConfirm = async () => {
//         setIsSubmitting(true);
//         try {
//             await dispatch(deleteCrane(id, setOpen))
//             setIsSubmitting(false);
//         } catch (error) {
//             setIsSubmitting(false)
//         }
//     }

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <DeleteDialog
//             open={open}
//             handleClickOpen={handleClickOpen}
//             handleClose={handleClose}
//             handleDeleteConfirm={handleDeleteConfirm}
//             isSubmitting={isSubmitting}
//             maxWidth={'sm'}
//             titles={'ต้องการลบสินค้าหรือไม่?'}
//             description={'คุณไม่สามารถกู้คืนข้อมูลที่ถูกลบได้ !'}
//         />
//     )
// }