import Hapi, { Request, ResponseToolkit } from '@hapi/hapi'
import Basic from '@hapi/basic'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

type SwapiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: any[]
}

const validate = async (
  request: Request,
  username: string,
  password: string
) => {
  const isValid =
    username === process.env.API_USERNAME &&
    password === process.env.API_PASSWORD

  return { isValid, credentials: { username } }
}

const fetchAllData = async (url: string): Promise<any[]> => {
  console.log('FETCHING', url)
  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Error fetching data')
    }

    const data = (await res.json()) as SwapiResponse

    if (data.next) {
      const d = await fetchAllData(data.next)
      return [...data.results, ...d]
    }

    return data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

const endpoints = [
  'people',
  'planets',
  'films',
  'species',
  'vehicles',
  'starships',
]

const searchHandler = async (request: Request, h: ResponseToolkit) => {
  const { q } = request.query

  const fetchQueries = endpoints.map((endpoint) =>
    fetchAllData(`https://swapi.dev/api/${endpoint}/?search=${q}`)
  )
  const responses = await Promise.allSettled(fetchQueries)

  const allResults = responses.map((r, i) => {
    if (r.status === 'rejected') {
      return { endpoint: endpoints[i], results: [] }
    }

    return { endpoint: endpoints[i], results: r.value }
  })

  return h.response(allResults)
}

const init = async () => {
  dotenv.config()

  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
  })

  await server.register(Basic)

  server.auth.strategy('simple', 'basic', { validate })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'OK'
    },
  })

  server.route({
    method: 'GET',
    path: '/search',
    options: {
      auth: 'simple',
    },
    handler: searchHandler,
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
