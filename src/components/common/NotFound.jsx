import { motion } from 'motion/react'
import {
  ArrowLeft,
  Clapperboard,
  Film,
  Home,
  Play,
  Search,
  Tv
} from 'lucide-react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-20">
       {/* Background gradient color */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.14),transparent_35%)]" />

      {/* Violet Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]"
      />

      {/* Fuchsia Glow */}
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[130px]"
      />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Icons */}

      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [-5, 5, -5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute left-[8%] top-[20%] hidden text-violet-400/20 sm:block"
      >
        <Film size={70} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [15, -15, 15],
          rotate: [5, -5, 5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute right-[8%] top-[25%] hidden text-fuchsia-400/20 sm:block"
      >
        <Tv size={65} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [-10, 20, -10],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-[15%] left-[12%] hidden text-indigo-400/20 md:block"
      >
        <Clapperboard size={55} strokeWidth={1} />
      </motion.div>

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: 'easeOut'
          }}
          className="relative mx-auto mb-8"
        >
          {/* Glow behind 404 */}
          <div className="absolute inset-0 blur-3xl">
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              404
            </span>
          </div>

          <h1 className="relative select-none text-[clamp(7rem,25vw,15rem)] font-black leading-none tracking-[-0.08em] text-transparent bg-gradient-to-br from-violet-300 via-fuchsia-400 to-pink-400 bg-clip-text">
            404
          </h1>

          {/* Play button inside */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl shadow-violet-900/30 backdrop-blur-xl sm:h-20 sm:w-20"
          >
            <Play size={28} fill="currentColor" className="ml-1" />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2
          }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-xl"
        >
          <Search size={14} />
          Scene Not Found
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
          className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Looks like this scene
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            doesn't exist.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
          className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
        >
          The page you're looking for may have been moved, removed, or never
          existed. Let's get you back to the movie collection.
        </motion.p>

       {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5
          }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          {/* Home */}
          <Link
            to="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-600/20 sm:w-auto"
          >
            <Home
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Back to Home
            <ArrowLeft
              size={16}
              className="order-first transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>

          {/* Movies */}
          <Link
            to="/movies"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white sm:w-auto"
          >
            <Film
              size={17}
              className="transition-transform duration-300 group-hover:rotate-6"
            />
            Browse Movies
            <ArrowLeft
              size={16}
              className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.7
          }}
          className="mt-10 text-xs text-slate-600"
        >
          <span>MovieExplorer</span>
          <span className="mx-2 text-slate-700">•</span>
          <span>Keep exploring, the next story is waiting.</span>
        </motion.div>
      </div>
    </main>
  )
}

export default NotFound
