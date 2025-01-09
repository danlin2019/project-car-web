import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name:'cart',

  initialState:{
    items:[], //儲存產品
    totalQuantity:0, // 購物車總數量
    totalMoney:0 //產品總金額
  },

  reducers:{
    // 取得購物車資料
    addToCart (state,action){
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      // 如果已經有相同產品在購物車中，更新數量不更新商品
      if(existingItem) { 
        existingItem.quantity = newItem.quantity
      }else{
        // 如果是新加入產品 加入購物車
        state.items.push({
          id:newItem.id,
          imageUrl: newItem.imageUrl,
          origin_price: newItem.origin_price,
          price: newItem.price,
          time: newItem.time,
          title: newItem.title,
          quantity:newItem.quantity,
        })
      }
      // 更新總數量 & 總金額
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalMoney = state.items.reduce((sum, item) => sum + item.price * item.quantity,0)
      localStorage.setItem('cart',JSON.stringify(state.items))
    },

    // 取得Storag資料
    loadCartFromStorage(state){
      const storedCart = JSON.parse(localStorage.getItem('cart')) || []
      state.items = storedCart

      // 更新總數量 & 總金額
      state.totalQuantity = storedCart.reduce((sum, item) => sum + item.quantity, 0)
      state.totalMoney = storedCart.reduce((sum, item) => sum + item.price * item.quantity,0)
    },
    // 刪除購物車單筆資料
    delectCart(state,action){
      console.log(action.payload)
      // 篩選出不符合的項目並重新賦值給 state.items
      state.items = state.items.filter((item) => item.id !== action.payload)

      // 更新總數量 & 總金額
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalMoney = state.items.reduce((sum, item) => sum + item.price * item.quantity,0)
      // 更新 localStorage
      localStorage.setItem('cart',JSON.stringify(state.items))
    },

    //更新產品數量
    selectCartNum(state,action){
      const CarItem = action.payload
      const existingItem = state.items.find((item) => item.id === CarItem.id)
      existingItem.quantity = CarItem.quantity
      
      // 更新總數量 & 總金額
      state.totalQuantity = state.items.reduce((sum, item) =>  sum + item.quantity, 0)
      state.totalMoney = state.items.reduce((sum, item) => sum + item.price * item.quantity,0)
      localStorage.setItem('cart',JSON.stringify(state.items))
    }
  }
})

export const {addToCart,loadCartFromStorage,delectCart,selectCartNum} = cartSlice.actions
export default cartSlice.reducer