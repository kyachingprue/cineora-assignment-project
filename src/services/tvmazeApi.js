const BASE_URL = 'https://api.tvmaze.com'

// All Movies Shows API
export const getAllShows = async () => {
  const response = await fetch(`${BASE_URL}/shows`)

  if (!response.ok) {
    throw new Error('Failed to fetch shows')
  }

  const data = await response.json()

  return data
}

// Search Shows API Fetching

export const searchShows = async query => {
  if (!query.trim()) {
    return []
  }

  const response = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error('Failed to search shows')
  }

  const data = await response.json()

  return data.map(item => item.show)
}
