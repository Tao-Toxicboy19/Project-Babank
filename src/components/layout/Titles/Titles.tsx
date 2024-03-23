import { Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
    title: string
    title2?: string
    title3?: string
}

export default function Titles(props: Props) {
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    fontSize: 23,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
                className='text-blue-900'
            >
                <KeyboardArrowRightIcon sx={{ fontSize: 25, marginTop: 1 }} />
                {props.title}
                {props.title2 && (
                    <>
                        <KeyboardArrowRightIcon sx={{ fontSize: 25, marginTop: 1 }} />
                        {props.title2}
                    </>
                )}
                {props.title3 && (
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            fontSize: 33,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        className='text-blue-900/50'
                    >
                        <KeyboardArrowRightIcon sx={{ fontSize: 40, marginTop: 1 }} />
                        {props.title3}
                    </Typography>
                )}
            </Typography>
        </>
    )
}
