import { Category } from "./category"

export type Planet = {
  category: Category.Planets
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  url: string
  created: string
  edited: string
}
