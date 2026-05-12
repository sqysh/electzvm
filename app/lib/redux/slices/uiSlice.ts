import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface UiStatePayload {
  navigationDrawer: boolean
}

export const initialUiState: UiStatePayload = {
  navigationDrawer: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    setOpenNavigationDrawer: (state) => {
      state.navigationDrawer = true
    },
    setCloseNavigationDrawer: (state) => {
      state.navigationDrawer = false
    },
  }
})

export const uiReducer = uiSlice.reducer as Reducer<UiStatePayload>

export const {
setCloseNavigationDrawer, setOpenNavigationDrawer
} = uiSlice.actions
