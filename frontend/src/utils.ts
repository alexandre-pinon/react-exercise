import { SearchResult } from './types/results'

export const getResultName = (result: SearchResult) =>
  'title' in result ? result.title : result.name
