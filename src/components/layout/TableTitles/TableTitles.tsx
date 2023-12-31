import { TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { roleSelector } from '../../../store/slices/auth/rolesSlice';

type Props = {
    Titles: string[];
};

export default function TableTitles(props: Props) {
    const rolesReducer = useSelector(roleSelector)

    const filteredTitles = rolesReducer.result && rolesReducer.result.role === 'Viewer'
        ? props.Titles.slice(0, -1)
        : props.Titles;

    return (
        <TableRow>
            {filteredTitles.map((title, index) => (
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
