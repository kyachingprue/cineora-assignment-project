import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import {
  AlertCircle,
  Film,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X
} from 'lucide-react'

import { getAllShows, searchShows } from '../services/tvmazeApi'
import MovieCard from '../components/movies/MovieCard'
import Loading from '../components/common/Loading'
import { Helmet } from 'react-helmet-async'

const Movies = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')

  // Search suggestions
  const [suggestions, setSuggestions] = useState([])

  // Search popup
  const [showSearchPopup, setShowSearchPopup] = useState(false)

  // Load All Shows

  const loadAllShows = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getAllShows()

      setMovies(data)
    } catch (error) {
      console.error('Failed to load shows:', error)

      setError("We couldn't load the movies right now. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleShowAllSeries = async () => {
    setShowSearchPopup(false)
    setSearchQuery('')
    setSuggestions([])
    setError('')

    try {
      setLoading(true)

      const data = await getAllShows()
      setMovies(data)
    } catch (error) {
      console.error('Failed to load all series:', error)
      setError('Failed to load all series.')
    } finally {
      setLoading(false)
    }
  }

  // Initial API Calls

  useEffect(() => {
    loadAllShows()
  }, [])

  // Search With Debounce

  useEffect(() => {
    const query = searchQuery.trim()

    // Empty search
    if (!query) {
      setSearching(false)
      setSuggestions([])

      return
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true)
        setError('')

        const data = await searchShows(query)

        // Main movie cards
        setMovies(data)

        // Search suggestions
        setSuggestions(data.slice(0, 6))
      } catch (error) {
        console.error('Search failed:', error)

        setError('Something went wrong while searching. Please try again.')

        setMovies([])
        setSuggestions([])
      } finally {
        setSearching(false)
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchQuery])

  // Search Popup Open

  const handleOpenSearch = () => {
    setShowSearchPopup(true)
  }

  // Search Popup Close

  const handleCloseSearch = () => {
    setShowSearchPopup(false)
  }

  // Select Search Suggestion

  const handleSuggestionClick = movie => {
    // Put selected movie name inside search input
    setSearchQuery(movie.name)

    // Close search popup
    setShowSearchPopup(false)
  }

  // Clear Search

  const handleClearSearch = () => {
    setSearchQuery('')
    setSuggestions([])
    setError('')
  }

  //  Retry

  const handleRetry = () => {
    setSearchQuery('')
    setSuggestions([])
    loadAllShows()
  }

  // Escape Key

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setShowSearchPopup(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Prevent Background Scroll When Search Popup is Open

  useEffect(() => {
    if (showSearchPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [showSearchPopup])

  //  Initial Loading

  if (loading && !searchQuery) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Explore Movies & TV Series — Cineora</title>

        <meta
          name="description"
          content="Explore and search thousands of TV series and discover your next favorite show with Cineora."
        />
      </Helmet>
      <main className="min-h-screen bg-slate-950 text-white">
        {/* --->> Hero Header <<---*/}

        <section className="relative overflow-hidden border-b border-white/5">
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />

          <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-14 lg:px-10 lg:pt-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300"
            >
              <Film size={14} />
              Movie Collection
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
            >
              Discover Your Next
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Favorite Series
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Search through thousands of shows and discover exciting stories,
              amazing characters, and highly-rated series.
            </motion.p>

            {/* Search Trigger */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 max-w-3xl"
            >
              <button
                type="button"
                onClick={handleOpenSearch}
                className="group flex h-14 w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 text-left backdrop-blur-xl transition duration-300 hover:border-violet-400/30 hover:bg-white/[0.07] hover:ring-4 hover:ring-violet-500/5 sm:h-16"
              >
                <Search
                  size={21}
                  className="shrink-0 text-slate-500 transition-colors group-hover:text-violet-400"
                />

                <span className="flex-1 text-sm text-slate-500 sm:text-base">
                  {searchQuery ? searchQuery : 'Search movies or series...'}
                </span>

                {searchQuery && (
                  <span className="hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-slate-500 sm:block">
                    Search active
                  </span>
                )}
              </button>

              {/* Search hint */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <Sparkles size={13} />

                <span>
                  Try searching for "Breaking Bad", "Girls", or "Stranger
                  Things"
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --->> Movie Content <<--- */}

        <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          {/* Section Header */}
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {searchQuery
                    ? `Search results for "${searchQuery}"`
                    : 'Explore Series'}
                </h2>

                {!searching && (
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-slate-400">
                    {movies.length}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {searchQuery
                  ? 'Showing matching TV series'
                  : 'Browse popular shows from the collection'}
              </p>
            </div>

            {/* Filter / All Series */}
            <button
              type="button"
              onClick={handleShowAllSeries}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white sm:flex"
            >
              <SlidersHorizontal size={14} />
              All Series
            </button>
          </div>

          {/* Error condition */}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl border border-red-400/20 bg-red-500/5 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <AlertCircle size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Something went wrong
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {error}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white transition hover:border-violet-400/30 hover:bg-violet-500/10"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Search Loading */}

          {searching ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]"
                >
                  <div className="aspect-[2/3] animate-pulse bg-white/[0.06]" />

                  <div className="space-y-3 p-4">
                    <div className="h-4 animate-pulse rounded bg-white/[0.06]" />

                    <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                  </div>
                </div>
              ))}
            </div>
          ) : movies.length > 0 ? (
            // Movie Card

            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery || 'all-movies'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5"
              >
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{
                      opacity: 0,
                      y: 25
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.04, 0.4)
                    }}
                  >
                    <MovieCard
                      movie={movie}
                      onDetails={selectedMovie =>
                        navigate(`/movies/${selectedMovie.id}`)
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            // Empty State

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] px-6 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Search size={27} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                No series found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find any series matching your search. Try another
                title or explore the full collection.
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-violet-100"
              >
                Browse All Series
              </button>
            </motion.div>
          )}

          {/* Bottom info */}
          {movies.length > 0 && !searching && (
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-7 sm:flex-row">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Star size={13} className="text-yellow-500" />

                <span>Discover more amazing series from the collection.</span>
              </div>

              <span className="text-xs text-slate-700">Powered by TVMaze</span>
            </div>
          )}
        </section>

        {/* Search Popup */}

        <AnimatePresence>
          {showSearchPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-10"
              onMouseDown={event => {
                if (event.target === event.currentTarget) {
                  handleCloseSearch()
                }
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: -30,
                  scale: 0.97
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.98
                }}
                transition={{
                  duration: 0.3
                }}
                className="relative w-full max-w-3xl"
              >
                {/* Search Popup Header */}

                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                      Movie Explorer
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                      Search Movies & Series
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    aria-label="Close search"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <X size={19} />
                  </button>
                </div>

                {/* Search Input */}

                <div className="relative">
                  <Search
                    size={21}
                    className="absolute left-5 top-1/2 z-20 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={event => {
                      setSearchQuery(event.target.value)
                    }}
                    placeholder="Type a movie or series name..."
                    className="h-16 w-full rounded-2xl border border-violet-400/20 bg-[#111118] pl-14 pr-14 text-sm text-white outline-none shadow-2xl shadow-black/50 placeholder:text-slate-600 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/10 sm:text-base"
                  />

                  {/* Searching */}
                  {searching && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-violet-400" />
                    </div>
                  )}

                  {/* Clear */}
                  {!searching && searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/10 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Suggestions */}

                <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e15] shadow-2xl shadow-black/60">
                  {/* Header */}
                  <div className="border-b border-white/5 px-5 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {searching
                          ? 'Searching...'
                          : searchQuery
                            ? 'Suggestions'
                            : 'Start typing to search'}
                      </p>

                      {suggestions.length > 0 && !searching && (
                        <span className="text-xs text-slate-600">
                          {suggestions.length} results
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && !searching ? (
                    <div className="max-h-[60vh] overflow-y-auto">
                      {suggestions.map(movie => (
                        <button
                          key={movie.id}
                          type="button"
                          onClick={() => handleSuggestionClick(movie)}
                          className="group flex w-full items-center gap-4 border-b border-white/5 px-4 py-4 text-left transition duration-200 last:border-b-0 hover:bg-violet-500/[0.08]"
                        >
                          {/* Poster */}
                          <div className="h-16 w-11 shrink-0 overflow-hidden rounded-lg bg-white/5">
                            <img
                              src={
                                movie.image?.medium ||
                                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=100&q=80'
                              }
                              alt={movie.name}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                            />
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white transition group-hover:text-violet-300 sm:text-base">
                              {movie.name}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                              {movie.premiered && (
                                <span>{movie.premiered.slice(0, 4)}</span>
                              )}

                              {movie.type && (
                                <span className="capitalize">{movie.type}</span>
                              )}

                              {movie.rating?.average && (
                                <span className="flex items-center gap-1 text-yellow-400/80">
                                  <Star size={12} className="fill-current" />

                                  {movie.rating.average}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Search icon */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-slate-600 transition group-hover:border-violet-400/20 group-hover:bg-violet-500/10 group-hover:text-violet-400">
                            <Search size={15} />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : !searching && searchQuery ? (
                    /* No results */
                    <div className="px-6 py-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-600">
                        <Search size={23} />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-white">
                        No movies found
                      </h3>

                      <p className="mt-2 text-xs text-slate-600">
                        Try searching with another movie or series name.
                      </p>
                    </div>
                  ) : (
                    /* Empty search */
                    <div className="px-6 py-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                        <Sparkles size={23} />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-white">
                        Find your next favorite series
                      </h3>

                      <p className="mt-2 text-xs text-slate-600">
                        Start typing a movie or series name above.
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-white/5 px-5 py-3">
                    <p className="text-center text-[11px] text-slate-700">
                      Press ESC or click outside to close
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

export default Movies
