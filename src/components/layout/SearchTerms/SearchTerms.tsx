import Search from '@mui/icons-material/Search'
import { InputAdornment, TextField, Tooltip } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function SearchTerms(props: Props) {

    return (
        <Tooltip
            title="ค้นหา"
            className='flex justify-end'
        >
            <TextField
                fullWidth
                id="standard-basic"
                variant="outlined"
                placeholder='Search'
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
        </Tooltip>
    )
}