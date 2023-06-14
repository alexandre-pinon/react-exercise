import { useMemo } from 'react'
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
import { Category } from '../types/enums'
import { getResultName } from '../utils'

type Params = {
  category: Category
  id: string
}

const DetailsPage = () => {
  const navigate = useNavigate()
  const { category, id } = useParams<Params>()

  const results = useSelector(selectResults)

  const result = useMemo(() => {
    return results.find((result) => result.url.includes(`/${category}/${id}`))
  }, [results, category, id])

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
    <>
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl">{getCategoryIcon(category!)}</span>
        <h2 className="text-3xl">{getResultName(result!)}</h2>
      </div>
      <button
        className="btn btn-primary btn-outline justify-self-start"
        onClick={() => navigate('/')}
      >
        <BiArrowBack />
        back
      </button>
      <div className="overflow-x-auto">
        <Table data={result!} />
      </div>
    </>
  )
}

export default DetailsPage
