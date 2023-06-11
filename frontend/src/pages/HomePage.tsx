import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import { searchAPI } from '../API'
import { SearchResult } from '../types/results'
import Card from '../components/Card'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    searchAPI(search).then((data) => {
      setLoading(false)
      setResults(data)
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
