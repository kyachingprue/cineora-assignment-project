import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Clapperboard,
  Home,
  Menu,
  Play,
  Search,
  X
} from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const location = useLocation()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 20)

      // Always show navbar near the top
      if (currentScrollY <= 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      icon: Home
    },
    {
      name: 'Movies',
      path: '/movies',
      icon: Clapperboard
    }
  ]

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
    }`

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -120
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed inset-x-0 top-0 z-[1000]"
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'border-b border-white/10 bg-slate-950/85 shadow-2xl shadow-black/20 backdrop-blur-2xl'
              : 'border-b border-transparent bg-slate-950/50 backdrop-blur-xl'
          }`}
        >
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="group flex shrink-0 items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 shadow-lg shadow-violet-900/30"
              >
                <Clapperboard className="h-5 w-5 text-white" />

                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  Cine
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    ora
                  </span>
                </h1>

                <p className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:block">
                  Discover • Explore • Watch
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map(link => {
                const Icon = link.icon

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={navLinkClass}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? 'text-violet-400' : ''
                          }`}
                        />

                        <span>{link.name}</span>

                        {isActive && (
                          <motion.span
                            layoutId="navbar-active-indicator"
                            className="absolute inset-x-2 -bottom-[17px] h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden items-center gap-2 md:flex">
              {/* Search */}
              <Link to="/movies">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                  title="Search Movies"
                >
                  <Search className="h-4 w-4" />
                </motion.div>
              </Link>

              {/* Explore Button */}
              <Link to="/movies">
                <motion.div
                  whileHover={{
                    scale: 1.03
                  }}
                  whileTap={{
                    scale: 0.97
                  }}
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition-all duration-300 hover:shadow-violet-500/20"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Explore Series
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label={
                isMobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={isMobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors duration-300 hover:bg-white/10 hover:text-white md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm md:hidden"
              />

              {/* Right Side Mobile Panel */}
              <motion.div
                initial={{
                  x: '100%'
                }}
                animate={{
                  x: 0
                }}
                exit={{
                  x: '100%'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                className="fixed right-0 top-0 z-[1002] h-[calc(100vh-72px)] w-[min(85vw,360px)] overflow-y-auto border-l border-white/10 bg-slate-950/95 shadow-[-20px_0_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-32 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />

                <div className="relative px-5 py-6">
                  {/* Mobile Panel Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                        Navigation
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-white">
                        MovieExplorer
                      </h2>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ rotate: 90, scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Close navigation menu"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-400 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                  {/* Navigation Links */}
                  <nav>
                    <div className="space-y-2">
                      {navLinks.map((link, index) => {
                        const Icon = link.icon

                        return (
                          <motion.div
                            key={link.path}
                            initial={{
                              opacity: 0,
                              x: 30
                            }}
                            animate={{
                              opacity: 1,
                              x: 0
                            }}
                            transition={{
                              delay: index * 0.08,
                              duration: 0.35
                            }}
                          >
                            <NavLink
                              to={link.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-2xl border px-4 py-4 transition-all duration-300 ${
                                  isActive
                                    ? 'border-violet-400/20 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/10 text-white shadow-lg shadow-violet-950/20'
                                    : 'border-transparent bg-white/[0.03] text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                      isActive
                                        ? 'bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-300'
                                        : 'bg-white/5 text-slate-500'
                                    }`}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </div>

                                  <span className="font-semibold">
                                    {link.name}
                                  </span>

                                  {isActive && (
                                    <motion.div
                                      layoutId="mobile-active"
                                      className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-lg shadow-violet-400/50"
                                    />
                                  )}
                                </>
                              )}
                            </NavLink>
                          </motion.div>
                        )
                      })}
                    </div>
                  </nav>

                  {/* Explore Series */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 30
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: 0.24
                    }}
                    className="mt-4"
                  >
                    <Link
                      to="/movies"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-4 py-4 text-sm font-bold text-white shadow-xl shadow-violet-950/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Play className="h-4 w-4 fill-current" />

                      <span>Explore Series</span>

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>

                  {/* Branding */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-8 border-t border-white/10 pt-6 text-center"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-600">
                      MovieExplorer
                    </p>

                    <p className="mt-2 text-xs text-slate-700">
                      Discover • Explore • Watch
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Navbar Spacer */}
      <div className="h-[72px]" />
    </>
  )
}


export default Navbar
