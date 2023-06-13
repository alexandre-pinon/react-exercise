import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchResult } from './types/results'

type ResultsSliceState = {
  results: SearchResult[]
  filteredResults: SearchResult[]
}

const initialState: ResultsSliceState = {
  results: [],
  filteredResults: [],
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload
    },
    setFilteredResults(state, action: PayloadAction<SearchResult[]>) {
      state.filteredResults = action.payload
    },
  },
})

export const { setResults, setFilteredResults } = resultsSlice.actions

const store = configureStore({
  reducer: {
    results: resultsSlice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const selectResults = (state: RootState) => state.results.results
export const selectFilteredResults = (state: RootState) =>
  state.results.filteredResults

export default store
