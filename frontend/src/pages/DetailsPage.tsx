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
import { Category } from '../types/category'
import { getResultName } from '../utils'
import ScrollToTop from '../components/ScrollToTop'
import { useMemo } from 'react'
import {
  selectPeople,
  selectFilms,
  selectPlanets,
  selectSpecies,
  selectVehicles,
  selectStarships,
} from '../store'

type Params = {
  category: Category
  id: string
}

const DetailsPage = () => {
  const navigate = useNavigate()
  const { category, id } = useParams<Params>()

  const result = useMemo(() => {
    switch (category) {
      case Category.Films:
        return useSelector(selectFilms).find((film) =>
          film.url.includes(`/${id}/`)
        )
      case Category.People:
        return useSelector(selectPeople).find((person) =>
          person.url.includes(`/${id}/`)
        )
      case Category.Planets:
        return useSelector(selectPlanets).find((planet) =>
          planet.url.includes(`/${id}/`)
        )
      case Category.Species:
        return useSelector(selectSpecies).find((species) =>
          species.url.includes(`/${id}/`)
        )
      case Category.Starships:
        return useSelector(selectStarships).find((starship) =>
          starship.url.includes(`/${id}/`)
        )
      case Category.Vehicles:
        return useSelector(selectVehicles).find((vehicle) =>
          vehicle.url.includes(`/${id}/`)
        )
      default:
        throw new Error('Invalid category')
    }
  }, [category, id])

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
    </ScrollToTop>
  )
}

export default DetailsPage
