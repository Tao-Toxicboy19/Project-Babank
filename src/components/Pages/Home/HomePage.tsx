import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ftsAsync, ftsSelector } from "../../../store/slices/FTS/ftsSlice";
import { Box, Card, CardContent, Typography } from "@mui/material";
import StockCard from "../../layout/StockCard/StockCard";
import { GiCargoShip, GiCargoCrane, GiCrane } from "react-icons/gi"
import { BsBoxSeam } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { cargoAsync, cargoSelector } from "../../../store/slices/Cargo/cargoSlice";
import Loading from "../../layout/Loading/Loading";
import { cargoCraneAsync, cargoCraneSelector } from "../../../store/slices/CargoCrane/cargoCraneSlice";
import { Link } from "react-router-dom";
import { carrierSelector } from "../../../store/slices/Carrier/carrierSlice";
import { roleSelector } from "../../../store/slices/auth/rolesSlice";
import { orderAsync, orderSelector } from "../../../store/slices/Order/orderSlice";
import { mainTainAsync } from "../../../store/slices/mainTainFts/mainTainFtsSlice";
import { mainTainCraneAsync } from "../../../store/slices/MainTainCrane/mainTainCraneSlice";

type Props = {}

export default function HomePage({ }: Props) {
  const dispatch = useDispatch<any>();
  const ftsReducer = useSelector(ftsSelector)
  const carrierReducer = useSelector(carrierSelector);
  const cargoReducer = useSelector(cargoSelector);
  const orderReducer = useSelector(orderSelector)
  const cargoCraneReducer = useSelector(cargoCraneSelector)
  const rolesReducer = useSelector(roleSelector)

  const isLoading = ftsReducer.loading && carrierReducer.loading && cargoReducer.loading && orderReducer.loading && cargoCraneReducer.loading
  const filteredOrder = (orderReducer.result).filter((group) => group.group === rolesReducer.result?.group)

  const id = rolesReducer.result?.group
  useEffect(() => {
    dispatch(mainTainAsync(id))
    dispatch(mainTainCraneAsync(id))
  }, [])

  useEffect(() => {
    dispatch(orderAsync())
    dispatch(ftsAsync())
    dispatch(cargoAsync())
    dispatch(cargoCraneAsync())
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
                subtitle={`${(ftsReducer.result).length} ลำ`}
                color="bg-[#00a65a]/75"
                path={'/transferstation'}
              />
              <StockCard
                icon={GiCargoShip}
                title="เรือขนสินค้า"
                subtitle={`${(carrierReducer.result).length} ลำ`}
                color="bg-[#f39c12]/75"
                path={'/carrier'}
              />
              <StockCard
                icon={BsBoxSeam}
                title="สินค้า"
                subtitle={`${(cargoReducer.result).length} ประเภท`}
                color="bg-[#dd4b39]/75"
                path={'/cargo'}
              />
              <StockCard
                icon={GiCrane}
                title="ข้อมูลสินค้าและเครน"
                subtitle={`${(cargoCraneReducer.result).length} รายการ`}
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

