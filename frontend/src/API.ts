import { SearchResult } from './types/results'

export const searchAPI = async (query: string): Promise<SearchResult[]> => {
  try {
    const res = await fetch(`http://localhost:8000/search?q=${query}`, {
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_API_USERNAME}:${
            import.meta.env.VITE_API_PASSWORD
          }`
        )}`,
      },
    })

    if (!res.ok) {
      throw new Error('Error fetching data')
    }

    return (await res.json()) as SearchResult[]
  } catch (error) {
    console.error(error)
    return []
  }
}
