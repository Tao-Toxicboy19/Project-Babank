import React, { useEffect, useState } from 'react';
import { CargoCrane } from '../../../types/CargoCrane.type';
import { Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTS } from '../../../store/slices/FTS.slice';
import { loadCarrier } from '../../../store/slices/carrier.slice';
import { loadCrane } from '../../../store/slices/crane.slice';
import { loadCargo } from '../../../store/slices/cargo.slice';
import { loadCargoCrane } from '../../../store/slices/cargocrane.slice';
import { RootState } from '../../../store/store';

type Props = {}

export default function App({ }: Props) {
  const CargoCraneReducer = useSelector((state: RootState) => state.cargoCrane);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(loadFTS())
    dispatch(loadCarrier())
    dispatch(loadCargo())
    dispatch(loadCrane())
    dispatch(loadCargoCrane())
  }, []);

  // สร้างออบเจกต์ Map เพื่อรวมชื่อซ้ำ
  const nameGroups = new Map<string, CargoCrane[]>();

  (CargoCraneReducer.result).forEach((item) => {
    const name = item.fts!.FTS_name;
    if (nameGroups.has(name!)) {
      // ถ้ามีชื่ออยู่แล้วใน Map ให้เพิ่มข้อมูลเข้าไป
      nameGroups.get(name!)?.push(item);
    } else {
      // ถ้าไม่มีชื่ออยู่ใน Map ให้สร้างรายการใหม่
      nameGroups.set(name!, [item]);
    }
  });

  const toggleGroup = (name: string) => {
    if (openGroups.has(name)) {
      openGroups.delete(name);
    } else {
      openGroups.add(name);
    }
    setOpenGroups(new Set(openGroups));
  };

  return (
    <>
      <Paper sx={{ height: '70vh', width: "100%", marginBottom: 1, marginTop: 2 }}>
        <Box className='flex justify-end mx-5'>
          <Button component={Link} to={`/cargocrane/create`} className='my-3'>เพิ่ม</Button>
        </Box>
        <table className="table-fixed w-full">
          <thead>
            <tr>
              {['ชื่อทุ่น', 'ลำดับเครนที่', 'สถานะสินค้า (ขาเข้า/ขาออก)', 'ชื่อสินค้า', 'อัตราการขนถ่ายสินค้า (ตัน/ชม.)', 'อัตราการใช้น้ำมัน (ลิตร/ตัน)', 'แก้ไข'].map((items) => (
                <th key={items}>{items}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(nameGroups.entries()).map(([name, items]) => (
              <React.Fragment key={name}>
                <tr>
                  <td>
                    <button onClick={() => toggleGroup(name)}>
                      {openGroups.has(name) ? 'ปิด' : 'เปิด'}
                    </button>
                    {name}
                  </td>
                  <td>{items[0].crane!.crane_name}</td>
                  <td>{items[0].cargo!.cargo_name}</td>
                  <td>{items[0].category}</td>
                  <td>{items[0].consumption_rate}</td>
                  <td>{items[0].work_rate}</td>
                  <td>
                    <Button component={Link} to={`/cargocrane/edit/${items[0].cargo_crane_id}`}>แก้ไข{items[0].cargo_crane_id} </Button>
                    <button>ลบ</button>
                  </td>
                </tr>
                {
                  openGroups.has(name) &&
                  items.slice(1).map((item, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>{item.crane!.crane_name}</td>
                      <td>{item.cargo!.cargo_name}</td>
                      <td>{item.category}</td>
                      <td>{item.consumption_rate}</td>
                      <td>{item.work_rate}</td>
                      <td>
                        <Button component={Link} to={`/cargocrane/edit/${item.cargo_crane_id}`}>แก้ไข{item.cargo_crane_id} </Button>
                        <button>ลบ</button>
                      </td>
                    </tr>
                  ))
                }
              </React.Fragment>
            ))}
          </tbody>
        </table >
      </Paper>
    </>
  );
}
