import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Plus,
  Star,
  Tv
} from 'lucide-react'
import { Link } from 'react-router'

const fallbackShows = [
  {
    id: 1,
    name: 'Under the Dome',
    type: 'Scripted',
    genres: ['Drama', 'Science-Fiction', 'Thriller'],
    premiered: '2013-06-24',
    rating: { average: 6.6 },
    image: {
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/610/1525272.jpg',
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg'
    },
    summary:
      '<p>A mysterious dome suddenly surrounds a small town, trapping its residents and changing their lives forever.</p>'
  },
  {
    id: 2,
    name: 'Game of Thrones',
    type: 'Scripted',
    genres: ['Drama', 'Adventure', 'Fantasy'],
    premiered: '2011-04-17',
    rating: { average: 8.8 },
    image: {
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/146/365966.jpg',
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/146/365966.jpg'
    },
    summary:
      '<p>Nine noble families fight for control over the lands of Westeros.</p>'
  },
  {
    id: 3,
    name: 'Breaking Bad',
    type: 'Scripted',
    genres: ['Drama', 'Crime', 'Thriller'],
    premiered: '2008-01-20',
    rating: { average: 9.2 },
    image: {
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg',
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg'
    },
    summary:
      '<p>A chemistry teacher enters the dangerous world of producing illegal drugs.</p>'
  },
  {
    id: 4,
    name: 'Stranger Things',
    type: 'Scripted',
    genres: ['Drama', 'Horror', 'Science-Fiction'],
    premiered: '2016-07-15',
    rating: { average: 8.6 },
    image: {
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/200/501985.jpg',
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/200/501985.jpg'
    },
    summary:
      '<p>A group of friends uncover supernatural mysteries in their small town.</p>'
  },
  {
    id: 5,
    name: 'The Walking Dead',
    type: 'Scripted',
    genres: ['Drama', 'Action', 'Horror'],
    premiered: '2010-10-31',
    rating: { average: 8.1 },
    image: {
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/425/1067310.jpg',
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/425/1067310.jpg'
    },
    summary:
      '<p>A group of survivors tries to stay alive in a world overrun by walkers.</p>'
  }
]

const stripHtml = (html = '') => {
  const temp = document.createElement('div')
  temp.innerHTML = html

  return temp.textContent || temp.innerText || ''
}

const Hero = ({ shows = [] }) => {
  const heroShows = useMemo(() => {
    const source = shows.length > 0 ? shows : fallbackShows

    return source
      .filter(show => show?.image?.original || show?.image?.medium)
      .slice(0, 6)
  }, [shows])

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const activeShow = heroShows[activeIndex]

  /*
   * Automatically change hero every 6 seconds.
   */
  useEffect(() => {
    if (heroShows.length <= 1) return

    const interval = setInterval(() => {
      setDirection(1)

      setActiveIndex(current =>
        current === heroShows.length - 1 ? 0 : current + 1
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [heroShows.length])

  /*
   * Reset active index when API data changes.
   */
  useEffect(() => {
    setActiveIndex(0)
  }, [shows])

  const handleSelect = index => {
    if (index === activeIndex) return

    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const handlePrevious = () => {
    setDirection(-1)

    setActiveIndex(current =>
      current === 0 ? heroShows.length - 1 : current - 1
    )
  }

  const handleNext = () => {
    setDirection(1)

    setActiveIndex(current =>
      current === heroShows.length - 1 ? 0 : current + 1
    )
  }

  if (!activeShow) {
    return null
  }

  const title = activeShow.name || 'Discover Amazing Stories'

  const description =
    stripHtml(activeShow.summary) ||
    'Discover incredible stories, unforgettable characters, and exciting new worlds.'

  const rating = activeShow.rating?.average
    ? Number(activeShow.rating.average).toFixed(1)
    : 'N/A'

  const year = activeShow.premiered
    ? new Date(activeShow.premiered).getFullYear()
    : 'N/A'

  const image =
    activeShow.image?.original ||
    activeShow.image?.medium ||
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-black">

      {/* Background Image */}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeShow.id}
          initial={{
            opacity: 0,
            scale: direction > 0 ? 1.08 : 1.04
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 1.03
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute inset-0"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* ---> Cinematic Overlays <--- */}

      {/* Dark overall overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Left gradient for text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Purple cinematic glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]"
      />

     {/* Main Content */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-5 pb-48 pt-24 sm:px-8 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeShow.id}
            initial={{
              opacity: 0,
              x: direction > 0 ? 50 : -50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -40 : 40
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="max-w-2xl"
          >
            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md"
            >
              <Tv size={15} className="text-violet-300" />
              Featured Series
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            {/* Meta information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            >
              {/* Rating */}
              <span className="inline-flex items-center gap-1.5 font-semibold text-yellow-300">
                <Star size={16} fill="currentColor" />
                {rating}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              {/* Year */}
              <span className="text-white/80">{year}</span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              {/* Type */}
              <span className="text-white/80">
                {activeShow.type || 'Series'}
              </span>

              {activeShow.runtime && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/40" />

                  <span className="text-white/80">
                    {activeShow.runtime} min
                  </span>
                </>
              )}
            </motion.div>

            {/* Genres */}
            {activeShow.genres?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {activeShow.genres.slice(0, 3).map(genre => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md"
                  >
                    {genre}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="mt-6 line-clamp-3 max-w-xl text-sm leading-7 text-slate-200/85 sm:text-base"
            >
              {description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/movies"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-100"
              >
                <Play size={17} fill="currentColor" />
                Watch Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/movies"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/15"
              >
                <Plus size={17} />
                More Details
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}

      <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous show"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/15"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next show"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/15"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Movie Cards */}

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-5 pb-6 sm:px-8 lg:px-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="hidden items-center gap-1 text-xs text-white/50 sm:flex">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(heroShows.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Horizontal scroll */}
          <div className="scrollbar-hide flex gap-3 overflow-x-auto py-2">
            {heroShows.map((show, index) => {
              const isActive = index === activeIndex
              const cardImage =
                show.image?.medium ||
                show.image?.original ||
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'

              return (
                <motion.button
                  key={show.id}
                  type="button"
                  onClick={() => handleSelect(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative h-24 w-36 shrink-0 overflow-hidden rounded-xl text-left transition-all duration-300 sm:h-28 sm:w-44 ${
                    isActive
                      ? 'ring-2 ring-violet-400 ring-offset-2 ring-offset-slate-950'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={cardImage}
                    alt={show.name}
                    className={`h-full w-full object-cover transition duration-500 ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Card overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroIndicator"
                      className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="truncate text-xs font-bold text-white sm:text-sm">
                      {show.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-white/70">
                      <Star
                        size={10}
                        fill="currentColor"
                        className="text-yellow-300"
                      />

                      {show.rating?.average ? show.rating.average : 'N/A'}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom progress line */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
        <motion.div
          key={activeShow.id}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: 6,
            ease: 'linear'
          }}
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
      </div>
    </section>
  )
}

export default Hero
