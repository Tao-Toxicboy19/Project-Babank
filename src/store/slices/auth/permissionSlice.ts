import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUCCESS, TOKEN, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

interface Users {
    id: number;
    username: string;
    roles: string
}

interface UsersState {
    loading: boolean
    error: boolean
    result: Users[]
}

const initialState: UsersState = {
    result: [],
    loading: false,
    error: false
}

export const permissionsAsync = createAsyncThunk(
    'permissions/permissionsAsync',
    async ({ id, data, handleClose, fetchUsers }: { id: number, data: FieldValues, handleClose: () => void, fetchUsers: () => void }) => {
        try {
            const token = localStorage.getItem(TOKEN);
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const result = await httpClient.patch(`${server.USER_URL}/${id}`, data, config);
            // const result = await httpClient.get(server.USERALL_URL, config)
            fetchUsers()
            toast.success(SUCCESS)
            handleClose()
            return result.data;
        } catch (error) {
            throw error;
        }
    }
)

const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(permissionsAsync.fulfilled, (state: UsersState, action: PayloadAction<Users[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(permissionsAsync.rejected, (state: UsersState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(permissionsAsync.pending, (state: UsersState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = permissionsSlice.actions
export const permissionsSelector = (store: RootState) => store.permissionsReducer;
export default permissionsSlice.reducer;

// export const { setusersStart, setusersSuccess, setusersFailure } = usersSlice.actions
// export default usersSlice.reducer

// export const loadUser = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
//     try {
//         dispatch(setusersStart())
//         const token = localStorage.getItem("token");
//         const config = {
//             headers: {
//                 Authorization: token
//             }
//         };
//         const result = await httpClient.get(server.USERALL_URL, config)
//         dispatch(setusersSuccess(result.data))
//     }
//     catch (error) {
//         dispatch(setusersFailure())
//     }
// }

// export const GrantPermissions = (id: any, data: FieldValues) => {
//     return async (dispatch: any) => {
//         try {
//             const token = localStorage.getItem("token");
//             const config = {
//                 headers: {
//                     Authorization: token
//                 }
//             };
//             await httpClient.patch(`${server.USER_URL}/${id}`, data, config);
//             toast.success(SUCCESS)
//             dispatch(loadUser())
//         } catch (error) {
//             dispatch(setusersFailure())
//         }
//     };
// };