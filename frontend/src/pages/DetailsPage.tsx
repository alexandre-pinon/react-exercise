import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectResults } from '../store'

const DetailsPage = () => {
  const navigate = useNavigate()
  const { category, id } = useParams()

  const data = useSelector(selectResults).filter((result) =>
    result.url.includes(`${category}/${id}`)
  )[0]

  return (
    <>
      <button
        className="btn btn-primary btn-outline btn-wide"
        onClick={() => navigate('/')}
      >
        back
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default DetailsPage
