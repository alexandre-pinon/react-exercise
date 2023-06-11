import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { getItemDetails } from '../API'
import { SearchResult } from '../types/results'

export const detailsLoader: LoaderFunction = ({ params }) => {
  if (!params.category || !params.id) {
    throw new Error('Missing category or id')
  }

  return getItemDetails(params.category, +params.id)
}

const DetailsPage = () => {
  const navigate = useNavigate()
  const data = useLoaderData() as SearchResult

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
