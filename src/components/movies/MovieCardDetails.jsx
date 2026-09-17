import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  X,
  Star,
  CalendarDays,
  Clock3,
  Languages,
  Tv,
  ExternalLink,
  Play
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import Loading from '../common/Loading'
import { Helmet } from 'react-helmet-async'


const stripHtml = (html = '') => {
  const temp = document.createElement('div')
  temp.innerHTML = html

  return temp.textContent || temp.innerText || ''
}

const formatDate = date => {
  if (!date) return 'N/A'

  const formattedDate = new Date(date)

  if (Number.isNaN(formattedDate.getTime())) return date

  return formattedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const MovieCardDetails = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`)

        if (!response.ok) {
          throw new Error('Movie not found')
        }

        const data = await response.json()

        setMovie(data)
      } catch (error) {
        console.error(error)
        setError('Failed to load movie details.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [movieId])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        navigate('/movies')
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  if (loading) {
    return <Loading />
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Movie not found</h1>

          <p className="mt-2 text-sm text-slate-500">
            {error || 'This series could not be found.'}
          </p>

          <button
            type="button"
            onClick={() => navigate('/movies')}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950"
          >
            Back to Movies
          </button>
        </div>
      </main>
    )
  }

  if (!movie) return null

  const image =
    movie.image?.original ||
    movie.image?.medium ||
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'

  const summary = stripHtml(movie.summary)

  return (
    <>
      <Helmet>
        <title>{movie.name} — Cineora</title>

        <meta
          name="description"
          content={
            summary
              ? summary.slice(0, 160)
              : `Explore ${movie.name} on Cineora.`
          }
        />

        <meta property="og:title" content={`${movie.name} — Cineora`} />

        <meta property="og:description" content={summary?.slice(0, 160)} />

        {movie.image?.original && (
          <meta property="og:image" content={movie.image.original} />
        )}
      </Helmet>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/90 backdrop-blur-md"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              navigate('/movies')
            }
          }}
        >
          {/* Background Image */}
          <div className="pointer-events-none fixed inset-0">
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover opacity-20 blur-sm"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/90 to-black" />
          </div>

          {/* Modal Wrapper */}
          <div className="relative flex min-h-screen items-center justify-center px-3 py-6 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] shadow-2xl shadow-black/60 sm:rounded-3xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => navigate('/movies')}
                aria-label="Close movie details"
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
              >
                <X size={21} />
              </button>

              {/* Hero Section */}
              <div className="relative min-h-[430px] overflow-hidden sm:min-h-[500px] lg:min-h-[560px]">
                {/* Hero Background */}
                <img
                  src={image}
                  alt={movie.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Image Overlays */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/20" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0b12] via-transparent to-black/20" />

                {/* Content */}
                <div className="relative z-10 flex min-h-[430px] items-end p-5 sm:min-h-[500px] sm:p-8 lg:min-h-[560px] lg:p-12">
                  <div className="grid w-full gap-8 lg:grid-cols-[220px_1fr] lg:items-end lg:gap-10">
                    {/* Poster */}
                    <motion.div
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="hidden lg:block"
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                        <img
                          src={
                            movie.image?.medium ||
                            movie.image?.original ||
                            image
                          }
                          alt={movie.name}
                          className="aspect-2/3 w-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="max-w-3xl"
                    >
                      {/* Type */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-violet-400/20 bg-violet-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
                          {movie.type || 'TV Series'}
                        </span>

                        {movie.status && (
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                            {movie.status}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-6xl">
                        {movie.name}
                      </h2>

                      {/* Metadata */}
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-300">
                        {movie.rating?.average && (
                          <div className="flex items-center gap-1.5">
                            <Star
                              size={17}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="font-bold text-white">
                              {movie.rating.average}
                            </span>
                            <span>/ 10</span>
                          </div>
                        )}

                        {movie.premiered && (
                          <div className="flex items-center gap-1.5">
                            <CalendarDays size={16} />
                            <span>{formatDate(movie.premiered)}</span>
                          </div>
                        )}

                        {movie.runtime && (
                          <div className="flex items-center gap-1.5">
                            <Clock3 size={16} />
                            <span>{movie.runtime} min</span>
                          </div>
                        )}

                        {movie.language && (
                          <div className="flex items-center gap-1.5">
                            <Languages size={16} />
                            <span>{movie.language}</span>
                          </div>
                        )}
                      </div>

                      {/* Genres */}
                      {movie.genres?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {movie.genres.map(genre => (
                            <span
                              key={genre}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Summary */}
                      {summary && (
                        <p className="mt-6 line-clamp-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                          {summary}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="mt-7 flex flex-wrap gap-3">
                        <a
                          href={movie.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-gray-200"
                        >
                          <Play
                            size={17}
                            className="fill-current transition-transform group-hover:scale-110"
                          />
                          View on TVMaze
                        </a>

                        {movie.officialSite && (
                          <a
                            href={movie.officialSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
                          >
                            <ExternalLink size={17} />
                            Official Site
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="relative border-t border-white/10 bg-[#0b0b12] p-5 sm:p-8 lg:p-10">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* About */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                        <Tv size={18} />
                      </div>

                      <h3 className="text-lg font-bold text-white">
                        About This Series
                      </h3>
                    </div>

                    <p className="text-sm leading-7 text-gray-400">
                      {summary ||
                        'No description is available for this series.'}
                    </p>
                  </div>

                  {/* Information */}
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-white">
                      Series Information
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {movie.type || 'N/A'}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {movie.status || 'N/A'}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-xs text-gray-500">Premiered</p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {movie.premiered
                            ? formatDate(movie.premiered)
                            : 'N/A'}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-xs text-gray-500">Runtime</p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-xs text-gray-500">Language</p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {movie.language || 'N/A'}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {movie.rating?.average
                            ? `${movie.rating.average} / 10`
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Bottom */}
                <div className="mt-8 flex justify-end border-t border-white/5 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/movies')}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MovieCardDetails
