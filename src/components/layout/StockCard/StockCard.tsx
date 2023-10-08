import Card from "@mui/material/Card";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

type StockCardProp = {
    title: string;
    subtitle?: string;
    color: any;
    icon: any;
    path: string;
};

const StockCard = (props: StockCardProp) => {
    return (
        <Box
            component={Link} to={`${props.path}`}
            className='relative'
        >
            <Card className="w-[400px] h-[100px] p-5">
                <Box
                    className={`
                    ${props.color} flex justify-center items-center absolute top-[-20px] right-[-20px] w-[140px] h-full px-3 py-2 rounded-md
                    `}
                >

                    <props.icon className='text-5xl flex justify-center items-center' />
                </Box>
                <Box className='m-2 text-[#435B71]'>
                    <Typography
                        variant='h5'
                        component='h4'
                        className='flex justify-start font-semibold font-kanit'
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h3'
                        className='flex items-end font-kanit'
                    >
                        {props.subtitle}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default StockCard;
