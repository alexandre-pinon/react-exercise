import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

const RootLayout = () => {
  return (
    <ScrollToTop>
      <main className="grid place-items-center gap-4 container mx-auto py-4">
        <h1 className="text-4xl font-bold m-4">React Exercise</h1>
        <Outlet />
      </main>
    </ScrollToTop>
  )
}

export default RootLayout
