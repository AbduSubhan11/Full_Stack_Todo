import { configureStore } from '@reduxjs/toolkit'
import  todoSlice  from './Slices/todoSlice'

export const store = configureStore({
  reducer: {
    todoSlice
  },
})