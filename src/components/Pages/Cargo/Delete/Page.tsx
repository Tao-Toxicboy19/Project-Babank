import { useDispatch } from 'react-redux';
import api from '../../../../api/api';
import { EditCargoProps } from '../../../../types/Cargo.type'
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { setDeleteCargo } from '../../../../store/slices/cargoSlice';

export default function Page({ Id }: EditCargoProps) {
  const dispatch = useDispatch();

  const handleDeleteCargo = () => {
    Swal.fire({
      title: 'ยืนยันการลบ',
      text: 'คุณต้องการลบข้อมูล Cargo นี้ใช่หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/cargo/${Id}`)
          .then(() => {
            Swal.fire(
              'ลบข้อมูลเรียบร้อย',
              'ข้อมูล Cargo ถูกลบแล้ว',
              'success'
            );
            dispatch(setDeleteCargo(Id));
          })
          .catch(error => {
            console.error('เกิดข้อผิดพลาดในการลบข้อมูล Cargo: ', error);
          });
      }
    });
  };

  return (
    <div>
      <h1>{Id}</h1>
      <DeleteIcon onClick={handleDeleteCargo} className="hover:text-red-500 hover:scale-110 transform transition-transform duration-300" />
    </div>
  )
}