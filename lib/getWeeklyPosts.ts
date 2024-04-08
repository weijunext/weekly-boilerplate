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
  let filenames = await fs.promises.readdir(postsDirectory)
  filenames = filenames.reverse()

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.promises.readFile(fullPath, 'utf8')

      const { data } = matter(fileContents)
      console.log(data);

      return {
        fullPath,
        metadata: data,
      }
    })
  )

  return posts
}