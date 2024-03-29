import { Box, Card, Typography } from "@mui/material"

type Props = {
    title: string
    price: any
    icon: any
    unit: string
    color: string
}

export default function SummarizaCard(props: Props) {
    return (
        <Box className='relative'>
            <Box className={`font-kanit absolute top-[-10px] left-[-10px] w-[140px] h-fit px-3 py-2 ${props.color} rounded-md flex`}>
                {props.title}
            </Box>
            <Card>
                <Box className='m-2'>
                    <Box className='flex justify-between text-[#435B71] mt-10'>
                        <Box className='flex items-center'>
                            {/* <props.icon className='text-lg flex justify-center items-center' /> */}
                            <Typography
                                // variant='h6'
                                // component='h5'
                                className='font-kanit flex justify-center font-semibold text-md'
                            >
                                {props.price}
                            </Typography>
                        </Box>
                        <Typography
                            // variant='h6'
                            // component='h3'
                            className='font-kanit flex items-end text-sm'
                        >
                            {props.unit}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}