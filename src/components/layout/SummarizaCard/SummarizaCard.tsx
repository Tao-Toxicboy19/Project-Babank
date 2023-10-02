import { Box, Card, Typography } from "@mui/material"
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
type Props = {
    title: string
    price: number
}

export default function SummarizaCard(props: Props) {
    return (
        <Card>
            <Box className='m-2'>
                <Typography
                    paragraph
                    className="text-[#7e7e7e]"
                >
                    {props.title}
                </Typography>
                <Box className='flex justify-between text-[#435B71]'>
                    <Box className='flex items-center'>
                        <CurrencyBitcoinIcon />
                        <Typography
                            variant='h4'
                            component='h4'
                            className='flex justify-center font-semibold'
                        >
                            {props.price}
                        </Typography>
                    </Box>
                    <Typography
                        variant='h6'
                        component='h3'
                        className='flex items-end'
                    >
                        บาท
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}