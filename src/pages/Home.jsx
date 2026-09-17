import { useEffect, useState } from 'react'
import { getAllShows } from '../services/tvmazeApi'
import Loading from '../components/common/Loading'
import Hero from '../components/home/Hero'
import ExploreVideoSeries from '../components/home/ExploreVideoSeries'
import NewReleaseVideo from '../components/home/NewReleaseVideo'
import { Helmet } from 'react-helmet-async'

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
      <Helmet>
        <title>Cineora — Discover Movies & TV Series</title>

        <meta
          name="description"
          content="Discover movies and TV series with Cineora. Search, explore and view detailed information about your favorite shows."
        />

        <meta
          name="keywords"
          content="movies, TV series, movie explorer, Cineora, TVMaze, React movie app"
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <Hero shows={shows} />
      <ExploreVideoSeries shows={shows} />
      <NewReleaseVideo shows={shows} />
    </>
  )
}

export default Home
