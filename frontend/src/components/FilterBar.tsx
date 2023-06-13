import { Category } from '../types/category'

type FilterBarProps = {
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  return (
    <select className="select select-primary" onChange={onFilterChange}>
      <option value={''}>All</option>
      {Object.values(Category).map((category) => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default FilterBar
