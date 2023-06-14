import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from './types/person'
import { Planet } from './types/planet'
import { Film } from './types/film'
import { Species } from './types/species'
import { Vehicle } from './types/vehicle'
import { Starship } from './types/starship'
import { Category } from './types/category'

type ResultsSliceState = {
  filter: Category
  search: string
  lastSearch: string
  fetchedOnce: boolean
  people: Person[]
  peopleCursor: number
  planets: Planet[]
  planetsCursor: number
  films: Film[]
  filmsCursor: number
  species: Species[]
  speciesCursor: number
  vehicles: Vehicle[]
  vehiclesCursor: number
  starships: Starship[]
  starshipsCursor: number
}

const initialState: ResultsSliceState = {
  filter: Category.All,
  search: '',
  lastSearch: '',
  fetchedOnce: false,
  people: [],
  peopleCursor: 1,
  planets: [],
  planetsCursor: 1,
  films: [],
  filmsCursor: 1,
  species: [],
  speciesCursor: 1,
  vehicles: [],
  vehiclesCursor: 1,
  starships: [],
  starshipsCursor: 1,
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Category>) => {
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
    addPeople: (state, action: PayloadAction<Person[]>) => {
      state.people.push(...action.payload)
    },
    addPlanets: (state, action: PayloadAction<Planet[]>) => {
      state.planets.push(...action.payload)
    },
    addFilms: (state, action: PayloadAction<Film[]>) => {
      state.films.push(...action.payload)
    },
    addSpecies: (state, action: PayloadAction<Species[]>) => {
      state.species.push(...action.payload)
    },
    addVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles.push(...action.payload)
    },
    addStarships: (state, action: PayloadAction<Starship[]>) => {
      state.starships.push(...action.payload)
    },
    clearPeople: (state) => {
      state.people = []
    },
    clearPlanets: (state) => {
      state.planets = []
    },
    clearFilms: (state) => {
      state.films = []
    },
    clearSpecies: (state) => {
      state.species = []
    },
    clearVehicles: (state) => {
      state.vehicles = []
    },
    clearStarships: (state) => {
      state.starships = []
    },
    setPeople: (state, action: PayloadAction<Person[]>) => {
      state.people = action.payload
    },
    setPlanets: (state, action: PayloadAction<Planet[]>) => {
      state.planets = action.payload
    },
    setFilms: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload
    },
    setSpecies: (state, action: PayloadAction<Species[]>) => {
      state.species = action.payload
    },
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload
    },
    setStarships: (state, action: PayloadAction<Starship[]>) => {
      state.starships = action.payload
    },
    setPeopleCursor: (state, action: PayloadAction<number>) => {
      state.peopleCursor = action.payload
    },
    setPlanetsCursor: (state, action: PayloadAction<number>) => {
      state.planetsCursor = action.payload
    },
    setFilmsCursor: (state, action: PayloadAction<number>) => {
      state.filmsCursor = action.payload
    },
    setSpeciesCursor: (state, action: PayloadAction<number>) => {
      state.speciesCursor = action.payload
    },
    setVehiclesCursor: (state, action: PayloadAction<number>) => {
      state.vehiclesCursor = action.payload
    },
    setStarshipsCursor: (state, action: PayloadAction<number>) => {
      state.starshipsCursor = action.payload
    },
  },
})

export const {
  setFilter,
  setSearch,
  setLastSearch,
  setFetchedOnce,
  addPeople,
  addPlanets,
  addFilms,
  addSpecies,
  addVehicles,
  addStarships,
  clearPeople,
  clearPlanets,
  clearFilms,
  clearSpecies,
  clearVehicles,
  clearStarships,
  setPeopleCursor,
  setPlanetsCursor,
  setFilmsCursor,
  setSpeciesCursor,
  setVehiclesCursor,
  setStarshipsCursor,
  setPeople,
  setPlanets,
  setFilms,
  setSpecies,
  setVehicles,
  setStarships,
} = resultsSlice.actions

const store = configureStore({
  reducer: {
    results: resultsSlice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const selectFilter = (state: RootState): Category => state.results.filter
export const selectSearch = (state: RootState): string => state.results.search
export const selectLastSearch = (state: RootState): string =>
  state.results.lastSearch
export const selectFetchedOnce = (state: RootState): boolean =>
  state.results.fetchedOnce

export const selectPeople = (state: RootState): Person[] => state.results.people
export const selectPlanets = (state: RootState): Planet[] =>
  state.results.planets
export const selectFilms = (state: RootState): Film[] => state.results.films
export const selectSpecies = (state: RootState): Species[] =>
  state.results.species
export const selectVehicles = (state: RootState): Vehicle[] =>
  state.results.vehicles
export const selectStarships = (state: RootState): Starship[] =>
  state.results.starships

export const selectPeopleCursor = (state: RootState): number =>
  state.results.peopleCursor
export const selectPlanetsCursor = (state: RootState): number =>
  state.results.planetsCursor
export const selectFilmsCursor = (state: RootState): number =>
  state.results.filmsCursor
export const selectSpeciesCursor = (state: RootState): number =>
  state.results.speciesCursor
export const selectVehiclesCursor = (state: RootState): number =>
  state.results.vehiclesCursor
export const selectStarshipsCursor = (state: RootState): number =>
  state.results.starshipsCursor

export default store
