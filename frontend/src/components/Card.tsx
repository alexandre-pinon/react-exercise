import { useNavigate } from 'react-router-dom'
import { SearchResult } from '../types/results'
import { getResultName } from '../utils'

type CardProps = {
  result: SearchResult
}

const Card = ({ result }: CardProps) => {
  const navigate = useNavigate()

  const split = result.url.split('/')
  const id = split[split.length - 2]
  const category = split[split.length - 3]
  const detailsLink = `/${category}/${id}`

  return (
    <div className="card bg-primary text-primary-content col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="card-body">
        <h2 className="card-title">{getResultName(result)}</h2>
        <p>({category})</p>
        <div className="card-actions justify-center">
          <button className="btn" onClick={() => navigate(detailsLink)}>
            details
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
