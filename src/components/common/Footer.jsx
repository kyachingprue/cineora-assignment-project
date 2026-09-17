import { Link } from 'react-router'
import {
  Clapperboard,
  Mail,
  Play,
  ArrowUpRight
} from 'lucide-react'
import { motion } from 'motion/react';

import {FaGithub, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        {/* Top Footer Content */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
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

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              Discover amazing movies, explore popular series, and find your
              next favorite story. Your cinematic journey starts here.
            </p>

            <Link
              to="/movies"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:bg-violet-100"
            >
              Explore Movies
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 transition hover:text-violet-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/movies"
                  className="text-sm text-slate-400 transition hover:text-violet-300"
                >
                  Movie Listing
                </Link>
              </li>

              <li>
                <Link
                  to="/movies"
                  className="text-sm text-slate-400 transition hover:text-violet-300"
                >
                  Popular Series
                </Link>
              </li>

              <li>
                <Link
                  to="/movies"
                  className="text-sm text-slate-400 transition hover:text-violet-300"
                >
                  Search Movies
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Project
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="https://www.tvmaze.com/api"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-violet-300"
                >
                  TVMaze API
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-violet-300"
                >
                  React Documentation
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-violet-300"
                >
                  Tailwind CSS
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-violet-300"
                >
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / CTA Section */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-violet-300">
                <Mail size={18} />
                <span className="text-sm font-semibold">Stay Updated</span>
              </div>

              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Never miss a great story.
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore new releases and discover something exciting every time
                you visit.
              </p>
            </div>

            <Link
              to="/movies"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-3 text-sm font-bold text-violet-200 transition duration-300 hover:border-violet-300/60 hover:bg-violet-500/20"
            >
              Start Exploring
              <Play size={16} fill="currentColor" />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs leading-6 text-slate-500 sm:text-left sm:text-sm">
            © {currentYear} Movie Explorer. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
