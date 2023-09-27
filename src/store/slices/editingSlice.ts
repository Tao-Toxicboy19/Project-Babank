import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
}

const editingSlice = createSlice({
    name: 'editing',
    initialState,
    reducers: {
        setIsEditing: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setIsEditing } = editingSlice.actions;
export default editingSlice.reducer;
