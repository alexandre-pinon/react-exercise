import {
  BiArrowBack,
  BiCar,
  BiDna,
  BiFilm,
  BiPlanet,
  BiUser,
} from 'react-icons/bi'
import { FaSpaceShuttle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Table from '../components/Table'
import { selectResults } from '../store'
import { Category } from '../types/category'
import { getResultName } from '../utils'
import ScrollToTop from '../components/ScrollToTop'

const DetailsPage = () => {
  const navigate = useNavigate()
  const { category, id } = useParams()

  const result = useSelector(selectResults).filter((result) =>
    result.url.includes(`${category}/${id}`)
  )[0]

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case Category.Films:
        return <BiFilm />
      case Category.People:
        return <BiUser />
      case Category.Planets:
        return <BiPlanet />
      case Category.Species:
        return <BiDna />
      case Category.Starships:
        return <FaSpaceShuttle />
      case Category.Vehicles:
        return <BiCar />
    }
  }

  return (
    <ScrollToTop>
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl">{getCategoryIcon(result.category)}</span>
        <h2 className="text-3xl">{getResultName(result)}</h2>
      </div>
      <button
        className="btn btn-primary btn-outline justify-self-start"
        onClick={() => navigate('/')}
      >
        <BiArrowBack />
        back
      </button>
      <div className="overflow-x-auto">
        <Table data={result} />
      </div>
    </ScrollToTop>
  )
}

export default DetailsPage
