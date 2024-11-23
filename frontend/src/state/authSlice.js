import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        access_token: null, user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.access_token = action.payload
        }
    }
})

export const { setToken } = cartSlice.actions
export default cartSlice.reducer