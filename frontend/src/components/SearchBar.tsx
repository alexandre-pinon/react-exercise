import { FiSearch } from 'react-icons/fi'

const SearchBar = () => {
  return (
    <div className="join">
      <input className="input input-primary join-item" placeholder="Search..." />
      <button className="btn btn-primary join-item rounded-r-full">
        <FiSearch className="text-2xl" />
      </button>
    </div>
  )
}

export default SearchBar
