import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadFTS } from "../../../store/slices/FTS/FTS.slice";
import { Box, Card, CardContent, Typography } from "@mui/material";
import StockCard from "../../layout/StockCard/StockCard";
import { GiCargoShip, GiCargoCrane, GiCrane } from "react-icons/gi"
import { BsBoxSeam } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RootState } from "../../../store/store";
import { loadCargo } from "../../../store/slices/Cargo/cargo.slice";
import Loading from "../../layout/Loading/Loading";
import { loadCargoCrane } from "../../../store/slices/CargoCrane/cargocrane.slice";
import { loadReport } from "../../../store/slices/report/reportSlice";
import { loadReportCrane } from "../../../store/slices/report/reportCraneSlice";
import { loadCarneSolutionV2 } from "../../../store/slices/Solution/craneSolutionV2Slice";
import { Link } from "react-router-dom";
import { loadSolution_carrier_order } from "../../../store/slices/Solution/solution_carrier_orderSlice";

type Props = {}

export default function HomePage({ }: Props) {
  const dispatch = useDispatch<any>();
  const FTSReducer = useSelector((state: RootState) => state.FTS);
  const CarrierReducer = useSelector((state: RootState) => state.carrier);
  const CargoReducer = useSelector((state: RootState) => state.cargo);
  const OrderReducer = useSelector((state: RootState) => state.order);
  const CargoCraneReducer = useSelector((state: RootState) => state.cargoCrane);
  const rolesReducer = useSelector((state: RootState) => state.rolesReducer);

  const isLoading = FTSReducer.loading && CarrierReducer.loading && CargoReducer.cargo && OrderReducer.orders && CargoCraneReducer.result
  const filteredOrder = (OrderReducer.orders).filter((group) => group.group === rolesReducer.result?.group); 
  const filteredCarrier = (CarrierReducer.carrier).filter((group) => group.group === rolesReducer.result?.group); 


  useEffect(() => {
    dispatch(loadFTS())
    dispatch(loadCargo())
    dispatch(loadCargoCrane())
    dispatch(loadReport());
    dispatch(loadReportCrane());
    dispatch(loadCarneSolutionV2());
    dispatch(loadSolution_carrier_order())
  }, []);

  return (
    <>
      <Card className="min-h-[90vh] bg-blue-100/50 flex items-center justify-center font-sriracha">
        <CardContent>
          {isLoading ? (
            <Loading />
          ) : (
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
                subtitle={`${(filteredCarrier).length} ลำ`}
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
                icon={GiCrane}
                title="ข้อมูลสินค้าและเครน"
                subtitle={`${(CargoCraneReducer.result).length} รายการ`}
                color="bg-[#7b2cbf]/75"
                path={'/cargocrane'}
              />
              <StockCard
                icon={HiOutlineClipboardDocumentList}
                title="ขนถ่ายสินค้า"
                subtitle={`${(filteredOrder).length} รายการ`}
                color="bg-[#00c0ef]/75"
                path={'/orders'}
              />
              <StockCard
                icon={TbListDetails}
                title="สรุปรายละเอียดต้นทุน"
                color="bg-[#a53860]/75"
                path={'/summarize'}
              />
              <Box
                component={Link} to={`/report`}
                className='relative col-span-2 mx-auto'
              >
                <Card className="w-[500px] h-[100px] p-5">
                  <Box
                    className={`
                      bg-[#D2DE32]/75 flex justify-center items-center absolute top-[-20px] right-[-20px] w-[140px] h-full px-3 py-2 rounded-md
                  `}
                  >

                    <HiOutlineDocumentReport className='text-5xl flex justify-center items-center' />
                  </Box>
                  <Box className='m-2 text-[#435B71]'>
                    <Typography
                      variant='h5'
                      component='h4'
                      className='flex justify-start font-semibold font-kanit'
                    >
                      รายงาน
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card >
    </>
  )
}

