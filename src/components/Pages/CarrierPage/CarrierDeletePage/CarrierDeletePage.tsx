import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteDialog from '../../../layout/DeleteDialog/DeleteDialog';
import { carrieDeleteAsync } from '../../../../store/slices/Carrier/carriceDeleteSlice';
import { carrierAsync } from '../../../../store/slices/Carrier/carrierSlice';

export default function CarrierDeletePage({ id }: any) {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetch = () => dispatch(carrierAsync())

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      dispatch(carrieDeleteAsync({ id, handleClose, fetch }))
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