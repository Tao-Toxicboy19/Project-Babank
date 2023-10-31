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
                            <props.icon className='text-2xl flex justify-center items-center' />
                            <Typography
                                variant='h5'
                                component='h4'
                                className='font-kanit flex justify-center font-semibold'
                            >
                                {props.price}
                            </Typography>
                        </Box>
                        <Typography
                            variant='h6'
                            component='h3'
                            className='font-kanit flex items-end'
                        >
                            {props.unit}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}