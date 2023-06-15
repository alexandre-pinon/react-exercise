import { SwapiResponse } from './types/results'

export const searchAPI = async (
  category: string,
  search: string,
  cursor: number
): Promise<SwapiResponse> => {
  try {
    const res = await fetch(
      `http://localhost:8000/search/${category}?${new URLSearchParams({
        search,
        cursor: cursor.toString(),
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

    return (await res.json()) as SwapiResponse
  } catch (error) {
    console.error(error)
    throw error
  }
}
