import { Dispatch } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchAPI } from '../API'
import Card from '../components/Card'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'
import * as Store from '../store'
import { Category, Filter } from '../types/enums'

const HomePage = () => {
  const [loading, setLoading] = useState(false)

  const filter = useSelector(Store.selectFilter)
  const search = useSelector(Store.selectSearch)
  const lastSearch = useSelector(Store.selectLastSearch)
  const fetchedOnce = useSelector(Store.selectFetchedOnce)
  const results = useSelector(Store.selectResults)
  const cursors = useSelector(Store.selectCursors)

  const dispatch = useDispatch()

  const filteredResults = useMemo(() => {
    return filter === Filter.All
      ? results
      : results.filter((result) => result.url.includes(filter))
  }, [results, filter])

  const moreDataAvailable = useMemo(() => {
    return Object.values(cursors).some((cursor) => cursor > 1)
  }, [cursors])

  const searchAndAddResults = async (
    search: string,
    category: Category,
    cursor: number
  ) => {
    const response = await searchAPI(category, search, cursor)

    if (!fetchedOnce) {
      dispatch(Store.setFetchedOnce(true))
    }

    dispatch(Store.addResults(response.results))

    if (response.next) {
      dispatch(Store.incrementCursor(category))
    } else {
      dispatch(Store.resetCursor(category))
    }
  }

  const searchNewData = async (search: string, dispatch: Dispatch) => {
    if (loading) return

    setLoading(true)
    dispatch(Store.clearResults())

    const fetchRequests = Object.values(Category).map(async (category) => {
      await searchAndAddResults(search, category, 1)
    })
    await Promise.allSettled(fetchRequests)

    dispatch(Store.setLastSearch(search))
    setLoading(false)
  }

  const loadMoreData = async () => {
    setLoading(true)

    const fetchRequests = Object.values(Category).map(async (category) => {
      if (cursors[category] > 1) {
        await searchAndAddResults(search, category, cursors[category])
      }
    })
    await Promise.allSettled(fetchRequests)

    setLoading(false)
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(Store.setSearch(e.target.value))
  }

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(Store.setFilter(e.target.value as Filter))
  }

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await searchNewData(search, dispatch)
  }

  // debounce search
  useEffect(() => {
    if (fetchedOnce && search === lastSearch) return

    const timeout = setTimeout(() => {
      searchNewData(search, dispatch)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [search, lastSearch, dispatch])

  return (
    <>
      <div className="flex gap-4">
        <FilterBar filter={filter} onFilterChange={onFilterChange} />
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
        {loading ? (
          <div className="col-span-12 place-self-center flex items-center gap-2">
            <span>Loading data</span>
            <span className="loading loading-dots loading-lg text-primary "></span>
          </div>
        ) : (
          filteredResults.length > 0 && (
            <div className="col-span-12 place-self-center">
              <button
                className="btn"
                onClick={loadMoreData}
                disabled={!moreDataAvailable}
              >
                {moreDataAvailable ? 'Load more' : 'Nothing more to load'}
              </button>
            </div>
          )
        )}
      </div>
    </>
  )
}

export default HomePage
