import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchAPI } from '../API'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import {
  selectFilteredResults,
  selectResults,
  setFilteredResults,
  setResults,
} from '../store'
import FilterBar from '../components/FilterBar'
import { Category } from '../types/category'
import { getResultName } from '../utils'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>()
  const [loading, setLoading] = useState(false)

  const results = useSelector(selectResults)
  const filteredResults = useSelector(selectFilteredResults)
  const dispatch = useDispatch()

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category)
  }

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    searchAPI(search).then((data) => {
      dispatch(setResults(data))
      setLoading(false)
    })
  }

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true)
      searchAPI(search).then((data) => {
        dispatch(setResults(data))
        setLoading(false)
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [search, dispatch])

  useEffect(() => {
    if (category) {
      const filtered = results.filter((result) => result.category === category)
      dispatch(setFilteredResults(filtered))
    } else {
      dispatch(setFilteredResults(results))
    }
  }, [category, results, dispatch])

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
      <div className="grid grid-cols-12 gap-4">
        {loading ? (
          <>
            <div className="col-span-12 place-self-center flex items-center gap-2">
              <span>Loading data</span>
              <span className="loading loading-dots loading-lg text-primary "></span>
            </div>
          </>
        ) : (
          filteredResults.map((result) => (
            <Card
              key={result.url}
              name={getResultName(result)}
              category={result.category}
              url={result.url}
            />
          ))
        )}
      </div>
    </>
  )
}

export default HomePage
