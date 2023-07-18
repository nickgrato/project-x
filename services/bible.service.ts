// const BASE_URL = 'https://serverx.fly.dev/api/tasks'
const BASE_URL = 'http://localhost:4001/api/bible'

export type BibleT = {
  passages: string[]
  query: string
}

/**
 *
 * @returns Get Tasks
 */
export const getBiblePassages = async (query: string) => {
  const blob = await fetch(`${BASE_URL}?q=${query}`)
  const { data } = await blob.json()

  return data as BibleT
}
