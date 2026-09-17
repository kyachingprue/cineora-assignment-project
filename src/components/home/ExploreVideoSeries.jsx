import { motion } from 'motion/react'
import { ArrowRight, Tv } from 'lucide-react'
import { Link } from 'react-router'

import MovieCard from '../movies/MovieCard'

const fallbackShows = [
  {
    id: 1,
    name: 'Under the Dome',
    type: 'Scripted',
    genres: ['Drama', 'Science-Fiction', 'Thriller'],
    premiered: '2013-06-24',
    rating: {
      average: 6.6
    },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/610/1525272.jpg'
    }
  },
  {
    id: 2,
    name: 'Game of Thrones',
    type: 'Scripted',
    genres: ['Drama', 'Adventure', 'Fantasy'],
    premiered: '2011-04-17',
    rating: {
      average: 8.8
    },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/146/365966.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/146/365966.jpg'
    }
  },
  {
    id: 3,
    name: 'Breaking Bad',
    type: 'Scripted',
    genres: ['Drama', 'Crime', 'Thriller'],
    premiered: '2008-01-20',
    rating: {
      average: 9.2
    },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg'
    }
  },
  {
    id: 4,
    name: 'Stranger Things',
    type: 'Scripted',
    genres: ['Drama', 'Horror', 'Science-Fiction'],
    premiered: '2016-07-15',
    rating: {
      average: 8.6
    },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/200/501985.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/200/501985.jpg'
    }
  },
  {
    id: 5,
    name: 'The Walking Dead',
    type: 'Scripted',
    genres: ['Drama', 'Action', 'Horror'],
    premiered: '2010-10-31',
    rating: {
      average: 8.1
    },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/425/1067310.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/425/1067310.jpg'
    }
  }
]

const ExploreVideoSeries = ({ shows = [], onDetails }) => {
  const displayShows = shows.length > 0 ? shows.slice(0, 10) : fallbackShows

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
      {/* =====================================================
          CINEMATIC BACKGROUND
      ====================================================== */}

      {/* Main gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-950/50 via-slate-950 to-fuchsia-950/40" />

      {/* Top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-900/20 via-violet-950/5 to-transparent" />

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-fuchsia-950/20 via-transparent to-transparent" />

      {/* Left glow */}
      <div className="pointer-events-none absolute -left-48 top-24 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[140px]" />

      {/* Right glow */}
      <div className="pointer-events-none absolute -right-48 bottom-10 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[140px]" />

      {/* Center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300 backdrop-blur-md">
              <Tv size={14} />
              Explore Collection
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Explore Amazing
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Video Series
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Discover exciting stories, unforgettable characters, and
              highly-rated series from the TVMaze collection.
            </p>
          </div>

          {/* View All */}
          <Link
            to="/movies"
            className="group inline-flex w-fit md:w-30 lg:w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:border-violet-400/30 hover:bg-violet-500/10"
          >
            View All
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* =====================================================
            MOVIE CARDS
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{
                  opacity: 0,
                  y: 35
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.1
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06
                }}
              >
                <MovieCard movie={show} onDetails={onDetails} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/movies"
            className="group inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-600/20"
          >
            Explore Full Collection
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ExploreVideoSeries
