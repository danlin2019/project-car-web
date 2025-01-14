import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './slice/messageSlice'
import cartReducer from "./slice/cartSlice";
import uiReducer from "./slice/uiSlice";


//建立 store 把需要的 slice 加入到 store 裡面來
export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart:cartReducer,
    ui:uiReducer
  }
})

