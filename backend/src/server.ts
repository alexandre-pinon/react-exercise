import Hapi, { Request, ResponseToolkit } from '@hapi/hapi'
import Basic from '@hapi/basic'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

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

const fetchCategory = async (category: string, search = '', cursor = 1) => {
  try {
    const url = `https://swapi.dev/api/${category}/?${new URLSearchParams({
      search,
      page: cursor.toString(),
    })}`
    const res = await fetch(url)

    if (!res.ok) {
      console.error(`Error fetching ${url}`)
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const searchHandler = async (request: Request, h: ResponseToolkit) => {
  const { search, cursor } = request.query
  const { category } = request.params

  return await fetchCategory(category, search, cursor)
}

const init = async () => {
  dotenv.config()

  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
    routes: {
      cors: {
        origin: [process.env.FRONTEND_URL || ''],
      },
    },
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
    path: '/search/{category}',
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
