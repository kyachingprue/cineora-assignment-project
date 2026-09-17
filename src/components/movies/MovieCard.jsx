import { motion } from 'motion/react'
import { CalendarDays, ChevronRight, Play, Star, Tv } from 'lucide-react'

const MovieCard = ({ movie, onDetails }) => {
  if (!movie) return null

  const image =
    movie.image?.medium ||
    movie.image?.original ||
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'

  const title = movie.name || 'Untitled Series'

  const rating = movie.rating?.average
    ? Number(movie.rating.average).toFixed(1)
    : 'N/A'

  const year = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A'

  const genre =
    movie.genres?.length > 0
      ? movie.genres.slice(0, 2).join(' • ')
      : 'Entertainment'

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -7 }}
      className="group w-full"
    >
      {/* Card */}

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-xl shadow-black/10 backdrop-blur-sm transition-all duration-500 group-hover:border-violet-400/30 group-hover:shadow-2xl group-hover:shadow-violet-950/20">
        {/* Poster */}

        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          />

          {/* Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-violet-950/10 opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Top Badges */}

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
              <Star size={12} fill="currentColor" className="text-yellow-400" />

              {rating}
            </div>

            {/* Type */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <Tv size={12} className="text-violet-300" />

              {movie.type || 'Series'}
            </div>
          </div>

          {/* Center Play Button */}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              type="button"
              onClick={() => onDetails?.(movie)}
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.95
              }}
              className="flex h-14 w-14 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              aria-label={`View ${title}`}
            >
              <Play size={21} fill="currentColor" className="ml-0.5" />
            </motion.button>
          </div>

          {/* Bottom Poster Content */}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="line-clamp-1 text-lg font-bold text-white">
              {title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-xs text-white/65">
              <CalendarDays size={13} />

              <span>{year}</span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              <span className="truncate">{genre}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}

        <div className="flex items-center justify-between gap-3 px-4 py-3.5">
          {/* Genre */}
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-500">
              {movie.genres?.length
                ? movie.genres.slice(0, 2).join(' • ')
                : 'Featured Series'}
            </p>
          </div>

          {/* Details Button */}
          <button
            type="button"
            onClick={() => onDetails?.(movie)}
            className="group/details relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-3.5 py-2 text-xs font-bold text-violet-200 shadow-lg shadow-violet-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/50 hover:from-violet-500/25 hover:to-fuchsia-500/20 hover:text-white hover:shadow-violet-500/20"
          >
            {/* Button shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/details:translate-x-full" />

            <span className="relative z-10">Details</span>

            <ChevronRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover/details:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default MovieCard
