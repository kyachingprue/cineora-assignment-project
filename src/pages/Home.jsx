import { useEffect, useState } from 'react'
import { getAllShows } from '../services/tvmazeApi'
import Loading from '../components/common/Loading'
import Hero from '../components/home/Hero'
import ExploreVideoSeries from '../components/home/ExploreVideoSeries'
import NewReleaseVideo from '../components/home/NewReleaseVideo'

const Home = () => {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true)

        const data = await getAllShows()

        setShows(data)
      } catch (error) {
        console.error('Failed to fetch shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <Hero shows={shows} />
      <ExploreVideoSeries shows={shows} />
      <NewReleaseVideo shows={shows} />
    </>
  )
}

export default Home
