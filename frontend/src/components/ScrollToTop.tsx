import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type ScrollToTopProps = {
  children: React.ReactNode
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation()
  const [homeScrollY, setHomeScrollY] = useState(0)

  const handleScroll = () => {
    if (pathname === '/') {
      setHomeScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    window.onscroll = handleScroll

    if (pathname === '/') {
      window.scrollTo({ top: homeScrollY })
      return
    }
    window.scrollTo({ top: 0 })

    return () => {
      window.onscroll = null
    }
  }, [pathname])

  return <>{children}</>
}

export default ScrollToTop
