import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  searchFilms,
  searchPeople,
  searchPlanets,
  searchSpecies,
  searchStarships,
  searchVehicles,
} from '../API'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'
import * as Store from '../store'
import { Category } from '../types/category'
import Card from '../components/Card'
import { Dispatch } from '@reduxjs/toolkit'

const HomePage = () => {
  const [loading, setLoading] = useState(false)

  const filter = useSelector(Store.selectFilter)
  const search = useSelector(Store.selectSearch)
  const lastSearch = useSelector(Store.selectLastSearch)
  const fetchedOnce = useSelector(Store.selectFetchedOnce)

  const people = useSelector(Store.selectPeople)
  const planets = useSelector(Store.selectPlanets)
  const films = useSelector(Store.selectFilms)
  const species = useSelector(Store.selectSpecies)
  const starships = useSelector(Store.selectStarships)
  const vehicles = useSelector(Store.selectVehicles)

  const peopleCursor = useSelector(Store.selectPeopleCursor)
  const planetsCursor = useSelector(Store.selectPlanetsCursor)
  const filmsCursor = useSelector(Store.selectFilmsCursor)
  const speciesCursor = useSelector(Store.selectSpeciesCursor)
  const starshipsCursor = useSelector(Store.selectStarshipsCursor)
  const vehiclesCursor = useSelector(Store.selectVehiclesCursor)

  const dispatch = useDispatch()

  const searchData = async (search: string, dispatch: Dispatch) => {
    setLoading(true)

    const FIRST_PAGE = 1
    await Promise.all([
      searchPeople(search, FIRST_PAGE).then((data) => {
        dispatch(Store.setPeople(data.results))
        dispatch(Store.setPeopleCursor(FIRST_PAGE))
      }),
      searchPlanets(search, FIRST_PAGE).then((data) => {
        dispatch(Store.setPlanets(data.results))
        dispatch(Store.setPlanetsCursor(FIRST_PAGE))
      }),
      searchFilms(search, FIRST_PAGE).then((data) => {
        dispatch(Store.setFilms(data.results))
        dispatch(Store.setFilmsCursor(FIRST_PAGE))
      }),
      searchSpecies(search, FIRST_PAGE).then((data) => {
        dispatch(Store.setSpecies(data.results))
        dispatch(Store.setSpeciesCursor(FIRST_PAGE))
      }),
      searchStarships(search, FIRST_PAGE).then((data) => {
        dispatch(Store.setStarships(data.results))
        dispatch(Store.setStarshipsCursor(FIRST_PAGE))
      }),
      searchVehicles(search, FIRST_PAGE).then((data) => {
        dispatch(Store.setVehicles(data.results))
        dispatch(Store.setVehiclesCursor(FIRST_PAGE))
      }),
    ])

    if (!fetchedOnce) {
      dispatch(Store.setFetchedOnce(true))
    }
    dispatch(Store.setLastSearch(search))

    setLoading(false)
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(Store.setSearch(e.target.value))
  }

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(Store.setFilter(e.target.value as Category))
  }

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await searchData(search, dispatch)
  }

  const filteredResults = useMemo(() => {
    switch (filter) {
      case Category.People:
        return people
      case Category.Planets:
        return planets
      case Category.Films:
        return films
      case Category.Species:
        return species
      case Category.Starships:
        return starships
      case Category.Vehicles:
        return vehicles
      case Category.All:
        return [people, planets, films, species, starships, vehicles].flat()
    }
  }, [filter, people, planets, films, species, starships, vehicles])

  // debounce search
  useEffect(() => {
    if (fetchedOnce && search === lastSearch) return

    const timeout = setTimeout(() => {
      searchData(search, dispatch)
    }, 500)

    return () => clearTimeout(timeout)
  }, [search, lastSearch, dispatch])

  return (
    <>
      <div className="flex gap-4">
        <FilterBar onFilterChange={onFilterChange} />
        <SearchBar
          search={search}
          loading={loading}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        {loading || filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Card key={result.url} result={result} />
          ))
        ) : (
          <div className="col-span-12 place-self-center">
            <span>No results</span>
          </div>
        )}
        {loading && (
          <div className="col-span-12 place-self-center flex items-center gap-2">
            <span>Loading data</span>
            <span className="loading loading-dots loading-lg text-primary "></span>
          </div>
        )}
      </div>
    </>
  )
}

export default HomePage
