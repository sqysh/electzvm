import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface UiStatePayload {
  isDark: boolean
}

export const initialUiState: UiStatePayload = {
  isDark: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    setIsDark: (state, { payload }) => {
      state.isDark = payload
    }
  }
})

export const uiReducer = uiSlice.reducer as Reducer<UiStatePayload>

export const { setIsDark } = uiSlice.actions
