import { createSlice } from '@reduxjs/toolkit';

const homesSlice = createSlice({
    name: 'homes',
    initialState: {
        selectedUser: null,
    },
    reducers: {
        selectUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
});

export const { selectUser } = homesSlice.actions;
export default homesSlice.reducer;
