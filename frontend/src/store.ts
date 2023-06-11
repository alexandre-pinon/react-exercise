import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchResult } from './types/results'

type ResultsSliceState = {
  results: SearchResult[]
}

const initialState: ResultsSliceState = {
  results: [],
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload
    },
  },
})

export const { setResults } = resultsSlice.actions

const store = configureStore({
  reducer: {
    results: resultsSlice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const selectResults = (state: RootState) => state.results.results

export default store
