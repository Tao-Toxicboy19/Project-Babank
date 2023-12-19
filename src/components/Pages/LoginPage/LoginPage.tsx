import { Box } from "@mui/material"
import Logo1 from '../../../assets/images/logo/logo1.png'
import Logo2 from '../../../assets/images/logo/logo2.png'
import Logo3 from '../../../assets/images/logo/logo3.png'
import { useForm } from "react-hook-form"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginAsync } from "../../../store/slices/auth/loginSlice"
import { useAppDispatch } from "../../../store/store"

type Props = {}

export default function LoginPage({ }: Props) {
  const { register, handleSubmit } = useForm();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sunmitting = () => setIsSubmitting(false)
  return (
    <>

      <Box className='h-[4rem]'></Box>
      <div
        className="flex flex-col text-center md:text-left md:flex-row justify-evenly md:items-center"
      >
        <Box className='w-[60%] flex justify-center'>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">

            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <Box className='flex justify-center gap-x-5'>
                <Box className='flex items-center'>
                  <img src={Logo3} className="w-[200px] h-auto object-cover" />
                </Box>
                <Box className='flex items-center mt-5'>
                  <img src={Logo1} className="w-[150px] h-auto object-cover" />
                </Box>
                <Box className='flex items-center'>
                  <img src={Logo2} className="w-[250px] h-auto object-cover" />
                </Box>
              </Box>
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                การบริหารจัดการระบบโลจิสติกส์การขนถ่ายสินค้าเทกองที่ทุ่นขนถ่ายสินค้ากลางทะเลโดยใช้ระบบสารสนเทศและดิจิทัลแพลตฟอร์ม
              </h2>
              <form
                className="w-full"
                onSubmit={handleSubmit((data) => {
                  setIsSubmitting(true);
                  dispatch(loginAsync({ data, navigate, sunmitting }))
                })}
              >
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="username" className="text-gray-500 mb-2"
                  >Username</label
                  >
                  <input
                    type="text"
                    id="username"
                    placeholder="Please insert your username"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    {...register('username')}
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2"
                  >Password</label
                  >
                  <input
                    type="password"
                    id="password"
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    {...register('password')}

                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-[#2196F3] rounded-lg text-green-100"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </div>
                      <div className="font-bold">Sigin</div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </div>
    </>
  )
}