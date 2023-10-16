import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadFTS } from "../../../store/slices/FTS.slice";
import { Box, Card, CardContent } from "@mui/material";
import StockCard from "../../layout/StockCard/StockCard";
import { GiCargoShip, GiCargoCrane } from "react-icons/gi"
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RootState } from "../../../store/store";
import { loadCarrier } from "../../../store/slices/carrier.slice";
import { loadCargo } from "../../../store/slices/cargo.slice";
import { loadOrder } from "../../../store/slices/order.slice";
import Loading from "../../layout/Loading/Loading";
import { loadCrane } from "../../../store/slices/crane.slice";
import { loadCargoCrane } from "../../../store/slices/cargocrane.slice";
import { loadReport } from "../../../store/slices/reportSlice";

type Props = {}

export default function HomePage({ }: Props) {
  const dispatch = useDispatch<any>();
  const FTSReducer = useSelector((state: RootState) => state.FTS);
  const CarrierReducer = useSelector((state: RootState) => state.carrier);
  const CargoReducer = useSelector((state: RootState) => state.cargo);
  const OrderReducer = useSelector((state: RootState) => state.order);
  const CargoCraneReducer = useSelector((state: RootState) => state.cargoCrane);

  useEffect(() => {
    dispatch(loadFTS())
    dispatch(loadCarrier())
    dispatch(loadCargo())
    dispatch(loadOrder())
    dispatch(loadCrane())
    dispatch(loadCargoCrane())
    dispatch(loadReport());
  }, []);

  return (
    <>
      {
        FTSReducer.loading ?
          (
            <Loading />
          ) : (
            <Card className="max-h-[100vh] bg-blue-100/50 flex items-center justify-center font-sriracha">
              <CardContent>
                <Box className='grid grid-cols-2 gap-10 my-5'>
                  <StockCard
                    icon={GiCargoCrane}
                    title="ทุ่น"
                    subtitle={`${(FTSReducer.FTS).length} ลำ`}
                    color="bg-[#00a65a]/75"
                    path={'/transferstation'}
                  />
                  <StockCard
                    icon={GiCargoShip}
                    title="เรือขนสินค้า"
                    subtitle={`${(CarrierReducer.carrier).length} ลำ`}
                    color="bg-[#f39c12]/75"
                    path={'/carrier'}
                  />
                  <StockCard
                    icon={BsBoxSeam}
                    title="สินค้า"
                    subtitle={`${(CargoReducer.cargo).length} ประเภท`}
                    color="bg-[#dd4b39]/75"
                    path={'/cargo'}
                  />
                  <StockCard
                    icon={HiOutlineClipboardDocumentList}
                    title="ข้อมูลสินค้าและเครน"
                    subtitle={`${(CargoCraneReducer.result).length} รายการ`}
                    color="bg-[#7b2cbf]/75"
                    path={'/cargocrane'}
                  />
                  <StockCard
                    icon={HiOutlineClipboardDocumentList}
                    title="ขนถ่ายสินค้า"
                    subtitle={`${(OrderReducer.orders).length} รายการ`}
                    color="bg-[#00c0ef]/75"
                    path={'/orders'}
                  />
                  <StockCard
                    icon={HiOutlineClipboardDocumentList}
                    title="สรุปรายละเอียดต้นทุน"
                    color="bg-[#a53860]/75"
                    path={'/summarize'}
                  />
                </Box>
              </CardContent>
            </Card >
          )
      }
    </>
  )
}

