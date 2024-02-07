export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface PostComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
