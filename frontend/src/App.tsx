import './App.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage, { detailsLoader } from './pages/DetailsPage'
import RootLayout from './layouts/RootLayout'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:category/:id',
        element: <DetailsPage />,
        loader: detailsLoader,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
