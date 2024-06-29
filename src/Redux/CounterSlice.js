import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    counter: 0
}

let counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state) => {
            state.counter++;
        },
        decrease: (state) => {
            state.counter--;
        },
        incrementByNumber: (state, action) => {
            state.counter += action.payload
        }
    }
})

export let counterReducer = counterSlice.reducer
export let { increase, decrease, incrementByNumber } = counterSlice.actions