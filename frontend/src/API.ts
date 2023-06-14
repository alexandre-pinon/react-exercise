export const searchAPI = (
  category: string,
  search: string,
  cursor: number
): Promise<Response> => {
  return fetch(
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
}
