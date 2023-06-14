import { Filter } from '../types/enums'

type FilterBarProps = {
  filter: Filter
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FilterBar = ({ filter, onFilterChange }: FilterBarProps) => {
  return (
    <select
      className="select select-primary"
      onChange={onFilterChange}
      value={filter}
    >
      {Object.values(Filter).map((filter) => (
        <option key={filter} value={filter}>
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default FilterBar
