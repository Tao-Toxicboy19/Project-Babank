// userSlice.ts (Redux)
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload; // ให้ค่า state เป็นข้อมูลผู้ใช้ที่ได้จากการล็อกอิน
    },
    clearUser: (state) => null, // เคลียร์ข้อมูลผู้ใช้เมื่อออกจากระบบ
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
