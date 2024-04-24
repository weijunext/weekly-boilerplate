
export type WeeklyPost = {
  id?: string
  fullPath?: string
  metadata: {
    [key: string]: any
  },
  title?: string
  content: string
}

export type PostsByMonth = {
  [key: string]: WeeklyPost[];
}
