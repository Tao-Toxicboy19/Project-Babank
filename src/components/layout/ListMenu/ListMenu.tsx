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
                className="mt-1 max-w-2xl text-sm text-gray-500"
            >
                {props.title}
            </Typography>
            <div
                className="mt-4 flex items-center justify-between">
                <Typography
                    className="text-green-600"
                >
                    {props.price}
                </Typography>
                <Typography>
                    {props.unit}
                </Typography>
            </div>
        </li>
    )
}