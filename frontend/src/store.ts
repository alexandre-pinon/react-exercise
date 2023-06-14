import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Filter } from './types/enums'
import { SearchResult } from './types/results'

type ResultsSliceState = {
  filter: Filter
  search: string
  lastSearch: string
  fetchedOnce: boolean
  cursors: Record<Category, number>
  results: SearchResult[]
}

const initialState: ResultsSliceState = {
  filter: Filter.All,
  search: '',
  lastSearch: '',
  fetchedOnce: false,
  cursors: {
    [Category.People]: 1,
    [Category.Planets]: 1,
    [Category.Films]: 1,
    [Category.Species]: 1,
    [Category.Vehicles]: 1,
    [Category.Starships]: 1,
  },
  results: [],
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setLastSearch: (state, action: PayloadAction<string>) => {
      state.lastSearch = action.payload
    },
    setFetchedOnce: (state, action: PayloadAction<boolean>) => {
      state.fetchedOnce = action.payload
    },
    addResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results.push(...action.payload)
    },
    clearResults: (state) => {
      state.results = []
    },
    incrementCursor: (state, action: PayloadAction<Category>) => {
      state.cursors[action.payload]++
    },
    resetCursor: (state, action: PayloadAction<Category>) => {
      state.cursors[action.payload] = 1
    },
  },
})

export const {
  setFilter,
  setSearch,
  setLastSearch,
  setFetchedOnce,
  addResults,
  clearResults,
  incrementCursor,
  resetCursor,
} = resultsSlice.actions

const store = configureStore({
  reducer: {
    results: resultsSlice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const selectFilter = (state: RootState): Filter => state.results.filter
export const selectSearch = (state: RootState): string => state.results.search
export const selectLastSearch = (state: RootState): string =>
  state.results.lastSearch
export const selectFetchedOnce = (state: RootState): boolean =>
  state.results.fetchedOnce

export const selectResults = (state: RootState): SearchResult[] =>
  state.results.results
export const selectCursors = (state: RootState): Record<Category, number> =>
  state.results.cursors

export default store
