import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name:'message',

  initialState:{
    title:'',
    icon:'',
    type: '',
  },

  reducers:{
    setMessage(state,actions){
      const {title,icon,type} = actions.payload
      state.title = title,
      state.icon = icon,
      state.type = type
    },
    clearMessage(state){
      state.title = '',
      state.icon = '',
      state.type = ''
    }
  }

})

export const {setMessage,clearMessage} = messageSlice.actions
export default messageSlice.reducer