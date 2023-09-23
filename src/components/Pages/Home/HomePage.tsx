import { useDispatch, useSelector } from "react-redux";
import MapContainerPage from "./Maps/Maps"
import { useEffect } from "react";
import { loadFTS } from "../../../store/slices/FTS.slice";
import { Box, Card, CardContent, Typography } from "@mui/material";
import StockCard from "../../layout/Card/Card";
import { GiCargoShip, GiCargoCrane } from "react-icons/gi"
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RootState } from "../../../store/store";
import { loadCarrier } from "../../../store/slices/carrier.slice";
import { loadCargo } from "../../../store/slices/cargo.slice";
import { loadOrder } from "../../../store/slices/order.slice";


type Props = {}

export default function HomePage({ }: Props) {
  const dispatch = useDispatch<any>();
  const FTSReducer = useSelector((state: RootState) => state.FTS);
  const CarrierReducer = useSelector((state: RootState) => state.carrier);
  const CargoReducer = useSelector((state: RootState) => state.cargo);
  const OrderReducer = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(loadFTS())
    dispatch(loadCarrier())
    dispatch(loadCargo())
    dispatch(loadOrder())
  }, []);

  return (
    <Card className="h-[88vh] bg-blue-100/50">
      <CardContent>
        <Box className='grid grid-cols-12 gap-x-10'>
          <Box className='col-span-8'>
            <Card className="mb-4 max-w-screen-xl h-max">
              <CardContent>
                <Typography variant="h5" component='h1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, necessitatibus.
                </Typography>
              </CardContent>
            </Card>
            <Card className="max-w-screen-xl">
              <CardContent>
                <MapContainerPage />
              </CardContent>
            </Card>
          </Box>
          <Box className='col-span-4 flex flex-col gap-y-5'>
            <StockCard icon={GiCargoCrane} title="เรือเครน" subtitle={`${(FTSReducer.FTS).length} ลำ`} color="#00a65a" />
            <StockCard icon={GiCargoShip} title="เรือขนสินค้า" subtitle={`${(CarrierReducer.carrier).length} ลำ`} color="#f39c12" />
            <StockCard icon={BsBoxSeam} title="สินค้า" subtitle={`${(CargoReducer.cargo).length} ประเภท`} color="#dd4b39" />
            <StockCard icon={HiOutlineClipboardDocumentList} title="ขนถ่ายสินค้า" subtitle={`${(OrderReducer.orders).length} รายการ`} color="#00c0ef" />
          </Box>
        </Box>
      </CardContent>
    </Card >
  )
}