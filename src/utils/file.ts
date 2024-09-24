import { promises as fs } from 'fs'

export const exists = async (path: string) => {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}
