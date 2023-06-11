import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const error = useRouteError()
  console.log({ error })

  let status = 500
  let statusText = 'Internal Server Error'

  if (error instanceof Error) {
    statusText = error.message
  } else if (isRouteErrorResponse(error)) {
    status = error.status
    statusText = error.statusText
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex justify-center items-center text-xl">
        <span className="font-bold">{status}</span>
        <div className="divider divider-horizontal"></div>
        <span>{statusText}</span>
      </div>
    </div>
  )
}

export default ErrorPage
