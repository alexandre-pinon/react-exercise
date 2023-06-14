import { Category } from './types/category'
import { Film } from './types/film'
import { Person } from './types/person'
import { Planet } from './types/planet'
import { SwapiResponse } from './types/results'
import { Species } from './types/species'
import { Starship } from './types/starship'
import { Vehicle } from './types/vehicle'

export const searchAPI = async (
  endpoint: string,
  q: string,
  page: number
): Promise<SwapiResponse<unknown>> => {
  try {
    const res = await fetch(
      `http://localhost:8000/search/${endpoint}?${new URLSearchParams({
        q,
        page: page.toString(),
      })}`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_API_USERNAME}:${
              import.meta.env.VITE_API_PASSWORD
            }`
          )}`,
        },
      }
    )

    if (!res.ok) {
      throw new Error('Error fetching data')
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const searchPeople = (
  q: string,
  page: number
): Promise<SwapiResponse<Person>> => {
  return searchAPI(Category.People, q, page) as Promise<SwapiResponse<Person>>
}

export const searchPlanets = (
  q: string,
  page: number
): Promise<SwapiResponse<Planet>> => {
  return searchAPI(Category.Planets, q, page) as Promise<SwapiResponse<Planet>>
}

export const searchFilms = (
  q: string,
  page: number
): Promise<SwapiResponse<Film>> => {
  return searchAPI(Category.Films, q, page) as Promise<SwapiResponse<Film>>
}

export const searchSpecies = (
  q: string,
  page: number
): Promise<SwapiResponse<Species>> => {
  return searchAPI(Category.Species, q, page) as Promise<SwapiResponse<Species>>
}

export const searchVehicles = (
  q: string,
  page: number
): Promise<SwapiResponse<Vehicle>> => {
  return searchAPI(Category.Vehicles, q, page) as Promise<
    SwapiResponse<Vehicle>
  >
}

export const searchStarships = (
  q: string,
  page: number
): Promise<SwapiResponse<Starship>> => {
  return searchAPI(Category.Starships, q, page) as Promise<
    SwapiResponse<Starship>
  >
}
