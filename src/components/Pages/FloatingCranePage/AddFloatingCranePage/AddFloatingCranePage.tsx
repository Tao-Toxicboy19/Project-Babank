import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Floating } from "../../../../types/FloatingCrane.type";
import { Postfloating } from "../../../../store/slices/PostFloatingCraneSlice";
import { AppDispatch } from "../../../../store/store";

type Props = {};

export default function AddFloatingCranePage({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [newFloating, setNewFloating] = useState<Floating>({
    id: 0,
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    setuptime: "",
    speed: 0,
  });

  const handleAddFloating = () => {
    dispatch(Postfloating(newFloating));
    window.location.reload();
  };

  useEffect(() => {
    if (newFloating.id !== 0) {
      // เมื่อ newFloating.id มีค่าไม่ใช่ 0 (เป็นตัวเลขเช่น id จริง)
      // ให้รีเฟรชหน้า หรือทำอื่น ๆ ที่คุณต้องการ
      window.location.reload(); // นี่เป็นตัวอย่างรีเฟรชหน้า แต่คุณสามารถใช้วิธีอื่น ๆ ก็ได้
    }
  }, [newFloating.id]);

  return (
    <div>
      <h1>Add Floating Crane</h1>
      <form>
        {/* นี่คือตัวอย่างของ input fields เพื่อกรอกข้อมูลใหม่ */}
        <input
          type="text"
          placeholder="Name"
          value={newFloating.name}
          onChange={(e) =>
            setNewFloating({ ...newFloating, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          value={newFloating.description}
          onChange={(e) =>
            setNewFloating({ ...newFloating, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="latitude"
          value={newFloating.latitude.toString()} // แปลงค่าเป็น string
          onChange={
            (e) =>
              setNewFloating({
                ...newFloating,
                latitude: parseFloat(e.target.value),
              }) // แปลงค่าเป็น number
          }
        />
        <input
          type="text"
          placeholder="longitude"
          value={newFloating.longitude.toString()} // แปลงค่าเป็น string
          onChange={
            (e) =>
              setNewFloating({
                ...newFloating,
                longitude: parseFloat(e.target.value),
              }) // แปลงค่าเป็น number
          }
        />
        <input
          type="text"
          placeholder="setuptime"
          value={newFloating.setuptime}
          onChange={(e) =>
            setNewFloating({ ...newFloating, setuptime: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="speed"
          value={newFloating.speed.toString()} // แปลงค่าเป็น string
          onChange={
            (e) =>
              setNewFloating({
                ...newFloating,
                speed: parseFloat(e.target.value),
              }) // แปลงค่าเป็น number
          }
        />
        <button type="button" onClick={handleAddFloating}>
          Add Floating Crane
        </button>
      </form>
    </div>
  );
}
