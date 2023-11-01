import { TableCell, TableRow } from '@mui/material';

type Props = {
    Titles: string[];
};

export default function TableTitles(props: Props) {
    return (
        <TableRow>
            {props.Titles.map((title, index) => (
                <TableCell
                    key={title}
                    align={index === 0 ? 'left' : 'center'}
                    className="font-kanit text-blue-900"
                    sx={{
                        backgroundColor: 'background.paper',
                        fontWeight: 'Bold',
                        fontSize: 16,
                    }}
                >
                    {title}
                </TableCell>
            ))}
        </TableRow>
    );
}
