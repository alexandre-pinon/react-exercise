import { Category } from './types/category'
import { SearchResult } from './types/results'

export const getResultName = (result: SearchResult) =>
  result.category === Category.Films ? result.title : result.name
