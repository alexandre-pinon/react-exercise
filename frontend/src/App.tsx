import './App.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import RootLayout from './layouts/RootLayout'
import ErrorPage from './pages/ErrorPage'
import { Provider } from 'react-redux'
import store from './store'

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
      },
    ],
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
