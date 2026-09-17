import { motion } from 'motion/react'
import { Clapperboard, Film, LoaderCircle, Play, Sparkles } from 'lucide-react'

const Loading = ({
  title = 'Loading Movies',
  description = 'Discovering something amazing for you...',
  fullScreen = true
}) => {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-slate-950 ${
        fullScreen ? 'min-h-screen' : 'min-h-[400px]'
      }`}
    >
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute left-1/4 top-1/3 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-[90px]"
      />

      {/* =====================================================
          LOADING CONTENT
      ====================================================== */}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
        {/* Animated Film Icon */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 rounded-full border border-dashed border-violet-400/30"
          />

          {/* Middle rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-3 rounded-full border border-fuchsia-400/20"
          />

          {/* Glow */}
          <motion.div
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute h-20 w-20 rounded-full bg-violet-500/20 blur-xl"
          />

          {/* Main icon container */}
          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-2xl shadow-violet-600/30"
          >
            <Clapperboard size={30} strokeWidth={1.8} className="text-white" />

            {/* Small play badge */}
            <motion.span
              animate={{
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-950 bg-white text-violet-600"
            >
              <Play size={10} fill="currentColor" />
            </motion.span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Sparkles size={16} className="text-violet-400" />

          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>

          <Sparkles size={16} className="text-fuchsia-400" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 max-w-sm text-sm leading-6 text-slate-400"
        >
          {description}
        </motion.p>

        {/* Loading Dots */}
        <div className="mt-6 flex items-center gap-2">
          {[0, 1, 2].map(dot => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.35, 1, 0.35]
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: dot * 0.15,
                ease: 'easeInOut'
              }}
              className="h-2 w-2 rounded-full bg-violet-400"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-7 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500"
          />
        </div>

        {/* Bottom status */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="mt-5 flex items-center gap-2 text-xs text-slate-500"
        >
          <LoaderCircle size={13} className="animate-spin" />

          <span>Preparing your cinematic experience</span>
        </motion.div>
      </div>

      {/* =====================================================
          DECORATIVE FILM ICONS
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute left-[8%] top-[25%] hidden text-white/[0.04] sm:block"
      >
        <Film size={100} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
        className="absolute bottom-[20%] right-[8%] hidden text-white/[0.04] sm:block"
      >
        <Clapperboard size={120} strokeWidth={1} />
      </motion.div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  )
}

export default Loading
