import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchAPI } from '../API'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import { selectResults, setResults } from '../store'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const results = useSelector(selectResults)
  const dispatch = useDispatch()

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    searchAPI(search).then((data) => {
      dispatch(setResults(data))
      setLoading(false)
    })
  }

  return (
    <>
      <SearchBar
        search={search}
        loading={loading}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
      />
      <div className="grid grid-cols-12 gap-4">
        {loading ? (
          <span className="loading loading-dots loading-lg text-primary col-span-12 place-self-center"></span>
        ) : (
          results.map((result) => (
            <Card
              key={result.url}
              name={result.category === 'films' ? result.title : result.name}
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
