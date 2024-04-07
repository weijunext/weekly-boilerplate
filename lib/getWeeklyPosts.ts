import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export type WeeklyPost = {
  fullPath: string
  metadata: {
    [key: string]: any
  }
}

export async function getWeeklyPosts(): Promise<WeeklyPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content')
  const filenames = await fs.promises.readdir(postsDirectory)

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.promises.readFile(fullPath, 'utf8')

      const { data } = matter(fileContents)

      return {
        fullPath,
        metadata: data,
      }
    })
  )

  return posts
}