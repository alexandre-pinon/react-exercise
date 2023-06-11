import { FiSearch } from 'react-icons/fi'

type SearchBarProps = {
  search: string
  loading: boolean
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const SearchBar = ({
  search,
  loading,
  onSearchChange,
  onSearchSubmit,
}: SearchBarProps) => {
  return (
    <form className="join" onSubmit={onSearchSubmit}>
      <input
        className="input input-primary join-item"
        placeholder="Search..."
        value={search}
        onChange={onSearchChange}
      />
      <button
        className="btn btn-primary join-item rounded-r-full"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <FiSearch className="text-2xl" />
        )}
      </button>
    </form>
  )
}

export default SearchBar
