import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router'

const fallbackShows = [
  {
    id: 1,
    name: 'The Last Horizon',
    premiered: '2026-08-18',
    rating: { average: 8.7 },
    genres: ['Drama', 'Thriller'],
    image: {
      original:
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85'
    },
    type: 'Scripted'
  },
  {
    id: 2,
    name: 'Dark Universe',
    premiered: '2026-08-12',
    rating: { average: 8.4 },
    genres: ['Sci-Fi', 'Adventure'],
    image: {
      original:
        'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85'
    },
    type: 'Scripted'
  },
  {
    id: 3,
    name: 'Beyond The Stars',
    premiered: '2026-08-05',
    rating: { average: 8.2 },
    genres: ['Adventure', 'Drama'],
    image: {
      original:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85'
    },
    type: 'Scripted'
  },
  {
    id: 4,
    name: 'Midnight Stories',
    premiered: '2026-07-29',
    rating: { average: 8.1 },
    genres: ['Mystery', 'Drama'],
    image: {
      original:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85'
    },
    type: 'Scripted'
  }
]

const NewReleaseVideo = ({ shows = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  /*
   * ---------------------------------------------------------
   * Sort shows by premiered date
   * ---------------------------------------------------------
   */

  const newReleases = useMemo(() => {
    const source = shows.length > 0 ? shows : fallbackShows

    return [...source]
      .filter(show => show?.premiered)
      .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
      .slice(0, 8)
  }, [shows])

  /*
   * ---------------------------------------------------------
   * Active movie
   * ---------------------------------------------------------
   */

  const activeMovie = newReleases[activeIndex]

  /*
   * ---------------------------------------------------------
   * Previous
   * ---------------------------------------------------------
   */

  const handlePrevious = () => {
    setActiveIndex(prev => (prev === 0 ? newReleases.length - 1 : prev - 1))
  }

  /*
   * ---------------------------------------------------------
   * Next
   * ---------------------------------------------------------
   */

  const handleNext = () => {
    setActiveIndex(prev => (prev === newReleases.length - 1 ? 0 : prev + 1))
  }

  /*
   * ---------------------------------------------------------
   * Format date
   * ---------------------------------------------------------
   */

  const formatDate = date => {
    if (!date) return 'Coming Soon'

    const formatted = new Date(date)

    return formatted.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  /*
   * ---------------------------------------------------------
   * Empty state
   * ---------------------------------------------------------
   */

  if (!activeMovie) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-[#07070b] py-20 sm:py-24 lg:py-28">

      {/* ---> Background Glow <--- */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-fuchsia-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ---> Section Header <--- */}

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-fuchsia-300"
            >
              <Sparkles size={13} />
              Fresh Releases
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              New Release{' '}
              <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Video Series
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base"
            >
              Discover the latest series and recently premiered shows from
              around the world.
            </motion.p>
          </div>

          {/* Explore Button */}
          <Link
            to="/movies"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Explore All
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* --->> Featured Releases <<--- */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMovie.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="relative min-h-[500px] overflow-hidden sm:min-h-[560px] lg:min-h-[620px]"
            >
              {/* Background */}
              <img
                src={activeMovie.image?.original || activeMovie.image?.medium}
                alt={activeMovie.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/20" />

              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/10" />

              {/* Content */}
              <div className="relative z-10 flex min-h-[500px] items-end p-6 sm:min-h-[560px] sm:p-10 lg:min-h-[620px] lg:p-14">
                <div className="max-w-2xl">
                  {/* Release badge */}
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-300 backdrop-blur-md">
                    <CalendarDays size={14} />
                    New Release
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {activeMovie.name}
                  </h3>

                  {/* Metadata */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-300">
                    {/* Date */}
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(activeMovie.premiered)}
                    </span>

                    {/* Rating */}
                    {activeMovie.rating?.average && (
                      <span className="flex items-center gap-1.5">
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <strong className="text-white">
                          {activeMovie.rating.average}
                        </strong>
                      </span>
                    )}

                    {/* Type */}
                    {activeMovie.type && <span>{activeMovie.type}</span>}
                  </div>

                  {/* Genres */}
                  {activeMovie.genres?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeMovie.genres.slice(0, 4).map(genre => (
                        <span
                          key={genre}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {activeMovie.summary && (
                    <p
                      className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: activeMovie.summary
                      }}
                    />
                  )}

                  {/* Action */}
                  <div className="mt-7">
                    <Link
                      to="/movies"
                      className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-slate-200"
                    >
                      <Play
                        size={17}
                        className="fill-current transition-transform group-hover:scale-110"
                      />
                      Explore Series
                    </Link>
                  </div>
                </div>
              </div>

              {/* --->> Slider Controls <<--- */}

              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 sm:bottom-10 sm:right-10">
                <button
                  type="button"
                  onClick={handlePrevious}
                  aria-label="Previous release"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  <ChevronLeft size={19} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next release"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  <ChevronRight size={19} />
                </button>
              </div>

              {/* Counter */}
              <div className="absolute bottom-7 left-6 z-20 text-xs font-medium text-slate-400 sm:bottom-10 sm:left-10">
                <span className="text-white">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                {' / '}
                {String(newReleases.length).padStart(2, '0')}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Release Thumbnails */}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {newReleases.map((movie, index) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-xl border transition duration-300 ${
                index === activeIndex
                  ? 'border-violet-400/60'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Poster */}
              <div className="aspect-3/4 overflow-hidden bg-white/5">
                <img
                  src={movie.image?.medium || movie.image?.original}
                  alt={movie.name}
                  className={`h-full w-full object-cover transition duration-500 ${
                    index === activeIndex
                      ? 'scale-105'
                      : 'group-hover:scale-105'
                  }`}
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition ${
                  index === activeIndex
                    ? 'bg-violet-500/10'
                    : 'bg-black/20 group-hover:bg-black/5'
                }`}
              />

              {/* Active indicator */}
              {index === activeIndex && (
                <motion.div
                  layoutId="activeRelease"
                  className="absolute inset-x-0 bottom-0 h-1 bg-violet-400"
                />
              )}

              {/* Movie name */}
              <div className="absolute inset-x-0 bottom-1 bg-linear-to-t from-black/90 to-transparent px-2 pb-2 pt-8">
                <p className="truncate text-left text-xs font-semibold text-white">
                  {movie.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewReleaseVideo
