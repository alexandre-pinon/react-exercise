import { Film } from './film'
import { Person } from './person'
import { Planet } from './planet'
import { Species } from './species'
import { Starship } from './starship'
import { Vehicle } from './vehicle'

export type SearchResult = Person | Planet | Film | Species | Starship | Vehicle

export type SwapiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: SearchResult[]
}
