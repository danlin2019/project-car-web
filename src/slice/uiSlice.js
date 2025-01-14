import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name:'ui',

  initialState:{
    isSidebarOpen: false
  },

  reducers:{
    openSindbar:(state) =>{
      state.isSidebarOpen = true
    },
    closeSindbar:(state) =>{
      state.isSidebarOpen = false
    }
  }
})

export const {openSindbar,closeSindbar} = uiSlice.actions
export default uiSlice.reducer