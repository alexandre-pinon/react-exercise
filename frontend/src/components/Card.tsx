import { useNavigate } from 'react-router-dom'

type CardProps = {
  name: string
  category: string
  url: string
}

const Card = ({ name, category, url }: CardProps) => {
  const navigate = useNavigate()

  const detailsLink = `/${category}/${url.split('/').slice(-2)[0]}`

  return (
    <div className="card bg-primary text-primary-content col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
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
