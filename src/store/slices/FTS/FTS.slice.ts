import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SUCCESS, server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";
import { FTSCrane, FTSCraneState } from "../../../types/FloatingCrane.type";
import { toast } from "react-toastify";

const initialState: FTSCraneState = {
    FTS: [],
    loading: false,
    error: null
}

const FTSSlice = createSlice({
    name: 'FTS',
    initialState,
    reducers: {
        setFTSState: (state) => {
            state.FTS = []
            state.loading = true
            state.error = null
        },
        setFTSSuccess: (state, action: PayloadAction<FTSCrane[]>) => {
            state.FTS = action.payload
            state.loading = false
            state.error = null
        },
        setFTSFailure: (state, action: PayloadAction<string>) => {
            state.FTS = []
            state.error = action.payload
            state.loading = false
        },
        setInsertFTS: (state, action: PayloadAction<FTSCrane>) => {
            state.FTS.push(action.payload)
        },
        setDeleteFTS: (state, action: PayloadAction<any>) => {
            state.FTS = state.FTS.filter(
                (FTS) => FTS.fts_id !== action.payload
            )
        },
    }
})
export const { setFTSState, setFTSSuccess, setFTSFailure, setInsertFTS, setDeleteFTS } = FTSSlice.actions
export default FTSSlice.reducer

export const loadFTS = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(setFTSState())
        const result = await httpClient.get(server.FLOATING)
        dispatch(setFTSSuccess(result.data))
    }
    catch (error) {
        dispatch(setFTSFailure("Failed to fetch floating data"))
    }
}

export const addFTS = (formData: FormData, navigate: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.post(server.FLOATING, formData);
            toast.success(SUCCESS)
            navigate('/transferstation')
        } catch (error) {
            dispatch(setFTSFailure("Failed"));
        }

    };
};

export const deleteFTS = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.FLOATING}/${id}`);
            dispatch(setDeleteFTS(id));
            toast.success(SUCCESS);
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                toast.warn(`
                ไม่สามารถลบข้อมูลได้ เนื่องจากมี 
                ข้อมูลอยู่ที่ ข้อมูลสินค้าและเครน
                `);
                setOpen(false)
            } else {
                dispatch(setFTSFailure("Failed"));
            }
        }
    };
};

const doGetCrane = async (dispatch: any) => {
    try {
        const result = await httpClient.get(server.FLOATING);
        dispatch(setFTSSuccess(result.data));
    } catch (error: any) {
        dispatch(setFTSFailure(error.message));
    }
};

export const deleteCrane = (id: any, setOpen: any) => {
    return async (dispatch: any) => {
        try {
            await httpClient.delete(`${server.CRANE}/${id}`);
            setOpen(false);
            toast.success('ลบทุ่นเรียบร้อย');
            await doGetCrane(dispatch);
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                toast.warn(`
                ไม่สามารถลบข้อมูลได้ เนื่องจากมี 
                ข้อมูลอยู่ที่ ข้อมูลสินค้าและเครน
                `);
                setOpen(false)
            } else {
                console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', error);
                dispatch(setFTSFailure(error.message));
            }
        }
    };
};