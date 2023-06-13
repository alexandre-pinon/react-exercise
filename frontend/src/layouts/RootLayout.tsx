import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <main className="grid place-items-center gap-4 container mx-auto">
      <h1 className="text-4xl font-bold m-4">React Exercise</h1>
      <Outlet />
    </main>
  )
}

export default RootLayout
