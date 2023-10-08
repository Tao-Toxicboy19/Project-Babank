import { Typography } from '@mui/material'

type Props = {
    title: string
    price: number
    unit: string
}

export default function ListMenu(props: Props) {
    return (
        <li className="border-b">
            <Typography
                className="mt-1 max-w-2xl text-sm text-gray-500 font-kanit"
            >
                {props.title}
            </Typography>
            <div
                className="mt-4 flex items-center justify-between">
                <Typography
                    className="text-green-600 font-kanit"
                >
                    {props.price}
                </Typography>
                <Typography className='font-kanit'>
                    {props.unit}
                </Typography>
            </div>
        </li>
    )
}